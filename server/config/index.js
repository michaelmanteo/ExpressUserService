const API_URL = process.env.NODE_ENV==='development' ? "http://localhost:3000" : "Live URL goes here";

module.exports = {
    API_URL,
    database: 'mongodb://localhost:27017/ExpressUserService',
    secret: "thisisasupersecretstring"
}