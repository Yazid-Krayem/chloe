import sqlite from 'sqlite'
import SQL from 'sql-template-strings'

const initializeDatabase = async () =>{
    const db = await sqlite.open('./db.sqlite');
   
    /**
   * retrieves the contacts from the database
   */

    const getArticlesList = async () =>{
        let returnString = ''
        const rows = await db.all('SELECT * from articles')
        rows.forEach(({ id ,  name , subject , date}) => returnString += `[${id} - ${name} - ${subject} - ${date}]`)
        return returnString
    } 

    const controller ={
        getArticlesList
    }
    return controller
}

export default initializeDatabase

