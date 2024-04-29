import { DataTypes, Model  } from "sequelize";
import pgDataSoruce from "../datasource/pg.js";
import Inovasi from "./Inovasi.js";
import Kelas from "./Kelas.js";
import Mahasiswa_Kelas from "./Mahasiwa_Kelas.js";

class Mahasiswa extends Model {};
Mahasiswa.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        IP: {
            type: DataTypes.INTEGER,
            allowNull: false  
        }
    },
    {sequelize: pgDataSoruce.repo, modelName: 'mahasiswa'}
);


export default Mahasiswa;