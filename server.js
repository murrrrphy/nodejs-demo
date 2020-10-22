var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('收到请求！请求路径（带查询参数）为：' + pathWithQuery)

    if (path === '/') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`
        <!doctype html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>会动的页面</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box
        }

        *::before {
            box-sizing: border-box
        }

        *::after {
            box-sizing: border-box
        }

        #html {
            word-break: break-all;
        }

        #div1 {
            position: fixed;
            right: 20px;
            top: 20px;
            width: 400px;
            height: 400px;
        }

        #div1::before {
            content: '';
            position: absolute;
            display: block;
            width: 200px;
            height: 200px;
        }

        #div1::after {
            content: '';
            position: absolute;
            display: block;
            width: 200px;
            height: 200px;
        }

        @keyframes x {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }

        @media (max-width: 500px) {
            #html {
                height: 50vh;
                overflow: auto;
            }

            #div1Wrapper {
                height: 50vh;
            }

            #div1 {
                position: relative;
                top: 25%;
                left: 25%;
                width: 200px;
                height: 200px;
            }

            #div1::before {
                width: 100px;
                height: 100px;
            }

            #div1::after {
                width: 100px;
                height: 100px;
            }
        }
    </style>
</head>
<body>
<style id="style"></style>
<div id="html"></div>
<div id="div1Wrapper">
    <div id="div1"></div>
</div>
<script src="/js"></script>
</body>
</html>`)
        response.end()
    }else if (path === '/js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(`let html = document.querySelector("#html");
let style = document.querySelector("#style");
let string = \`/*你好，我是一名前端工程师
 *接下来我要展示一下我的前端功底
 *首先，我要准备一个div
 **/
#div1{
    border: 1px solid red;
}
/*接下来我要把div变成一个八卦图
 *注意看好了
 *首先，把div变成一个圆
**/
#div1{
    border-radius: 50%;
    box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.75);
    border: none;
}
/*八卦是阴阳组成的
 *一黑一白
**/
#div1{
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%,
                rgba(255,255,255,1) 50%, rgba(0,0,0,1) 50%, 
                rgba(0,0,0,1) 100%);
}
/*阴阳衍化出两条阴阳鱼
 *互相交融
 *首先是黑色阴阳鱼
**/
#div1::before{
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: black;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,1) 0%,
                rgba(255,255,255,1) 25%, rgba(0,0,0,1) 25%, 
                rgba(0,0,0,1) 100%);
}
/*然后是白色阴阳鱼**/
#div1::after{
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,0,0,1) 0%, 
    rgba(18,18,18,1) 25%, rgba(255,255,255,1) 25%, 
    rgba(255,255,255,1) 100%);
}
/*最后，再装个逼
 *我要让这个八卦转起来
 **/
#div1{
    animation: x 10s infinite linear;    
}
/*谢谢观看**/
\`;
let string2 = "";
let n = 0;

let step = () => {
    setTimeout(() => {
            if (string[n] === \`\\n\`) {
                string2 += "<br>"
            } else if (string[n] === " ") {
                string2 += "&nbsp;";
            } else {
                string2 += string[n];
            }
            html.innerHTML = string2;
            style.innerHTML = string.substring(0, n);
            window.scrollTo(0, 99999);
            html.scrollTo(0,99999);
            if (n < string.length - 1) {
                n += 1;
                step();
            }
        }, 50
    )
}

step();`)
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`404 NOT FOUND\n你访问的页面不存在\n`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n打开 http://localhost:' + port + '访问网站')