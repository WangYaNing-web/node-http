const { exec } = require('../db/mysql')

/**
 * @event  获取博客列表
 * @params 参数说明
 *         author:作者名称   
 *         keyword:关键字查询
 */
const getList = ( author, keyword ) => {
    // sql语句开始
    let sql = `select * from blogs where 1=1 `
    // 作者
    if( author )    sql += `and author=${author}  `
    // 关键字
    if( keyword )   sql += `and title like '%${keyword}%' `
    // 倒序
    sql += `order by createtime desc;`
    // 返回promise 
    return exec( sql )
}
/**
 * @event  获取博客详情
 * @params 参数说明
 *         id:查询的博客id   
 */

const getDetail = ( id ) => {
    let sql = `select * from blogs where id='${id}'`
    return exec( sql ).then( rows => {
        return rows[0]
    })
}

/**
 * @event  新建博客
 * @params 参数说明
 *         blogData: 博客信息   
 */
const newBlog = ( blogData = {} ) => {
    const { title, content, author } = blogData
    const createTime = Date.now()
    let sql = `
        insert into blogs ( title, content, createtime, author ) 
        values ( '${title}', '${content}', '${createTime}', '${author}' )
    `
    return exec( sql ).then( insertData => {
        return {
            id:insertData.insertId
        }
    })
}
/**
 * @event  更新博客
 * @params 参数说明
 *         id: 更新博客id
 *         blogData: 更新博客信息 
 */
const updateBlog = ( id , blogData = {} ) => {
  
    const { title, content } = blogData

    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `

    return exec( sql ).then( updataData => {

        if( updataData.affectedRows > 0 )  {
            return true
        }
        return false

    })

}

/**
 * @event  删除博客
 * @params 参数说明
 *         id: 删除博客id
 */

const delBlog = ( id, author )  => {

    const sql = `delete from blogs where id=${id} and author='${author}'`

    return exec( sql ).then( delectData => {

        if( delectData.affectedRows > 0 )  {
            return true
        }
        return false

    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}