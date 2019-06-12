/**
 * @event  获取博客列表
 * @params 参数说明
 *         author:作者名称   
 *         keyword:关键字查询
 */
const getList = ( author, keyword ) => {
    // 假数据 格式正确
    return [
        {
            id: 1,
            title:'标题A',
            content : '内容A',
            createTime:1560320889530,
            author:'zhangsan'
        },
        {
            id: 2,
            title:'标题B',
            content : '内容B',
            createTime:1560320943278,
            author:'lisi'
        },
    ]
}
/**
 * @event  获取博客详情
 * @params 参数说明
 *         id:查询的博客id   
 */

const getDetail = ( id ) => {
    return {
        id: 1,
        title:'标题A',
        content : '内容A',
        createTime:1560320889530,
        author:'zhangsan'
    }
}

/**
 * @event  新建博客
 * @params 参数说明
 *         blogData: 博客信息   
 */
const newBlog = ( blogData = {} ) => {

    return {
        id: 3
    }
}
/**
 * @event  更新博客
 * @params 参数说明
 *         id: 更新博客id
 *         blogData: 更新博客信息 
 */
const updateBlog = ( id , blogData = {} ) => {
    // id 要更新博客的id
    // blogData 新建信息
    return true

}

/**
 * @event  删除博客
 * @params 参数说明
 *         id: 删除博客id
 */

const delBlog = id  => {
    return true 
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}