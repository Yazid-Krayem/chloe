// back/src/db.js
import sqlite from 'sqlite'
import SQL from 'sql-template-strings';

const nowForSQLite = () =>
  new Date()
    .toISOString()
    .replace("T", " ")
    .replace("Z", "");

const initializeDatabase=async()=>{

const db= await sqlite.open('./db.sqlite');


/**
   * creates an article
   * @param {object} props an object with keys `title` , `text` , `img_path` , `date` , `link`
   * @returns {number} the id of the created article (or an error if things went wrong) 
   */

  const createArticle = async props => {
    if (!props || !props.title || !props.text || !props.date) {
      throw new Error(`you must provide a title a text and a date`);
    }
    const { title, text, img_path, date, link } = props;
    // const date = nowForSQLite();
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
    // const updateArticle = async(id,props) =>{
    //     if(!props || !props.title || !props.text || !props.link || !props.img_path ||!props.date){
    //         throw new Error (`you must provide something`)
    //     }
    //     const {title,text,date,img_path,link} =props
    //     try{
    //         let statement ='';
    //         if(title && text){
    //             statement = SQL(`UPDATE articles SET title =${title} text = ${text} WHERE id=${id}`)
    //         }else if (title && img_path){
    //             statement = SQL(`UPDATE articles SET title =${title} img_path = ${img_path} WHERE id=${id}`)
    //         }else if(title && link){
    //             statement = SQL(`UPDATE articles SET title =${title} link = ${link} WHERE id=${id}`)
    //         }else if(title && date){
    //             statement = SQL(`UPDATE articles SET title =${title} date = ${date} WHERE id=${id}`)
    //         }else if (text && img_path){
    //             statement = SQL(`UPDATE articles SET text =${text} img_path = ${img_path} WHERE id=${id}`)
    //         }else if (text && link){
    //             statement = SQL(`UPDATE articles SET text =${text} link = ${link} WHERE id=${id}`)
    //         }else if (text && date){
    //             statement = SQL(`UPDATE articles SET text =${text} date = ${date} WHERE id=${id}`)
    //         }else if (date && img_path){
    //             statement = SQL(`UPDATE articles SET date =${date} img_path = ${img_path} WHERE id=${id}`)
    //         }else if(date && link){
    //             statement = SQL(`UPDATE articles SET date =${date} link = ${link} WHERE id=${id}`)
    //         }else if (img_path && link){
    //             statement = SQL(`UPDATE articles SET link =${link} img_path = ${img_path} WHERE id=${id}`)
    //         }else if (text){
    //             statement = SQL(`UPDATE articles SET text =${text}  WHERE id=${id}`)
    //         }else if (title){
    //             statement = SQL(`UPDATE articles SET title =${title} WHERE id=${id}`)
    //         }else if (img_path){
    //             statement = SQL(`UPDATE articles SET img_path = ${img_path} WHERE id=${id}`)
    //         }else if (link){
    //             statement = SQL(`UPDATE article SET link=${link} WHERE id=${id}`)
    //         }else if(date){
    //             statement = SQL(`UPDATE article SET date=${date} WHERE id=${id}`)
    //         }
    //         const result = await db.run(statement)
    //         if(result.stmt.changes === 0 ){
    //             throw new Error (`no changes were made`)
    //         }
    //         return true
    //     }catch(e){
    //         throw new Error (`couldn't update the article ${id}: ` + e.message)
    //     }
    // }
    const updateArticle = async (id, props) => {
        const  { title, text, img_path, date, link } = props
        const result = await db.run(SQL`UPDATE articles SET title=${title}, text=${text}, img_path=${img_path}, link=${link}, date=${date} WHERE id = ${id}`);
        if(result.stmt.changes === 0){
          return false
        }
        return true
      }
      
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
const getLast3 = async (orderBy)=>{
let statement = `select id,title,text,img_path,date,link FROM articles order by date desc limit 3`
switch(orderBy){
  case 'date': statement += `ORDER BY date`;break
}
const rows = await db.all(statement)
    if(!rows.length){
        throw new Error (`no rows found`)
    }
    return rows

}
 
  /* get last 3 added articles

  */


// const getArticlesList = async(orderBy)=>{

// try{
//     let statement =`SELECT id , title , text , img_path , link FROM articles `
//     switch(orderBy){
//         case 'title': statement +=  `ORDER BY title`;break
//         case 'text' : statement += `ORDER BY text`;break
//         case 'img_path' : statement += ` ORDER BY img_path`;break
//         case 'link' : statement += `ORDER BY link`;break
//         default: break
//     }
//     const rows = await db.all(statement)
//     if(!rows.length){
//         throw new Error (`no rows found`)
//     }
//     return rows
// }catch(e){
//     throw new Error (`couldn't retrieve articles: `+e.message)
// }

// }
const getArticlesList = async props => {
  const { orderBy,  desc, limit, start } = props;
  const orderProperty = /title|text|date|link|img_path|id/.test(orderBy)
    ? orderBy
    : "id";
  const startingId = start 
    ? start // if start is provided, use that
    : orderProperty === "id" // otherwise, if we're order by `id`:
    ? 0 // default `startingId` is 0 
    : orderProperty === "date" // otherwise, if we're ordering by `date`
    ? "1970-01-01 00:00:00.000" // default property is an old date
    : "a"; // otherwise, default property is "a" (for `name` and `email`)
  try {
    const statement = SQL`SELECT  id, title, text, date, img_path , link FROM articles WHERE ${orderProperty} > ${startingId}`;
    // if (author_id) {
    //   statement.append(SQL` AND author_id = ${author_id}`);
    // }
    statement.append( desc? SQL` ORDER BY ${orderProperty} DESC` : SQL` ORDER BY ${orderProperty} ASC`);
    statement.append(SQL` LIMIT ${limit || 100}`);
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
getLast3

}
return controller;

}







export default initializeDatabase


