const env = process.env.NODE_ENV //环境参数

// 配置

let  MYSQL_CONF;

if( env == 'dev' ){

    MYSQL_CONF = {

        host:'localhost',
        user:'root',
        password:'',
        database:'myblog'
        
    }

}

if( env == 'production' ){

    MYSQL_CONF = {

        HOST:'localhost',
        user:'root',
        password:'',
        database:'myblog'

    }

}

module.exports = {
    MYSQL_CONF
}