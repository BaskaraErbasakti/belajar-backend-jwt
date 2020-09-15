const model = require("../model/users")
const respone = require("../helpers/respon")
const bcr = require("bcrypt")
const jwt = require("jsonwebtoken")
const { token } = require("morgan")
const tokenList = {}

class Auth {

    login = async (req, res) => {
        try {
            const passDB = await model.getByUser(req.body.username)

            if (passDB.length <= 0) {
                return respone(res, 200, "Username tidak terdaftar")
            }

            const passReq = req.body.password
            const check = await bcr.compare(passReq, passDB[0].password)

            if (check) {
                const {username, role} = req.body
                const result = await this.setToken(username, role)
                return respone(res, 200, result)
                
            } else {
                return respone(res, 200, "gagal login")
            }

        } catch (error) {
            console.log(error)
            respone(res, 500, error)
        }
    }

    setToken = async (user, role) => {
        try {
            const payload = {
                user,
                role,
            }

            const token = jwt.sign(payload, process.env.JWT_KEYS, {expiresIn: '10 minute'})
            const refreshToken = jwt.sign(payload, process.env.JWT_KEYS, {expiresIn: '1 year'})

            const result = {
                token,
                refreshToken,
                msg: "Token created, login succsess",
            }

            return result
        } catch (error) {
            throw error
        }
    }

    token = async (req, res) => {
        try {
            const {refreshToken, username} = req.body
            
            if(refreshToken) {
                const payload = {
                    "name": username
                }
                const token = jwt.sign(payload, process.env.JWT_KEYS, { expiresIn: '900'})
                const response = {
                    "token": token,
                }
                return respone(res, 200, response)   
            } 
        } catch (error) {
            return respone(res, 500, error)
        }
    }
}

module.exports = new Auth()