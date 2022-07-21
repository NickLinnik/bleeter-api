require('dotenv').config()

const connection = {
    'username': process.env.POSTGRES_USER,
    'password': process.env.POSTGRES_PASSWORD,
    'database': process.env.POSTGRES_DB,
    'host': process.env.POSTGRES_HOST,
    'dialect': 'postgres'
}
const config = {
    'development': connection,
    'test': connection,
    'production': connection
};

module.exports = config;
