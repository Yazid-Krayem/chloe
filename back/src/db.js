// back/src/db.js
import sqlite from 'sqlite'
import SQL from 'sql-template-strings';

//date function 

const dateObj=new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');
//console.log(dateObj);

const nowForSQLite = () => dateObj;

const joinSQLStatementKeys = (keys, values, delimiter , keyValueSeparator='=') => {
  return keys
    .map(propName => {
      const value = values[propName];
      if (value !== null && typeof value !== "undefined") {
        return SQL``.append(propName).append(keyValueSeparator).append(SQL`${value}`);
      }
      return false;
    })
    .filter(Boolean)
    .reduce((prev, curr) => prev.append(delimiter).append(curr));
};

const initializeDatabase=async()=>{
  
  const db= await sqlite.open('./db.sqlite');
  
  
  
  
  /**
   * creates an article
   * @param {object} props an object with keys `title` , `text` , `img_path` , `date` , `link`
   * @returns {number} the id of the created article (or an error if things went wrong) 
   */

   const createArticle = async props => {
    if (!props || !props.title || !props.text) {
      throw new Error(`you must provide a title a text and a date`);
    }

    const { title, text, img_path, link } = props;
    const date=nowForSQLite();
    try {
      const result = await db.run(
        SQL`INSERT INTO articles (title,text,img_path,date,link) VALUES (${title},${text},${img_path},${date},${link}) `
      );
      const id = result.stmt.lastID;
      return id;
    } catch (error) {
      throw new Error(`couldn't insert this combination` + error.message);
    }
  };


   /**
   * deletes an article
   * @param {number} id the id of the article to delete
   * @returns {boolean} `true` if the article was deleted, an error otherwise 
   */

    const deleteArticle = async (id) =>{
        try{
            const result = await db.run(SQL`DELETE FROM articles WHERE id = ${id}`)
        if(result.stmt.changes === 0 ){
            throw new Error (`article "${id}" does not exist `)
        }
        return true
        }catch(e){
            throw new Error (`couldn't delete the article "${id}": `+e.message)
        }

    }

    /**
   * Edits an article
   * @param {number} id the id of the article to edit
   * @param {object} props an object with at least one of `title` or`text` or`img_path` or`link`
   */
 
  
  //Updating an article 2;
const updateArticle = async (id, props) => {
    const isValid = props && (
      props.title ||
      props.text ||
      props.img_path ||
      props.date ||
      props.link
    )
    if (!isValid) {
      throw new Error(`you need to give me something`);
    }
    try{
    const { title, text, img_path, date, link } = props;
    const statement = SQL`UPDATE articles SET `.append(
      joinSQLStatementKeys(
        ["title", "text", "img_path", "date", "link"],
        props,
        ", "
      )
    )
.append(SQL` WHERE id=${id}`)
const result=await db.run(statement);
if (result.stmt.changes === 0) {
  throw new Error(`no changes were made`);
}
return true;
} catch (e) {
throw new Error(`couldn't update the article ${id}: ` + e.message);
}


  };


      
    /**
   * Retrieves an article
   * @param {number} id the id of the article
   * @returns {object} an object with `title`,`text` , `img_path` ,`link` and `id`, representing a article, or an error 
   */

  const getArticle = async (id) => {
    try{
      const articlesList = await db.all(SQL`SELECT  id, title, text , img_path , link FROM articles WHERE id = ${id}`);
      const article = articlesList[0]
      if(!article){
        throw new Error(`article ${id} not found`)
      }
      return article
    }catch(e){
      throw new Error(`couldn't get the article ${id}: `+e.message)
    }
  }

const getArticlesList = async props => {
  const { order,  desc, limit, start } = props;
 
    try{
    let statement = `SELECT  id, title, text, date, img_path , link FROM articles`
      switch(order){
        case 'date': statement+= ` ORDER BY date DESC`; break;
        default: break;
      }

    const rows = await db.all(statement);
    return rows;
    
  } catch (e) {
    throw new Error(`couldn't retrieve contacts: ` + e.message);
  }
};



const controller ={

getArticlesList,
createArticle,
updateArticle,
deleteArticle,
getArticle,
}
return controller;

}







export default initializeDatabase


