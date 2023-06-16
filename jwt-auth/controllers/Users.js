import Users from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const mainpage = async(req, res) => {
    console.log("Response success");
    res.status(200).json({msg: "Response Success!"});
}

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['uuid','name','email']
        });
        res.status(200).json(users);
    } catch (error){
        res.status(500).json({msg: error.message});
    }
}

export const Register = async(req, res) => {
    const {name, email, password, confPassword} = req.body;
    if(name == "" || email == "" || password == "" || confPassword == "" ) {
        return res.status(400).json({error: "true",msg: "Empty Input Fields!"});
    }
        else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return res.status(400).json({error: "true", msg: "Email is Invalid"});
        }
            else if(password !== confPassword) {
                return res.status(400).json({error: "true", msg: "Password and Confirm Password Invalid"});
            }
                else if(password.length < 8 || confPassword < 8) {
                    return res.status(400).json({error: "true", msg: "Password is Too Short"});
                }
             const salt = await bcrypt.genSalt();
             const hashPassword = await bcrypt.hash(password, salt);
            try {
                await Users.create({
                name: name,
                email: email,
                password: hashPassword
            });
            res.status(201).json({error: "false", msg: "Register Success"});
            } catch (error) {
                res.status(400).json({msg: error.message});
            };
    }



export const Login = async(req, res) => {
      try {
        const user = await Users.findOne({
        where:{
            email: req.body.email
        }
    });
    const match = await bcrypt.compare(req.body.password, user.password);
    if(!match) return res.status(400).json({error:"true",msg: "Wrong Password"});
    const userId = user.id;
    const name = user.name;
    const email = user.email;
    const alamat = user.alamat;
    const nomorhp = user.nomorhp;
    const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '20s'
    });
    const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d'
    });
    await Users.update({refresh_token: refreshToken},{
        where:{
            id: userId
        }
    });
    res.cookie('refreshToken', refreshToken,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    res.status(200).json({error: "false",msg: "Login Successfully",loginresult:{accessToken: accessToken,name: name, email:email, alamat:alamat, nomorhp:nomorhp}});
    } catch (error) {
        res.status(404).json({error: "true", msg:"Email can't be found"});
    }
    
}

export const EditUser = async(req, res) => {
        const user = await Users.findOne({
        where:{
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({error: "true",msg: "User can't found"});
    const {name, email, alamat, nomorhp, password}=req.body;
    const salt = await bcrypt.genSalt();
    let hashPassword; 
    try {
        if(password === "" || password === null){
            hashPassword = user.password;
        } else {
            hashPassword = await bcrypt.hash(password, salt);
        }
        await Users.update({
            name: name,
            email: email,
            alamat: alamat,
            nomorhp: nomorhp,
            password: hashPassword
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({error: "false",msg: "Profil Changed Succesfully",editresult:{name: name,email: email, alamat:alamat, nomorhp:nomorhp, password:password}})
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}

export const Logout = async(req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(204);
        const user = await Users.findOne({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user) return res.sendStatus(204);
        const userId = user.id;
        await Users.update({refresh_token: null},{
            where:{
                id: userId
            }
        })
        res.clearCookie('refreshToken');
        return res.status(200).json({error: "false", msg: "Logout Success"});
}
