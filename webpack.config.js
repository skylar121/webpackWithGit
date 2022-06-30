const path = require('path');
// node module의 path 문법 가져오기(경로가 상이해도 어떤 경로이든 가져올 수 있게)
// path 환경변수
// const myLoader = require('./myLoader');
const webpack = require('webpack');
const childProcess = require('child_process');

const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.DEV_API);
console.log(process.env.PRO_API);

module.exports = {
    mode: 'development', // production 모드로 하면 minify 자동으로 해줌 (main.js)
    entry: {
        main: path.resolve('./src/app.js')
    },
    output: {
        publicPath: '/webpack/dist/',
        filename: '[name].js',
        // entry의 key값이 자동으로 들어가게 된다
        path: path.resolve('./dist')
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     use: [
            //         path.resolve('./myLoader.js')
            //     ]
            // },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 200 * 1024
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: `
                Commit version : ${childProcess.execSync('git rev-parse --short HEAD')}
                Committer name : ${childProcess.execSync('git config user.name')}
                Commit Date : ${(new Date().toLocaleString())}
            `
        }),
        // 전역 상수 등록
        new webpack.DefinePlugin({
            pw: 123456
        }),
        new webpack.DefinePlugin({
            dev: JSON.stringify('https://dev.api.com'),
            pro: JSON.stringify('https://pro.api.com')
        })
    ]
}