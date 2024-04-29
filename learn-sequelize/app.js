import http from 'http';
import express from 'express';
import pgDataSoruce from './datasource/pg.js';
import KelasRouter from './routes/kelas.route.js';
import Assosicate from './datasource/assosicate.js';
import MahasiswaRouter from './routes/mahasiswa.route.js';

const app = express();

const httpServer = http.createServer(app);

app.use(express.json());

app.use('/mahasiswa', MahasiswaRouter);
app.use('/kelas', KelasRouter);


httpServer.listen(8000, async () => {
    Assosicate.init();
    await pgDataSoruce.repo.sync();
    console.log("Server is connected");
})