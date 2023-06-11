const { errorHandler } = require("../helpers/error_handler");
const Worker = require("../models/workers");

//addWorkers
const AddWorkers = async (req, res) => {
  try {
    const { first_name, last_name, age, department, subdepartment } = req.body;
    const newWorker = await Worker({
      first_name,
      last_name,
      age,
      department,
      subdepartment,
    });
    // await newWorker.validate();
    await newWorker.save();
    res.status(200).send({ message: "hodim qushildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};

//getuseers
const GetWorkers = async (req, res) => {
  try {
    const Workers = await Worker.find({})
      // .populate("department")
      .populate({
        path: "department",
        match: {
          name: "Dizayn",
        },
        // select: "name -_id",
        option: { limit: 2 },
      });
    if (!Workers) {
      return res.status(400).send({ message: "hodim topilmadi" });
    }
    res.json({ Workers });
  } catch (error) {
    errorHandler(res, error);
  }
};

//getWorkersById
const getWorkersById = async (req, res) => {
  const Worker = await Worker.findOne({ _id: req.params.id });
  if (!Worker) {
    return res.status(400).send({ message: "hodim topilmadi" });
  }
  res.json({ Worker });
  try {
  } catch (error) {
    errorHandler(res, error);
  }
};

const getWorkersByName = async (req, res) => {
  try {
    // const Worker = await Worker.findByName(req.params.name);
    const Worker = await Worker.find().byName(req.params.name);

    if (!Worker) {
      return res.status(400).send({ message: "hodim topilmadi" });
    }
    res.json({ Worker });
  } catch (error) {
    errorHandler(res, error);
  }
};
// UpdateWorkers
const UpdateWorkers = async (req, res) => {
  try {
    const { password, name, email } = req.body;
    const Worker = await Worker.updateOne(
      { _id: req.params.id },
      { name: name, email: email, password: password }
    );
    if (Worker.modifiedCount === 0) {
      res.status(404).json({ message: "Worker already updated" });
    } else {
      res.status(201).json({ message: "Worker updated successfully" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

// DeleteWorkers
const DeleteWorkerById = async (req, res) => {
  const Worker = await Worker.deleteOne({ _id: req.params.id });
  if (!Worker) {
    return res.status(400).send({ message: "Worker uchirilmadi" });
  }
  res.json({ Worker });
  try {
  } catch (error) {
    errorHandler(res, error);
  }
};

//LoginWorkers
const LoginWorkers = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Ma'lumotlarni tuliq kriting!" });
    }

    const existingWorker = await Worker.findOne({ email });
    if (existingWorker) {
      return res.status(200).send({ message: "successfully entered" });
    } else {
      return res.status(400).send({ message: "Worker topilmadi" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

// module.exports = LoginWorkers;

module.exports = {
  AddWorkers,
  GetWorkers,
  getWorkersById,
  getWorkersByName,
  UpdateWorkers,
  DeleteWorkerById,
  LoginWorkers,
};
