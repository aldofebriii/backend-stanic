import Mahasiswa from "../model/Mahasiswa.js";
import Kelas from "../model/Kelas.js";
import Mahasiswa_Kelas from "../model/Mahasiwa_Kelas.js";
import Inovasi from "../model/Inovasi.js";
class Assosicate {
    static init() {
        Kelas.belongsToMany(Mahasiswa, {through: Mahasiswa_Kelas});
        Mahasiswa.belongsToMany(Kelas, {through: Mahasiswa_Kelas});
        Mahasiswa.hasMany(Inovasi);
        Inovasi.belongsTo(Mahasiswa);
    };
};

export default Assosicate