import express from 'express';
import KelasController from '../controller/kelas.controller.js';

const KelasRouter = express.Router();

KelasRouter.post('/', KelasController.createKelas);

export default KelasRouter;