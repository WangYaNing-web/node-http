const HandleBlogRouter = ( req, res ) => {

    const method    = req.method
    const url       = req.url
    const path      = url.split('?')[0]

    if( method == 'GET' && path === '/api/blog/list' ){
        return {
            msg: '获取的数据'
        }
    }

}