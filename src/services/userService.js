//lib
const bcrypt = require("bcrypt");

//files
const usersModel = require("../models/UserModel");

//function using in both time while signup and during checking email
async function isUserFoundFunction(email) {

    try {
        return await usersModel.findOne({
            email: email
        });
    } catch (err) {
        return err.message;
    }
}

// storeUser
async function storeUserByEmail(data) {
    const { username, password, email } = data;

    await usersModel.create({
        username: username,
        password: password,
        email: email,
        authBy: "email",
    });
}

// checkUser exists for login
async function isUserExists(data) {
    const { email, password } = data;
    const isUserFound = await isUserFoundFunction(email);

    if (isUserFound) {
        const checkPassword = await bcrypt.compare(password, isUserFound.password);
        if (!checkPassword) {
            const error = new Error("Password Invalid");
            error.type = "Password";
            throw error;
        }
        else {
            return isUserFound.id; // if user exists sends the _id as string for jwt token
        }
    }
    else {
        const error = new Error("User not found");
        error.type = "Email";
        throw error;
    }
}


async function findEmail(data) {
    const email = data.email;
    const result = await isUserFoundFunction(email);
    return result;
}

module.exports = { storeUserByEmail, isUserExists, findEmail };