const { UserModel } = require("../../models/user");

module.exports = {
    baseUrl: "api",
    route: "checkLogin",
    method: "post",
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    run: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send({ success: false, message: "Please fill in all fields." });

        const userData = await UserModel.findOne({ email, password });
        if (!userData) return res.status(400).send({ success: false, message: "Invalid email or password." });

        return res.status(200).send({ success: true, message: "Login successful." });
    }
};