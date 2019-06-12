// 解析data
const getPostData = ( req ) => {
    const pormise = new Promise( ( resolve , reject ) => {
        if( req.method == 'GET' ){
            resolve({})
            return 
        } 
        if( req.headers['content-type'] !== 'application/json' ){
            resolve({})
            return
        }

        let postData = ''

        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if( !postData ){
                resolve({})
                return 
            }
            else{
                resolve(
                    JSON.parse( postData )
                )
            }
        })
    })
    return  pormise
}

module.exports = {
    getPostData
}