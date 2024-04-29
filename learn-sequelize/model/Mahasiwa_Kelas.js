import { DataTypes, Model } from "sequelize";
import Mahasiswa from "./Mahasiswa.js";
import Kelas from "./Kelas.js";
import pgDataSoruce from "../datasource/pg.js";

class Mahasiswa_Kelas extends Model {};
Mahasiswa_Kelas.init({
}, {sequelize: pgDataSoruce.repo});

export default Mahasiswa_Kelas;