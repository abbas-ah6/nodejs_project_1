const fs = require('fs');
const http = require('http');
const url = require('url');
const templateFun = require('./modules/template-module');
//|||||||||| FILES

// const inputFile = fs.readFileSync('./txt/input.txt', 'utf-8');
// const hello = "Hello World!";
// const textOut = `This is waht we know about the avcado: ${inputFile} \n created at ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut)
// console.log("File Added");

// fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
//     if (err)
//         return console.log(err);
//     console.log(data.split(' ').reverse().join(' '));
// })
// console.log('Reading Data!!')

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             fs.writeFile('./txt/final3.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//                 if (err) throw err;
//                 console.log("Your files have been saved!!");
//             })
//         })
//     });
// });

// console.log("Reading files async");

//|||||||||| SERVER

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const productsObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    // OVERVIEW
    if (pathname === '/' || pathname === '/overview') {

        const cardsHtml = productsObj.map(el => templateFun(tempCard, el)).join('');
        const outPut = tempOverview.replace(/%PRODUCTCARDS%/g, cardsHtml);
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        res.end(outPut);
    }

    // PRODUCT
    else if (pathname === "/product") {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        const product = productsObj[query.id];
        const outPut = templateFun(tempProduct, product);
        res.end(outPut);
    }

    // API
    else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data);
    }

    // NOT FOUND
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'custom-header': 'my custom header'
        })
        res.end('<h1>Page Not Found!</h1>')
    }
})

server.listen('8000', '127.0.0.1', () => {
    console.log('Server is running on port 8000');
})