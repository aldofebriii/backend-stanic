import { DataTypes, Model } from "sequelize";
import pgDataSoruce from "../datasource/pg.js";

class Kelas extends Model {};

Kelas.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    nomor: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    content: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {sequelize: pgDataSoruce.repo, modelName: 'kelas', freezeTableName: true});


export default Kelas;