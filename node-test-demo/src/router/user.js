const { 
    SuccessModel,
    ErrorModel 
}  = require('../model/resModel')

const { login }   = require('../controller/user')




const handleUserRouter =  ( req, res ) => {

    const { method }   = req

    // 登录 

    if( method == 'POST' && req.path == '/api/user/login' ){
        
        const  { username, password } = req.body

        const  result = login( username, password )


        return result.then( data => {
            if( data.username ){
                
                req.session.username = data.username

                req.session.realname = data.realname

                return new SuccessModel(data)
            }else{
                return new ErrorModel('登录失败')
            }
        })

    }

    //登录验证的测试
    // if( method == 'GET' &&req.path === '/api/user/login-test'){
    //     console.log(req.session)
    //     if( req.session.username ) {
    //         return Promise.resolve( 
    //             new SuccessModel(
    //                 {
    //                     session:req.session
    //                 }
    //             )
    //         )
    //     } else {
    //         return Promise.resolve(  new ErrorModel('尚未登录') )
    //     } 
    // }
}

module.exports = handleUserRouter