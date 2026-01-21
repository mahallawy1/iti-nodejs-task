const signinschema = require('./signin');
const signupschema = require('./signup');

module.exports = {
   
    signupschema: require('./signup'),
    signinschema: require('./signin'),
     getAllUsersSchema: require('./getAllUsersSchema'),
    updateUserSchema: require('./updateUser')
};