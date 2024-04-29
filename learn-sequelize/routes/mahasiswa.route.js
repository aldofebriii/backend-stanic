import express from 'express';
import MahasiswaController from '../controller/mahasiswa.controller.js';

const MahasiswaRouter = express.Router();

MahasiswaRouter.put('/tambah-kelas/:mahasiswaId', MahasiswaController.tambahKelas);
MahasiswaRouter.get('/all', MahasiswaController.getMahasiswas);
MahasiswaRouter.post('/', MahasiswaController.createMahasiswa);

export default MahasiswaRouter;