const { 
    SuccessModel,
    ErrorModel 
}  = require('../model/resModel')

const { loginCheck }   = require('../controller/user')

const handleUserRouter =  ( req, res ) => {

    const { method }   = req

    // 登录 

    if( method == 'POST' && req.path == '/api/user/login' ){
        
        const  { username, password } = req.body

        const  result = loginCheck( username, password )


        return result.then( data => {
            if( data.username ){
                return new SuccessModel(data)
            }else{
                return new ErrorModel('登录失败')
            }
        })

    }
}

module.exports = handleUserRouter