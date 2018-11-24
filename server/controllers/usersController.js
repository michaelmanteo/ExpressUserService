const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/index');

function signToken (_id) {
    return token = jwt.sign({
        iss: 'api-auth',
        sub: _id,
        iat: new Date().getTime(),
        exp: Math.floor( Date.now() / 1000) + (60*60*12 )
    }, secret);
}

module.exports = {

    get: async (req, res, next) => {
        const User = await User.findById( { _id: req.params.id} );

        if (!User) return res.status(400).json( { message: "User not found."} ); 

        return res.status(200).json({ user: "Here is some user."});
    },

    register: async (req, res, next) => {

        const email = req.body.email;
        const password = req.body.password;

        // Does the user already exist?
        const userExists = await User.findOne({ email });

        // Return if the user already exists
        if (userExists) return res.status(403).json({ error: "Email is already in use."}); 

        // Create new user
        const newUser = new User({ email, password });
        await newUser.save();

        // Sign a new token
        const token = signToken(newUser._id)

        // Sucessfully registered user - return token
        return res.status(200).json({ token });
    },

    login: async (req, res, next) => {

        // Passport-local authentication successful, user attached to req.user
        const user = req.user;
        const token = signToken(user._id);

        // Successfully logged in
        return res.status(200).json( { token, user: {  email: user.email  } });
    }
}