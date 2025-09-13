
// db functions
const userService = require("../services/userService");
const tempService = require("../services/tempServices");

//utils
const otpAndTokenGenerator = require("../utils/otpAndTokenGenerator");
const sendOtp = require("../utils/otpMailer");

//register
const signup = async (req, res) => {

    try {
        const signUpToken = otpAndTokenGenerator.generateSignUpToken();

        const otp = otpAndTokenGenerator.generateOtp();

        await tempService.storeInTemp(req.body, signUpToken, otp)  // later change with cache

        await sendOtp(req.body.email, otp);

        res.json({ message: "OTP sent", redirectUrl: `${process.env.BACKEND_BASE_Url}/auth/email-register/otp-verification?token=${signUpToken}` })

    } catch (error) {
        console.log("error in register controller- " + error);
        res.json({ result: error.message });
    }

}

//checkEmail

const checkEmail = async (req, res) => {
    try {
        const result = await userService.findEmail(req.body);
        if (!result) {
            return res.status(200).send("email not exists");// need to remove send with true false 
        }
        return res.status(400).send("email exists exists");// need to remove send with true false 

    } catch (err) {

    }
}

// register

const register = async (req, res) => {

    try {
        await userService.storeUserByEmail(req.data); // if any db error catch will execute, "like userAlready Exists"
        res.json({ message: "Sign-up Successfull" }); // frontend need to redirect to /signin
    }
    catch (error) {
        console.log("error in register called- " + error);
        res.json({ error: error.message })
        // next(e await UsersModerror); // express own middleware
    }


}

module.exports = { signup, checkEmail, register }