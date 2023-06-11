const { errorHandler } = require("../helpers/error_handler");
const Department = require("../models/department");

//addDepartments
const AddDepartments = async (req, res) => {
  try {
    const { name, info } = req.body;
    const newDepartment = await Department({
      name,
      info,
    });
    // await newDepartment.validate();
    await newDepartment.save();
    res.status(200).send({ message: "Bulim qushildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};

//getuseers
const GetDepartments = async (req, res) => {
  try {
    const Departments = await Department.find({});
    if (!Departments) {
      return res.status(400).send({ message: "Foydalanuvchilar topilmadi" });
    }
    res.json({ Departments });
  } catch (error) {
    errorHandler(res, error);
  }
};

//getDepartmentsById
const getDepartmentsById = async (req, res) => {
  const Department = await Department.findOne({ _id: req.params.id });
  if (!Department) {
    return res.status(400).send({ message: "Foydalanuvchilar topilmadi" });
  }
  res.json({ Department });
  try {
  } catch (error) {
    errorHandler(res, error);
  }
};

const getDepartmentsByName = async (req, res) => {
  try {
    // const Department = await Department.findByName(req.params.name);
    const Department = await Department.find().byName(req.params.name);

    if (!Department) {
      return res.status(400).send({ message: "Foydalanuvchilar topilmadi" });
    }
    res.json({ Department });
  } catch (error) {
    errorHandler(res, error);
  }
};
// UpdateDepartments
const UpdateDepartments = async (req, res) => {
  try {
    const { password, name, email } = req.body;
    const Department = await Department.updateOne(
      { _id: req.params.id },
      { name: name, email: email, password: password }
    );
    if (Department.modifiedCount === 0) {
      res.status(404).json({ message: "Department already updated" });
    } else {
      res.status(201).json({ message: "Department updated successfully" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

// DeleteDepartments
const DeleteDepartmentById = async (req, res) => {
  const Department = await Department.deleteOne({ _id: req.params.id });
  if (!Department) {
    return res.status(400).send({ message: "Department uchirilmadi" });
  }
  res.json({ Department });
  try {
  } catch (error) {
    errorHandler(res, error);
  }
};

//LoginDepartments
const LoginDepartments = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Ma'lumotlarni tuliq kriting!" });
    }

    const existingDepartment = await Department.findOne({ email });
    if (existingDepartment) {
      return res.status(200).send({ message: "successfully entered" });
    } else {
      return res.status(400).send({ message: "Department topilmadi" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

// module.exports = LoginDepartments;

module.exports = {
  AddDepartments,
  GetDepartments,
  getDepartmentsById,
  getDepartmentsByName,
  UpdateDepartments,
  DeleteDepartmentById,
  LoginDepartments,
};
