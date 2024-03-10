const uri = require("express").Router();
const bcrypt = require("bcrypt");
const Account = require("../Model/AccountModel.js");

const HashPassword = async (Password) => {
  const Hash = await bcrypt.hash(Password, 10);
  return Hash;
};

const ComparePassword = async (Password, PasswordHash) => {
  const isMath = await bcrypt.compare(Password, PasswordHash);
  return isMath;
};

uri.post("/SignUp", async (req, res) => {
  const NewAccount = new Account({
    Name: req.body.Name,
    Email: req.body.Email,
    Password: await HashPassword(req.body.Password),
  });
  res.send(NewAccount);
  await NewAccount.save();
});

uri.post("/SignIn", async (req, res) => {
  const User = await Account.findOne({ Email:  req.body.Email});
  if (!User) {
    return res.json({ Status: "Wrong Email" });
  } else {
    const isPasswordValid = await ComparePassword( req.body.Password, User.Password);
    if (isPasswordValid) {
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Status: "Wrong Password" });
    }
  }
});

module.exports = uri;