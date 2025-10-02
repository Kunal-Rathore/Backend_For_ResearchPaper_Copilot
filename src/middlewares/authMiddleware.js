//db functions
const OTPServices = require("../services/OTPServices");

// utils
const { decodeToken } = require("../utils/jwt");
const { validateWithZod, handleZod } = require("../utils/validator");

// zodSchema
const signSchema = require("../validators/authValidation");


// token validation 
function tokenValidation(req, res, next) {  //need to use this middlware for every req after the user login

    const token = req.cookies.token; //will change for the cookie later
    if (!token) {
        res.json({ message: "No user-token exists" });
    }
    else {
        // decode token and check is tokenValid
        try {
            const decodedToken = decodeToken(token);
            req.userId = decodedToken.userId;
            next();
        } catch (error) {
            console.log("error in isTokenExistsAndValid- " + error);
            return res.json({ error: error });
        }
    }
}

function zodSign(req, res, next) {

    const result = validateWithZod(signSchema, req.body);
    return handleZod(res, result, next);
}

async function checkOTP(req, res, next) {

    const otp = req.body.otp;
    if (!otp) {
        res.json({ message: "Empty OTP" });
    }
    const signUpToken = req.query.token;
    // get otp and token from the url and find the user in temp db
    const result = await OTPServices.findinOTPModel(signUpToken, otp); // if otp is wrong throw error which will be caught by global error middleware
    req.data = result;
    next();
}

module.exports = { tokenValidation, zodSign, checkOTP };