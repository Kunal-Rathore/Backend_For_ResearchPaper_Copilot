
const tempModel = require("../models/tempModel");
const bcrypt = require("bcrypt");


async function storeInTemp(data, signUpToken, otp) {

    const { email, username, password } = data;
    const hashedPass = await bcrypt.hash(password, 10);
    // console.log(`${signUpToken}, ${email}, ${username}, ${hashedPass}, ${otp}`);

    const result = await tempModel.create({
        signUpToken, email, username, password: hashedPass, otp
    });
    return result;
}

async function findinTemp(signUpToken, otp) {

    const result = await tempModel.findOne({ signUpToken, otp });
    if (!result) { throw new Error("Data not found might invalid signUptoken or data expires"); }
    else { return result; }

}


module.exports = { storeInTemp, findinTemp }