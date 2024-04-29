import { Sequelize } from "sequelize";
class PgDataSource {
    constructor(dbName, username, password, host) {
        console.log("Creating the connection..");
        this.repo = new Sequelize(dbName, username, password, {
            host: host,
            dialect: 'postgres',
            sync: {
                alter: true
            }
        });
    };

    async connect() {
        await this.repo.authenticate();
    };
};

const pgDataSoruce = new PgDataSource('stanic', 'postgres', '12345678', 'localhost');
export default pgDataSoruce;