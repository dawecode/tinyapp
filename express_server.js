function generateRandomString() {
  const alphaNumerical = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (let i = 0; i < 7; i++) {
    result += alphaNumerical.charAt(Math.floor(Math.random() * alphaNumerical.length));
    }
    return result;
}

const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
//ejs
app.set("view engine", "ejs");
//body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

/*app.get("/", (req, res) => {
  res.send("Hello!");
});*/


app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  console.log("longURL", longURL);
  res.redirect(longURL);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("urls_show", templateVars);
});


app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.post('/urls/:id', (req, res) => {
  let longURL = req.body.longURL
  //console.log(req.body.longURL);
  urlDatabase[req.params.id] = longURL;
  res.redirect('/urls');
})

app.post('/urls/:shortURL/delete', (req, res) => {
  console.log("DELETE ROUTE HAS BEEN HIT");
  console.log(req.params.shortURL);
  delete urlDatabase[req.params.shortURL];
  res.redirect('/urls');
})


app.post("/urls", (req, res) => {
  const shortURL = generateRandomString();
  const longURL= req.body.longURL
  urlDatabase[shortURL]= longURL
  console.log(urlDatabase)
  res.redirect(`/urls/${shortURL}`);         
});


/*app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});*/

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});