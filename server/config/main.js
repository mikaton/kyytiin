module.exports = {
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  mailer: {
    user: process.env.MAILER_USER,
    password: process.env.MAILER_PASSWORD
  }
};