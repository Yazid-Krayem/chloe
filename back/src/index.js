import app from './app'
import initializeDatabase from './db'


const start = async () => {
  const controller = await initializeDatabase()
 
}
start();
