import express from 'express'
import router from './routes';
import cors from 'cors';

const app = express()
app.use(cors());
app.use(router);
app.listen(3600,()=>
console.log(`Server is listening on port 3600`))
module.exports = app;