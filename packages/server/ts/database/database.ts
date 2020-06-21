import MongoDB from './mongodb/mongodb';
import * as dotenv from 'dotenv';
import log from '../util/log';

dotenv.config();

class Database {
    database: any;
    databaseType: string;

    constructor(databaseType) {
        this.database = null;
        this.databaseType = databaseType;

        switch (this.databaseType) {
            case 'mongo':
            case 'mongodb':
                this.database = new MongoDB(
                    process.env.MONGODB_HOST,
                    process.env.MONGODB_PORT,
                    process.env.MONGODB_USER,
                    process.env.MONGODB_PASSWORD,
                    process.env.MONGODB_DATABASE,
                    process.env.MONGODB_USE_SRV,
                );
                break;

            default:
                log.error(
                    'The database ' + this.databaseType + ' could not be found.'
                );
                break;
        }
    }

    getDatabase(): any {
        if (!this.database)
            log.error(
                '[Database] No database is currently present. It is advised against proceeding in this state.'
            );

        return this.database;
    }
}

export default Database;
