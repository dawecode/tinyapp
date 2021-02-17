
//find email of user 
const findEmail = (email, users) => {
  for (let key in users) {
    if (email === users[key].email) {
      return email;
    }
  }
  return undefined;
};








const validateUser = (email, password, userDB) => {
  // for (const userObj of userDB) {
  //   if (userObj.email === email) {

  //   }
  // }

  // userDB.filter(userObj => userObj.email === email)
  const currentUser = userDB.find(userObj => userObj.email === email)


  // const currentUser = userDB[email]
  if (currentUser) {
    if (currentUser.password === password) {
      // successful login
      return { user: currentUser, error: null }
    } else {
      // failed at password
      return { user: null, error: "password" }
    }
  } else {
    // failed at email
    return { user: null, error: "email" }
  }
}

module.exports = { validateUser, findEmail }