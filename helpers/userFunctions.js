// how we generate random strings
const generateRandomString = () => {
  const alphaNumerical = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 7; i++) {
    result += alphaNumerical.charAt(Math.floor(Math.random() * alphaNumerical.length));
  }
  return result;
};



//check to see if email exist
const findEmail = (email, users) => {
  for (let key in users) {
    if (email === users[key].email) {
      return email;
    }
  }
  return undefined;
};

//check to see if password exist
const findPassword = (email, users) => {
  for (let key in users) {
    if (email === users[key].email) {
      return users[key].password;
    }
  }
  return undefined;
};

// find the id by email
const findUserID = (email, users) => {
  for (let key in users) {
    if (email === users[key].email) {
      return users[key].id;
    }
  }
  return undefined;
};

/*const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "aJ54lW" }
};*/

// returns URL matched with ID
const urlsForUser = (id, db) => {
 const userURLs = {};
  for (let url in db) {
    if (id === db[url].userID) {
     userURLs[url] = db[url];
    }
  }
  return userURLs;
};
//urlsForUser("aJ48lW",urlDatabase)
//console.log(urlsForUser("aJ48lW",urlDatabase))


module.exports = { generateRandomString,findEmail, findPassword, findUserID, urlsForUser };