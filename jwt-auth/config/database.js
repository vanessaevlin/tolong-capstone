import { Sequelize } from "sequelize"

const db = new Sequelize('isi database anda','isi user anda','isi password anda',{
    host: "isi host anda",
    dialect: "mysql"
})

export default db;