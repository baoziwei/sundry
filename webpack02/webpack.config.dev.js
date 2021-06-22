let path = require("path");  //node自带的模块
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');  // 用来清空之前打包生成的文件
console.log(__dirname);
const HtmlWebpackPlugin = require('html-webpack-plugin');  // 用来自动根据对应的html模板生成新的html

module.exports = {
    mode:"development",   //指定环境    development   production
    entry:'./src/A.js',
    output:{   
        // 打包后输出的文件
        filename:"aaa.[hash:6].js",   //指定打包后文件的名字
        // 还需要规定打包后的文件放到那
        path: path.resolve(__dirname,'dist'),//这是绝对路径

    },
    plugins:[
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:"啦啦啦啦嘻嘻嘻",
            template:'./index.html',
            filename:'newIndex.html',
        }),
    ],
    devServer:{
        port:5000,  //启动服务的端口
        open:true,  //自动打开浏览器页面
        hot:true,
        compress:true,
        contentBase:'dist',   //静态资源目录
    },
}