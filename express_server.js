//express
const express = require("express");
const app = express();
//port
const PORT = 8080; // default port 8080
//ejs
app.set("view engine", "ejs");
//body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
//cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// password hasher 
const bcrypt = require('bcrypt');
// helper functions 
const { generateRandomString,findEmail, findPassword, findUserID, urlsForUser} = require("./helpers/userFunctions")

// newdatabase with id 
const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" }
};

// user database
const users = { 
  "aJ48lW": {
    id: "aJ48lW", 
    email: "b@b.com", 
    password:  bcrypt.hashSync("2", 10)
  },
};


//login form 
app.get("/login", (req, res) => {
  const templateVars = { 
  user: users[req.cookies["userID"]]
  };
  res.render("urls_login",templateVars);
});

//register form 
app.get("/register", (req, res) => {
  const templateVars = { 
  user: users[req.cookies["userID"]]
  };
  res.render("urls_registration",templateVars);
});

//main page
app.get("/urls", (req, res) => {
  
  const templateVars = { 
    urls: urlsForUser(req.cookies.userID, urlDatabase),
    user: users[req.cookies["userID"]]
  };
  console.log(req.cookies)
  res.render("urls_index", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL].longURL;
  console.log("longURL", longURL);
  res.redirect(longURL);
});

//new URLS 
app.get("/urls/new", (req, res) => {
// user should not see this page if not logged in 
console.log(req.cookies)
  const templateVars = { 
  user: users[req.cookies["userID"]]
  };
  if (!req.cookies.userID){
   res.redirect("/login")
  } else {
    res.render("urls_new",templateVars);
  };
});

//edit / show tiny url 
app.get("/urls/:shortURL", (req, res) => {
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL].longURL,
    user: users[req.cookies["userID"]]
  };
  res.render("urls_show", templateVars);
});

/*app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});*/

// generate new id and store registration infos 
app.post("/register", (req, res) => {
  const newUserID = generateRandomString();
  const email = req.body.email
  const password = req.body.password;
  const userObj = {
    id : newUserID,
    email : email,
    password : bcrypt.hashSync(password, 10)
  }; 
  console.log(users);

  const userEmail = findEmail(email, users);
  console.log(userEmail);
  if (userObj.email === "" || userObj.password === ""){
    res.send("400 error ! Bad request");
  } else if  (!userEmail) {
    console.log("hello");
    users[newUserID] = userObj;
    res.cookie("userID", newUserID);
    res.redirect("/urls");
  } else {
    res.send("400 error ! Bad request");
  }
});


//when we edit 
app.post("/urls/:id", (req, res) => {
  console.log(urlDatabase[req.params.id].userID)
  console.log(req.cookies["userID"]);
  if (urlDatabase[req.params.id].userID === req.cookies["userID"]){
   let longURL = req.body.longURL;
    urlDatabase[req.params.id].longURL = longURL;
    res.redirect('/urls');
  } else {
    res.status(403).send("Not permitted")
  }
 // res.redirect('/urls');
})

//generate random shurt url + add to database 
app.post("/urls", (req, res) => {
  const longURL = req.body.longURL;
  const userID = req.cookies["userID"];
  const shortURL = generateRandomString();
  urlDatabase[shortURL]= {longURL , userID};
  console.log(urlDatabase[shortURL]);
  res.redirect(`/urls/${shortURL}`);         
});

// delete url 
app.post("/urls/:shortURL/delete", (req, res) => {
  //if(urlDatabase[req.params.shortURL].userID === req.cookies["userID"]) {
  console.log("DELETE ROUTE HAS BEEN HIT");
  console.log(req.params.shortURL);
  delete urlDatabase[req.params.shortURL];
  res.redirect("/urls");
//}else {
 // res.status(403).send("Not permitted")
//}
})

//Authentification process
app.post("/login", (req, res) => {
  const email = req.body.email
  const password = req.body.password;
  const userEmail = findEmail(email, users);
  console.log(userEmail);
  const userPassword = findPassword(email,users);
  if (email === userEmail) {
    if (bcrypt.compareSync(password, userPassword)){
      console.log(userPassword)
      const userID = findUserID(email,users)
      res.cookie("userID", userID);
      res.redirect("/urls");
    } else {
    res.send("403 Forbidden");
    }
  } else {
    res.send("403 Forbidden");
  }
})

//logout
app.post("/logout", (req, res) => {
  res.clearCookie("userID");
  res.redirect("/urls");
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});