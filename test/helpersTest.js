const { assert } = require('chai');

const { findEmail } = require('../userFunctions.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

describe('findEmail', function() {
  it('should return an email if it exist in the database', function() {
    const user = findEmail("user@example.com", users)
    const expectedOutput = "user@example.com";
    assert.equal(user,expectedOutput)
  });
});