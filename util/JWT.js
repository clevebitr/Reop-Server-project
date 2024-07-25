const jsonwebtoken = require('jsonwebtoken')
const SECRET_KEY = "REOPHTMLKEY"

const JWT = {
    generate(value,expires){
        return jsonwebtoken.sign(value,SECRET_KEY,{expiresIn:expires})
    },
    verify(token){
        try{
            return jsonwebtoken.verify(token,SECRET_KEY)
        }catch(e){
            return false
        }
    }
}

module.exports = JWT