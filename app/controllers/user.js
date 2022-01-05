const userModel = require('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../configs/');


const generatePassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHashed = await bcrypt.hash(password, salt);
    return passwordHashed;
};


const comparePassword = async (pass_login, pass_user) => {
    return await bcrypt.compare(pass_login, pass_user);
};


const createToken = async (user) => {

    const token = jwt.sign(
        { 
            user_id: user._id, 
            email: user.email
        },
        config.authentication.token_key,
        {
            expiresIn: "2h"
        }
    );
    user.token = token; // save token

    return user;
};


const createNewUser = async (dosc = {}) => {
    const insertDocs = { ...dosc };

    insertDocs.email = dosc.email.toLowerCase();

    // check user exist
    if (await userModel.findOne({'email': insertDocs.email})) { 
        throw new Error('User already exist. Please login');
    }

    insertDocs.password = await generatePassword(dosc.password);

    let newUser = new userModel(insertDocs);
    
    newUser = await createToken(newUser);

    await newUser.save();
};


const checkUserLogin = async (user) => {
    
    let dataUser = await userModel.findOne({'email': user.email.toLowerCase()})

    if (dataUser && await comparePassword(user.password, dataUser.password)) {
        
        dataUser = await createToken(dataUser);
        dataUser.password = undefined;
        delete dataUser.password;

        return dataUser;
    } else {
        throw new Error('Invalid Credentials')
    }
};


const getUsers = async () => {
    const users = await userModel.find();
    return users;
};


const getUserById = async (userId) => {
    const user = await userModel.findById(userId);
    return user;
};


const updateUserById = async (userId, docs) => {
    const updatedUser = await userModel.updateOne({
        _id: userId
    }, docs, {
        // return ค่าที่ update แล้วออกไปข้างนอกจะได้นำไปใช้ต่อได้
        returnOriginal: false
    })
    return updatedUser;
};


const deleteUserById = async (userId) => {
    const deleteUser = await userModel.deleteOne({
        _id: userId
    });

    return deleteUser;
};


module.exports = {
    createNewUser,
    checkUserLogin,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById
}
