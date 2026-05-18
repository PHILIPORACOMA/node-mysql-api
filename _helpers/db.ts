 
     import mysql from 'mysql2/promise';
     import { Sequelize } from 'sequelize';
     import accountModel from '../accounts/account.model';
     import refreshTokenModel from '../accounts/refresh-token.model';
    
     const db: any = {};
     export default db;
    
    initialize();
   
    async function initialize() {
        // 1. THIS FORCES IT TO READ RENDER VARIABLES FIRST
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT as string) : 3306;
        const user = process.env.DB_USER || 'root';
        const password = process.env.DB_PASSWORD || '';
        const database = process.env.DB_NAME || 'myapp';
   
        // 2. CREATE DB WITH SSL
        const connection = await mysql.createConnection({ 
            host, 
            port, 
            user, 
            password,
            ssl: { rejectUnauthorized: false }
        });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
        await connection.end();
   
        // 3. CONNECT SEQUELIZE WITH SSL
        const sequelize = new Sequelize(database, user, password, {
            dialect: 'mysql',
            host: host,
            port: port,
            dialectOptions: {
                connectTimeout: 60000,
                ssl: {
                    rejectUnauthorized: false
                }
            },
            logging: false
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