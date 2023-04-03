import { Sequelize } from "sequelize";

const db = new Sequelize('node_cero_experto', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});

export default db;