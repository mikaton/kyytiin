module.exports = {
  development: {
    username: process.env.DB_USER_DEV,
    password: null,
    database: process.env.DB_DATABASE_DEV,
    host: process.env.DB_HOST_DEV,
    dialect: process.env.DB_DIALECT
  },
  test: {
    username: process.env.DB_USER_TEST,
    password: null,
    database: process.env.DB_DATABASE_TEST,
    host: process.env.DB_HOST_TEST,
    dialect: process.env.DB_DIALECT
  },
  production: {
    username: process.env.DB_USER_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_DATABASE_PROD,
    host: process.env.DB_HOST_PROD,
    dialect: process.env.DB_DIALECT
  }
}
