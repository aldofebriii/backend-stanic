import Kelas from "../model/Kelas.js";

class KelasController {
    static createKelas = async (req, res, next) => {
        const data = req.body;
        if(!data || !data.nomor || !data.content) return res.status(400).json({msg: 'missing required fields'});

        const kelas = await Kelas.create({
            nomor: data.nomor,
            content: data.content
        });

        return res.status(200).json(kelas);
    };
};

export default KelasController;