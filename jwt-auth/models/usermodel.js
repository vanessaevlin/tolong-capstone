import { Sequelize } from 'sequelize';
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allownull: false,
        validate:{
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allownull: false,
        validate:{
            notEmpty: true,
            len: [3,100]
        }
    },
    email:{
        type: DataTypes.STRING,
        allownull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    alamat:{
        type: DataTypes.STRING,
        allownull: true,
    },
    nomorhp:{
        type: DataTypes.STRING,
        allownull: true,
    },
    password:{
        type: DataTypes.STRING,
        allownull: false,
        validate:{
            notEmpty: true
        }
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});

export default Users;