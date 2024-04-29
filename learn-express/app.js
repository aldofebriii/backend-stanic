import express from 'express';
import http from 'http';
import UserRouter from './routes/user.route.js';
const app = express();

const httpServer = http.createServer(app);

//GET || POST || PUT || DELETE || OPTIONS 
// 200 || 201 || 401 || 403 || 404 || 500 || 300
//Middleware
app.use(express.json());
//Routes
app.use('/user', UserRouter);
app.get('/ping', (req, res, next) => {
    return res.status(200).json({msg: 'Ping!'})
})

httpServer.listen(8000, () => {
    console.log("server connected");
})

//app tu nerima req, res