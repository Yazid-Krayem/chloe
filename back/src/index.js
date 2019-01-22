import app from './app'
import initializeDatabase from './db'

const start = async () => {
  const controller = await initializeDatabase()
  const contacts_list = await controller.getArticlesList()
  console.log(contacts_list)
  //app.get('/',(req,res)=>res.send("ok"));
  //app.listen(8080, ()=>console.log('server listening on port 8080'))
}

start();
