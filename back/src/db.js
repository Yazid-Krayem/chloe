import sqlite from 'sqlite'
import SQL from 'sql-template-strings';

const initializeDatabase = async () => {

  const db = await sqlite.open('./db.sqlite');
  
  /**
   * create an article
   * @param {object} props an object with keys `name`  `subject`  `date`
   * @returns {number} the id of the created articles (or an error if things went wrong) 
   */
  const createArticles = async (props) => {
    if(!props || !props.name || !props.subject || !props.date){
      throw new Error(`you must provide a name , Subject and Date`)
    }
    const { name, subject , date } = props
    try{
      const result = await db.run(SQL`INSERT INTO articles (articles_name,articles_subject , articles_date) VALUES (${name}, ${subject} ,${date})`);
      const id = result.stmt.lastID
      return id
    }catch(e){
      throw new Error(`couldn't insert this combination: `+e.message)
    }
  }
  
  /**
   * deletes an article
   * @param {number} id the id of the articles to delete
   * @returns {boolean} `true` if the contact was deleted, an error otherwise 
   */
  const deleteArticles = async (id) => {
    try{
      const result = await db.run(SQL`DELETE FROM articles WHERE articles_id = ${id}`);
      if(result.stmt.changes === 0){
        throw new Error(`article "${id}" does not exist`)
      }
      return true
    }catch(e){
      throw new Error(`couldn't delete the article "${id}": `+e.message)
    }
  }
  
 /**
   * Edits an article
   * @param {number} id the id of the article to edit
   * @param {object} props an object with at least one of `name` or `subject` or `date`
   */
  const updateArticles = async (id, props) => {
    if (!props || !(props.name || props.subject || !props.date)) {
      throw new Error(`you must provide a name or subject or date`);
    }
    const { name, subject, date } = props;
    try {
      let statement = "";
      if (name && subject && date) {
        statement = SQL`UPDATE articles SET articles_subject=${subject}, name=${articles_name},articles_date=${date} WHERE articles_id = ${id}`;
      } else if (name && subject) {
        statement = SQL`UPDATE articles SET articles_name=${name},articles_subject=${subject} WHERE articles_id = ${id}`;
      }else if (name && date){
        statement = SQL`UPDATE articles SET articles_name=${name},articles_date=${date} WHERE articles_id = ${id}`;
      }else if (subject && date){
        statement = SQL`UPDATE articles SET articles_subject=${subject},articles_date=${date} WHERE articles_id = ${id}`;
      }else if (subject) {
        statement = SQL`UPDATE articles SET articles_subject=${subject} WHERE articles_id = ${id}`;
      }else if (name){
        statement = SQL`UPDATE articles SET articles_name=${name} WHERE articles_id = ${id}`;
      }else if (date){
        statement = SQL`UPDATE articles SET articles_date=${date} WHERE articles_id = ${id}`;
      }
      const result = await db.run(statement);
      if (result.stmt.changes === 0) {
        throw new Error(`no changes were made`);
      }
      return true;
    } catch (e) {
      throw new Error(`couldn't update the articles ${id}: ` + e.message);
    }
  }
  
  /**
   * Retrieves a articles
   * @param {number} id the id of the article
   * @returns {object} an object with `name`, `subject`, `date` and `id`, representing a article, or an error 
   */
  const getArticles = async (id) => {
    try{
      const articlesList = await db.all(SQL`SELECT articles_id AS id, articles_name, articles_subject,articles_date FROM articles WHERE articles_id = ${id}`);
      const article = articlesList[0]
      if(!article){
        throw new Error(`article ${id} not found`)
      }
      return article
    }catch(e){
      throw new Error(`couldn't get the article ${id}: `+e.message)
    }
  }
  
  /**
   * retrieves the articles from the database
   * @param {string} orderBy an optional string that is either "name" or "subject" or "date"
   * @returns {array} the list of articles
   */
  const getArticlesList = async (orderBy) => {
    try{
      
      let statement = `SELECT articles_id AS id, articles_name, articles_subject FROM articles`
      switch(orderBy){
        case 'articles_name': statement+= ` ORDER BY articles_name`; break;
        case 'articles_subject': statement+= ` ORDER BY articles_subject`; break;
        case 'articles_date': statement+= ` ORDER BY articles_date`; break;
        default: break;
      }
      const rows = await db.all(statement)
      if(!rows.length){
        throw new Error(`no rows found`)
      }
      return rows
    }catch(e){
      throw new Error(`couldn't retrieve articles: `+e.message)
    }
  }
  
  const controller = {
    createArticles,
    deleteArticles,
    updateArticles,
    getArticles,
    getArticlesList
  }

  return controller
}

export default initializeDatabase
