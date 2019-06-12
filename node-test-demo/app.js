const querystring       = require('querystring')
const { getPostData }   = require('./src/lib/common')
const handleUserRouter  = require('./src/router/user')
const HandleBlogRouter  = require('./src/router/blog')

const serverHandle = ( req, res ) => {

    // 设置返回格式 JSON
    res.setHeader('Content-type','application/json')

    // 获取path
    const url = req.url
    req.path  = url.split('?')[0]

    // 解析query
    req.query =  querystring.parse(url.split('?')[1])

    // 解析 data
    getPostData( req ).then( postData => {

        req.body = postData

        // 处理 blog 路由 
        const blogData = HandleBlogRouter( req, res )
        if( blogData ) {
            res.end(
                JSON.stringify(blogData)
            )
            return false
        }

        // 处理 user 路由 
        const userData = handleUserRouter( req, res )
        if( userData ) {
            res.end(
                JSON.stringify(userData)
            )
            return false
        }

        //未命中路由 返回 404
        res.writeHead( 404 , { 'Content-type' : 'text/plain' } )
        res.write('404 Not Found \n')
        res.end()

    })

}

module.exports = serverHandle