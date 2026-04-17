
const bcrypt = require("bcryptjs");
const userRepo = require("../repositories/user.repository");
const {generateToken} = require("../utils/jwt");

exports.login = async ({ email, password }) => {
    const user = await userRepo.findByEmail(email);
  
    if (!user) throw new Error("User not found");
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) throw new Error("Invalid credentials");
  
    const token = generateToken(user._id);
  
    return { token };
  };