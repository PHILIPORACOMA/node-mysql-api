import config from '../config.json';
import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import accountModel from '../accounts/account.model';
import refreshTokenModel from '../accounts/refresh-token.model';

const db: any = {};
export default db;

initialize();

async function initialize() {
     const host = process.env.DB_HOST || config.database.host;
       const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT as string) : config.database.port;
       const user = process.env.DB_USER || config.database.user;
       const password = process.env.DB_PASSWORD || config.database.password;
       const database = process.env.DB_NAME || config.database.database;
    // Create DB if it doesn't exist then close connection
       // 1. ADDED SSL HERE
         const connection = await mysql.createConnection({ 
             host, 
             port, 
             user, 
             password,
             ssl: { rejectUnauthorized: false } 
         });     
        // Create DB if it doesn't exist
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
        
        // Connect to DB
        // 2. ADDED SSL HERE
        const sequelize = new Sequelize(database, user, password, { 
            dialect: 'mysql',
            dialectOptions: {
                ssl: {
                    rejectUnauthorized: false
                }
            }
        });

    // Init models
    db.Account = accountModel(sequelize);
    db.RefreshToken = refreshTokenModel(sequelize);

    // Define relationships
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);

    // Sync models with database
    await sequelize.sync();

    console.log('Database initialized successfully');
}