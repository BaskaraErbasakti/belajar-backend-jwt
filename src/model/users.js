const db = require("../config/database")

class Users {
    getAll() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users ORDER BY id ASC")
                .then((res) => {
                    resolve(res.rows)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    getByUser(user) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM public.users WHERE username = '${user}'`)
                .then((res) => {
                    resolve(res.rows)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    getById(idusers) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE id = ${idusers}`)
                .then((res) => {
                    resolve(res.rows)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    addUsers(data) {
        const q = `INSERT INTO users(username, password, role) VALUES ('${data.username}','${data.password}', '${data.role}')`
        return new Promise((resolve, reject) => {
            db.query(q)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    delUsers(idUsers) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM public.users WHERE id = ${idUsers}`)
                .then((res) => {
                    resolve(`id ${idUsers} deleted`)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    setToken(user, token) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE public.users SET token = '${token}' WHERE username = '${user}'`)
                .then((res) => {
                    resolve(`token set in user : ${user}`)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}

module.exports = new Users()