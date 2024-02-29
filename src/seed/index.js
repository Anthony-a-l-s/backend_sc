const User = require('../../database/models/user')
const bcrypt = require('bcrypt');


module.exports = {

    createAdmin: async function () {
        User.findAll().then((result) => {
            if (result.length !== 0) {
                console.log('Ja tem admin');
            } else {
                console.log('Criando admin');
                User.create({
                    name: 'admin',
                    username: 'admin',
                    email: 'admin@email',
                    password: bcrypt.hashSync('12345678',10),
                    admin: true
                });
            }

        })
    }

}

