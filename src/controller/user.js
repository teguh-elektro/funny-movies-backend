const userModel = require('../model/user')
const { response } = require('../helper/send')
const moment = require('moment')

module.exports = {
    logoutUser: async(req, res) => {
        try{
            const {
                email,
                id
            } = req.body;

            const body = {
                update_date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                status: 0
            };

            const result = await userModel.logoutUser(body, email, id);
            // console.log(result)
            console.log(result.message.split(' ')[2]);
            // console.log(result.message.split(' ')[5]);
            let match = result.message.split(' ')[2];
            if(match == 1){
                response(res, 200, {message: "the user is logout"}) 
            }else{
                response(res, 406, {message: "the user is not found"})
            }
        }catch(error){
            response(res, 500, {message: "the server is error", error: error})
        }
    },
    statusUser: async(req, res) => {
        try{
            const {
                email,
                password
            } = req.body;
            
            const body = {
                email,
                password,
                created_date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                update_date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                status: 1
            };
            const result = await userModel.verifyUser(body.status, email, password);
            // console.log(result)
            // console.log(result.message.split(' ')[2]);
            // console.log(result.message.split(' ')[5]);
            let match = result.message.split(' ')[2];
            let change = result.message.split(' ')[5]
            if(match == 1) {
                if(change == 1){
                    const result = await userModel.readIdUser(email, password)
                    response(res, 200, {data: result})
                }else{
                    response(res, 200, {message: "the user is login"})
                }
                
            }else{
                await userModel.addUser(body);
                const result = await userModel.readIdUser(email, password)
                console.log(result)
                response(res, 200, {data: result}) 
            }
        }catch(error){
            response(res, 500, {message: "the server is error", error: error})
        }
    },
}