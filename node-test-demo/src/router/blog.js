
const { 
    getList, 
    getDetail, 
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')

const { 
    SuccessModel,
    ErrorModel 
}  = require('../model/resModel')



const HandleBlogRouter = ( req, res ) => {

    const { method }   = req
    const id  = req.query.id || ''

    // 获取博客列表
    if( method == 'GET' && req.path === '/api/blog/list' ){

        const author    = req.query.author || ''
        const keyword   = req.query.keyword || ''

        const result = getList( author, keyword )

        return result.then( listData => {
            return new SuccessModel( listData )
        })

        
    }

    // 获取博客详情 

    if( method == 'GET' && req.path === '/api/blog/detail' ){

        const result = getDetail( id )

        return result.then( rowData => {
            return new SuccessModel( rowData )
        })
    }


    // 新建博客 

    if( method == 'POST' && req.path === '/api/blog/new' ){

        const author = 'zhangsan'

        req.body.author = author

        const insertResult  = newBlog( req.body )

        return insertResult.then( insertData => {
            return new SuccessModel(insertData)
        })
    }

    // 更新博客 

    if( method == 'POST' && req.path === '/api/blog/update' ){

        const updataResult  = updateBlog( id, req.body )


        return updataResult.then( updataData => { 
            if( updataData ){
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
        
    }

    // 删除博客 

    if( method == 'GET' && req.path === '/api/blog/del' ){

        const author = 'zhangsan'
        const delResult = delBlog( id, author )

        return delResult.then( val  => {
            if( val ) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败')
            }
        })

        
    }
}
module.exports = HandleBlogRouter