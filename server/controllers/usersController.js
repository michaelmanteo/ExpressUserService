module.exports = {

    get: async (req, res, next) => {
        return res.status(200).json( { user: "Here is some user."})
    }
}