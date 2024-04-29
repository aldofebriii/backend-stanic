import crypto from 'crypto';
import fs from 'fs';
import { parsingDate } from '../util/parsingDate.js';

class UserController {
    static allUser = (req, res, next) => {
        const payload = [];
        const filenames = fs.readdirSync('./datasource');
        for(const file of filenames) {
            const data = Buffer.from(fs.readFileSync('./datasource/' + file)).toString('utf-8');
    
            const user = JSON.parse(data);
        
            user.accessAt = parsingDate();
            payload.push(user);
        }
        return res.status(200).json(payload);
    };

    static createUser = (req, res, next) => {
        const user = req.body;
        if(!user.nama || !user.email || !user.password || !user.nim) {
            return res.status(400).json({msg: "Missing required fields"});
        };

        user.createdAt = parsingDate;
        user.id = crypto.randomUUID();
    
        fs.writeFileSync('./datasource/' + user.id + '.json', JSON.stringify(user));
    
        //Buffer.from(data).toString('utf-8')
    
        return res.status(201).json(user);
    };
};

export default UserController;