const { CodeModel } = require("../../models/code");
const { UserModel } = require("../../models/user");

module.exports = {
    baseUrl: "api",
    route: "setVerification",
    method: "post",
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    run: async (req, res) => {
        const { email, password, code } = req.body;
        if (!email || !password || !code) return res.status(400).send({ success: false, message: "Please fill in all fields." });

        const codeData = await CodeModel.findOne({ email });
        if (!codeData) return res.status(400).send({ success: false, message: "Please register first." });

        if (codeData.code === req.body.code) {
            await CodeModel.deleteOne({
                email: email
            });

            await UserModel.create({
                email,
                password
            });
            return res.status(200).send({ success: true });
        } else {
            return res.status(400).send({ success: false, message: "Invalid code." });
        };
    }
};