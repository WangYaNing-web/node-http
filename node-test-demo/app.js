const querystring       = require('querystring')
const { getPostData }   = require('./src/lib/common')
const handleUserRouter  = require('./src/router/user')
const HandleBlogRouter  = require('./src/router/blog')

const SESSION_DATA = {}


const getCookieExpires = () => {
    const d = new Date()
    d.setTime( d.getTime() + (24 * 60 * 60 * 1000 ) )
    return d.toGMTString()
}


const serverHandle = ( req, res ) => {

    // 设置返回格式 JSON
    res.setHeader('Content-type','application/json')

    // 获取path
    const url = req.url
    req.path  = url.split('?')[0]

    // 解析query
    req.query =  querystring.parse(url.split('?')[1])

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach( item => {

        if( !item ){
            return 
        }

        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()

        req.cookie[key] = val

    })

    // 解析session 
    let needSetCookie = false 
    let userId = req.cookie.userid

    if ( userId && !SESSION_DATA[userId] ) {
        SESSION_DATA[userId] = {}
        
    } else {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]

    // 解析 data
    getPostData( req ).then( postData => {

        req.body = postData

        // 处理 blog 路由 
        const blogResult = HandleBlogRouter( req, res )
        
        if( blogResult ){
            blogResult.then( blogData => {
                
                if( needSetCookie ) {
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return 
        }

        // 处理 user 路由 
        const userResult = handleUserRouter( req, res )
        if( userResult ){
            userResult.then( blogData => {

                if( needSetCookie ) {
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }

                res.end(
                    JSON.stringify(blogData)
                )
            })
            return 
        }

        //未命中路由 返回 404
        res.writeHead( 404 , { 'Content-type' : 'text/plain' } )
        res.write('404 Not Found \n')
        res.end()

    })

}

module.exports = serverHandle