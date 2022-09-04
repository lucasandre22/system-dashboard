
module.exports = {
    async index(req, res) {
        const { usage } = req.query;
        //run bash command to get usage percentage
        return res.json(usage);
    }
};