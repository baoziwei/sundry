// let path = require("path");  //node自带的模块
// module.exports = {
//     // mode:'development',
//     entry: "./src/index.js",
//     output: {
//         filename: "index.[hash:6].js",
//         path:path.resolve(__dirname,'dist')
//     }

// }

let path = require("path");  //node自带的模块
const HtmlWebpackPlugin = require('html-webpack-plugin');  // 用来自动根据对应的html模板生成新的html
// const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');   //压缩css

module.exports = {
    optimization:{
        minimizer:[
            new OptimizeCssAssetsPlugin()
        ]
    },
    mode:'development',
    entry:{
        index:'./src/index.js',
        other:'./src/other.js'
    },
    output: {
        filename: '[name].[hash:5].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        // new CleanWebpackPlugin({

        // }),
        new MiniCssExtractPlugin({
            filename:"css/[name].[hash:5].css",
            chunkFilename:'css/[id].[hash:5].css',
        }),
        new HtmlWebpackPlugin({
            // title:"啦啦啦啦嘻嘻嘻",
            template:'./public/index.html',   //指定模板
            hash:true,
            filename:'index.html',
            chunks:["index"],
        }),
        new HtmlWebpackPlugin({
            // title:"hahahha",
            template:'./public/other.html',   //指定模板
            // hash:true,
            filename:'other.html',
            chunks:["other"],
        }),
     

    ],
    module:{
        rules:[
            // 放的是各种规则和loader
            // 单独合并独立css文件   npm install --save-dev mini-css-extract-plugin
            {
                test:/\.css$/,  //匹配那些文件(后缀是.css文件)  加载css文件至少需要安装>npm i css-loader style-loader
                // use   loader加载的顺序是相反的，从右向左，从下往上
                use:[{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      esModule:true
                    },
                },{
                    loader:"css-loader",
                    options:{
                        importLoaders:2  //先去使用后面的加载器加载
                    }
                },'postcss-loader','less-loader'],   //使用什么加载器  1.直接写字符串（适用于只需要一个loader   2.数组（多个loader））
            },

            // 兼容不同浏览器需要postcss-loader
             // 使用postcss-loader需要配置postcss.config.js这个配置文件
            //  还需要告诉webpack 要兼容那些浏览器
            {
                test:/\.less$/,  
                // less首先要编译css,还需要
                use:[{//'style-loader',
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      esModule:true
                    },
                },'css-loader','postcss-loader','less-loader',],
                exclude:/node_modules/,   //除了node_modules文件

            },
            {
                test:/\.(jpg|jpeg|png|gif|eot|woff|ttf|svg)$/,
                // use:"file-loader"
                use:{
                    loader:"file-loader",
                    options: {
                        name:"imgs/[name].[ext]"
                      },
                }
            }
        ],   
    },
    devServer:{
        // port:5000,  //启动服务的端口
        open:true,  //自动打开浏览器页面
        hot:true,
        // compress:true,
        // contentBase:'dist/newIndex.html',   //静态资源目录
        proxy:"https://api.bilibili.com",
    },
}




/*
  bable  是为了把高级语法转成低版本语法
  @bable/core
  bable-loader  把bable和webpack进行一个链接
  @bable/preset-env   预设
*/


//  装bable-loader   新建.babelrc文件