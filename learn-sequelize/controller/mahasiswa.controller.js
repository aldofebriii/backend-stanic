import Kelas from "../model/Kelas.js";
import Mahasiswa from "../model/Mahasiswa.js";

class MahasiswaController {
    static createMahasiswa = async (req, res, next) => {
        const data = req.body;
        if(!data.firstName || !data.lastName || !data.IP || !data.nomorKelas) return res.status(400).json({msg: 'mising requried fields'});

        const kelas = await Kelas.findOne({where: {
            nomor: data.nomorKelas
        }});

        if(!kelas) return res.status(404).json({msg: 'invalid kelas nomor'});

        const mahasiswa = await Mahasiswa.create({
            firstName: data.firstName,
            lastName: data.lastName,
            IP: data.IP
        });

        await mahasiswa.addKelas(kelas);

        return res.status(200).json(mahasiswa);
    };

    static getMahasiswas = async (req, res, next) => {
        const mahasiswas = await Mahasiswa.findAll({include: Kelas});
        return res.status(200).json(mahasiswas);
    };

    static tambahKelas = async (req, res, next) => {
        const { mahasiswaId } = req.params;
        const { nomorKelas } = req.body;
        if(!nomorKelas || !mahasiswaId) return res.status(400).json({msg: 'missing required fiedls'});
        const mahasiswa = await Mahasiswa.findOne({where: {
            id: mahasiswaId
        }, include: Kelas});

        const kelas = await Kelas.findOne({
            where: {
                nomor: nomorKelas
            }
        });
        if(!mahasiswa || !kelas) return res.status(404).json({msg: 'not found'});

        const listOfNomorKelas = mahasiswa.kelas.map((k) => k.nomor);

        if(listOfNomorKelas.indexOf(nomorKelas) > -1) return res.status(400).json({msg: 'kelas telah ditambahkan sebelumnya'})

        await kelas.addMahasiswa(mahasiswa);

        await mahasiswa.reload();
        return res.status(200).json(mahasiswa);
    };
};

export default MahasiswaController;