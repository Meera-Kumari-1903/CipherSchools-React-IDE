const userService = require('../services/user-service');
const User = require("../models/users");

const inputValidationException = require('../exception/inputValidationException');


const addNewUser = async (req, res) => {
    try {
        const {firstName, lastName, email, password, type} = req.body;
        let user = {
            firstName,
            lastName,               
            email,
            password,
            lastLoggedIn: Date.now(),
        };
        user = await userService.addNewUser(user);
        return res.status(200).send(user);
    } catch (error) {
        console.error(error);
        return res.
        status(error instanceof inputValidationException ? 400 : 500)
        .send({message: error.message});
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const data = await userService.loginUser(email, password);
        return res.status(200).send(data);
    } catch (error) {
        console.error(error);
        return res.
        status( 500)
        .send({message: error.message});
    }
};

const logoutUser = async (req, res) => {
    try{
    const {token} = req;
    let user = await User.findOne({_id: req.user._id});
    user.token = user.token.filter((t) => t.token !== token);
    await user.save();  
    return res.status(200).send();
    }catch (error) {
        console.error(error);
        return res.
        status( 500)
        .send({message: error.message});
    }
}

const updateTheme = async (req, res) => {
  try {
    const { theme } = req.body;

    if (!["light", "dark"].includes(theme)) {
      return res.status(400).send({ message: "Invalid theme value" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.settings.theme = theme;
    await user.save();

    return res.status(200).send({
      message: "Theme updated successfully",
      theme: user.settings.theme,
    });
  } catch (error) {
    console.error("Error updating theme:", error);
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
    addNewUser, loginUser, logoutUser, updateTheme
}