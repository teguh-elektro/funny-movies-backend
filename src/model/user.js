const conn = require('../config/config')

module.exports = {
    logoutUser: (body, email, id) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE user SET ? WHERE email = ? AND id = ?`, [body, email, id], (err, result) => {
                if(err) reject('error')
                resolve(result)
            })
        })
    },
    verifyUser: (status, email, password) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE user SET status = ? WHERE email = ? AND password = ?`, [status, email, password], (err, result) => {
                if(err) reject('error')
                resolve(result)
            })
        })
    },
    readIdUser: (email, password) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT id, email, status FROM user WHERE email = ? AND password = ?`, [email, password], (err, result) => {
                if(err) reject('error')
                resolve(result)
            })
        })
    },
    addUser: (body) => {
        return new Promise ((resolve, reject) => {
            conn.query(`INSERT INTO user SET ?`, body, (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    } 
}