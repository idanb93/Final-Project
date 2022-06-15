
const {
    insertUser,
    authenticateUser,
    getUserData,
} = require('../modules/users')

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// CREATE - POST insert/create a product
const _insertUser = (req, res) => {
    insertUser(req.body)
        .then(response => {
            res.send({ msg: response });
        })
        .catch(err => {
            console.log(err);
            res.json({ msg: err })
        })
}

const generateToken = (email, company_name) => {
    try {
        const token = jwt.sign(
            // payload contains identifier + uniqe field (e.g expiration time)
            { email, company_name, expiresIn: new Date((new Date().getTime() + 5 * 60000)) },
            process.env.JWT_PK, // secret key from .env
            { expiresIn: '300s' } // 5 minutes
        );

        return token;
    } catch (err) {
        throw err;
    }
}

const _authenticateUser = (req, res) => {

    const { email, password } = req.body;

    authenticateUser(email, password)
        .then(response => {
            if (response.isValidUser) {
                if (req.session) {
                    const token = generateToken(email, response.companyName);
                    req.session.JwtHttpOnly = token;
                    res.status(200).send(response);
                }
            } else {
                res.status(400).send(response);
            }
        })
        .catch(err => {
            res.status(400).send({
                error: '400',
                msg: "Invalid email or password",
            })
        })
}

const _getUserData = (req, res) => {

    getUserData()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            res.json({ msg: err })
        })
}

const _logout = (req, res) => {
    res.clearCookie('session').end();
}

module.exports = {
    _insertUser,
    _authenticateUser,
    _getUserData,
    _logout,
}