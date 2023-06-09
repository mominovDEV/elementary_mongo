const { errorHandler } = require("../helpers/error_handler");
const User = require("../models/User");

//addusers
const AddUsers = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      age,
      jinsi,
      wife,
      isMarried,
      phone,
      salary,
    } = req.body;
    // if (!name || !email || !password) {
    //   return res.status(400).send({ message: "Ma'lumotlarni tuliq kriting!" });
    // }
    const user = await User.findOne({ email });

    // if (user) {
    //   return res.status(400).send({ message: "Bunday email mavjud" });
    // }
    const newUser = await User({
      name: name,
      email: email,
      password: password,
      age,
      jinsi,
      wife,
      isMarried,
      phone,
      salary,
    });
    // await newUser.validate();
    await newUser.save();
    res.status(200).send({ message: "foydaluvchi qushildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};

//getuseers
const GetUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(400).send({ message: "Foydalanuvchilar topilmadi" });
    }
    res.json({ users });
  } catch (error) {
    errorHandler(res, error);
  }
};

//getUsersById
const getUsersById = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return res.status(400).send({ message: "Foydalanuvchilar topilmadi" });
  }
  res.json({ user });
  try {
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUsersByName = async (req, res) => {
  try {
    // const user = await User.findByName(req.params.name);
    const user = await User.find().byName(req.params.name);

    if (!user) {
      return res.status(400).send({ message: "Foydalanuvchilar topilmadi" });
    }
    res.json({ user });
  } catch (error) {
    errorHandler(res, error);
  }
};
// UpdateUsers
const UpdateUsers = async (req, res) => {
  try {
    const { password, name, email } = req.body;
    const user = await User.updateOne(
      { _id: req.params.id },
      { name: name, email: email, password: password }
    );
    if (user.modifiedCount === 0) {
      res.status(404).json({ message: "User already updated" });
    } else {
      res.status(201).json({ message: "User updated successfully" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

// DeleteUsers
const DeleteUserById = async (req, res) => {
  const user = await User.deleteOne({ _id: req.params.id });
  if (!user) {
    return res.status(400).send({ message: "User uchirilmadi" });
  }
  res.json({ user });
  try {
  } catch (error) {
    errorHandler(res, error);
  }
};

//LoginUsers
const LoginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Ma'lumotlarni tuliq kriting!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send({ message: "successfully entered" });
    } else {
      return res.status(400).send({ message: "User topilmadi" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

// module.exports = LoginUsers;

module.exports = {
  AddUsers,
  GetUsers,
  getUsersById,
  getUsersByName,
  UpdateUsers,
  DeleteUserById,
  LoginUsers,
};
