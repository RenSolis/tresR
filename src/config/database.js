// Modules
import Sequelize from 'sequelize';
import config from './db-config';
import fs from 'fs';
import path from 'path';

let db = { models: {} };

// Import models to sequelize
const sequelize = new Sequelize(
    config.development.database, 
    config.development.username,
    config.development.password,
    config.development.params
);
// Read all files Models
const dir = path.join(__dirname, '../models');
fs.readdirSync(dir).forEach(filename => {
    const modelDir = path.join(dir, filename);
    const model = sequelize.import(modelDir);
    db.models[model.name] = model;
});
//Associate models
Object.keys(db.models).forEach(key => {
    if (db.models[key].associate)
        db.models[key].associate(db.models);
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export only the database
module.exports = db;


