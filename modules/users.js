
const db = require('../connections/heroku-pg');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const isPrimaryKeyExist = async (primaryKey, primaryKeyValue) => {
    try {
        const res = await (db('users').where(primaryKey, primaryKeyValue))
        return res.length !== 0;

    } catch (err) {
        console.log(err);
    }
}

const insertUser = async (user) => {

    const alphaBet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const randomIndex = Math.floor(Math.random() * alphaBet.length);
    const item = alphaBet[randomIndex];

    user['password'] += item;

    try {
        const isUserExist = await isPrimaryKeyExist('email', user.email);

        if (isUserExist) {
            throw Error('Email is already in use.');
        } else {
            return db('users')
                .insert(user)
                .returning('*')
        }

    }
    catch (err) {
        return err.message;
    }
}

const getUserData = (company_name) => {

    let companyName = '';

    jwt.verify(req.session.JwtHttpOnly, process.env.JWT_PK, (err, decoded) => {
        companyName = decoded['company_name'];
    });

    return db('users').where(company_name, companyName);

}

const authenticateUser = async (email, password) => {

    const alphaBet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    try {
        const user = await db('users').where('email', email);

        let match = false;
        let i = 0;

        while (!match) {
            match = password + alphaBet[i] === user[0].password;
            i++;
        }

        if (!user || user.length === 0 || !match) {
            return { isValidUser: false, msg: 'Invalid username or password' }
        }

        const companyName = user[0].company_name;
        return { isValidUser: true, msg: 'You have sucessfully signed in!', companyName: companyName };
    }
    catch (err) {
        console.log('Invalid username or password');
    }
}

module.exports = {
    insertUser,
    authenticateUser,
    getUserData,
}