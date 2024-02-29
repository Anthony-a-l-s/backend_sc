require('dotenv').config();
const User = require('../../database/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function verifyEmpty(name, username, email, password, admin) {
    let string = '';
    if (!name) {
        string = string + 'nome,';
    }
    if (!username) {
        string = string + ' nome de usuário,';
    }
    if (!email) {
        string = string + ' email,';
    }
    if (!password) {
        string = string + ' senha,';
    }
    if (admin !== false && admin !== true) {
        string = string + 'admin, ';
    }
    return string;
}

module.exports = {


    create: async function (req, res, next) {
        const { name, username, email, password, admin } = req.body;
        const empty = verifyEmpty(name, username, email, password, admin)
        if (empty !== '') {
            res.status(400).json(`${empty} não preenchido(s)`);
            return;
        };
        let errors = '';
        await User.findAll({
            where: {
                username: username
            }
        }).then((result) => {
            if (result.length !== 0) {
                errors = errors + 'Nome de usuário já exixtente. ';
            }
        });

        await User.findAll({
            where: {
                email: email
            }
        }).then((result) => {
            if (result.length !== 0) {
                errors = errors + 'Email já existente.';
            }
        });

        if (errors != '') {
            res.status(400).json(errors)
            return;
        }
        const encryptedPassword = bcrypt.hashSync(password, 10)
        await User.create({
            name: name,
            username: username,
            email: email,
            password: encryptedPassword,
            admin: admin
        }).then(result => {
            return res.status(200).send(result);
        }).catch(error => {
            console.log('erro! ' + error);
            return res.status(400).send(error);
        })
    },

    login: async function (req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {
                email: email,
            }
        })
        if (!user) {
            console.log('Email não cadastrado');
            return res.status(400).json('Email não cadastrado');
        }
        if (!bcrypt.compareSync(password, user.password)) {
            console.log('Email ou Senha incorretos');
            return res.status(400).json('Email ou Senha incorretos');
        } else {
            console.log(user.admin)

            let jwtPayload = { id: user.id };
            let token = jwt.sign(jwtPayload, process.env.JWT_SECRET);
            return res.status(200).json({ id: user.id, name: user.name, username: user.username, email: user.email, token: token });

        }
    },

    findByToken: async function (req, res, next) {
        const { token } = req.params
        let id
        console.log('token')
        console.log(token)
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(401).end()
            }
            console.log(decoded)
            id = decoded.id;
        })
        await User.findOne({
            where: {
                id: id
            }
        }).then(result => {
            console.log('Sucesso!')
            return res.status(200).json({ id: result.id, name: result.name, username: result.username, email: result.email, admin: result.admin });
        }).catch(error => {
            return res.status(400).json(error);
        })
    }


}