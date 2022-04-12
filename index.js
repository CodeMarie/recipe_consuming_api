const express = require('express');
const path = require ('path')
const app = express();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require("dotenv").config();

const apiKey= process.env.API_KEY; 

app.use(express.urlencoded());
app.use(express.json());

app.set('view engine', 'ejs');
app.set("views", __dirname);

app.post("/search", async (req, res) => {
const endpoint = `https://api.spoonacular.com/food/search?query=${req.body.product}&number=2&apiKey=${apiKey}`;
const foodApiResponse = await fetch(endpoint, {method: 'GET'});
const foodApiResponseAsJson = await foodApiResponse.json();
const recipe = foodApiResponseAsJson.searchResults[0].results[0]
res.render('productPage', recipe)
});

app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname + "/index.html"));
    });

    app.get("/product", (req, res) => {
        res.render('productPage', {});
    });

app.get("*", (req, res) => {
    res.status(404).render("error", {url: req.url});
});


app.listen(process.env.PORT);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
