// use nodejs here 

// const http = require('http');//  package.json file me  enter a "type":"commanjs" when you can use this 
import http from 'http'
import fs from 'fs';
// const gfname = require('./features')
// import gfname ,{gfname2,gfname3}from './features.js';
// import {gfname2,gfname3}from './features.js'

// console.log(gfname)
// console.log(gfname2)
// console.log(gfname3)

// import * as myObj from './features.js';
// console.log (myObj)

import {generateLovePercent} from './features.js'

console.log("love is",generateLovePercent())

const home = fs.readFileSync("./index.html")
 const server = http.createServer((req,res)=>{
//   console.log(req.url);



if(req.url==="/"){
    
//    fs.readFile("./index.html",(err,home)=>{
//     res.end(home)
//    })
res.end(home)
}
else if(req.url==="/about"){
    res.end(`<h1> About page <h1/> <br> <h2> love is ${generateLovePercent()} </h2>`)
}
else if(req.url==="/contact"){
    res.end("<h1> contact page <h1/>")
}
else if(req.url==="/login"){
    res.end("<h1> login page <h1/>")
}
else{
    res.end("<h1> Page not found <h1/>")
}

});

server.listen(5000,()=>{
    console.log("Server is working")
})