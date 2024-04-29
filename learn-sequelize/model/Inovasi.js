import { DataTypes, Model } from "sequelize";
import pgDataSoruce from "../datasource/pg.js";

class Inovasi extends Model {};
Inovasi.init({  
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    judul: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {sequelize: pgDataSoruce.repo, modelName: 'inovasi'});

export default Inovasi;