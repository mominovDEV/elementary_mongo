const { Router } = require("express");
const {
  GetDepartments,
  getDepartmentsById,
  AddDepartments,
} = require("../controllers/department.controller");

const router = Router();

router.get("/", GetDepartments);
router.get("/:id", getDepartmentsById);
router.post("/", AddDepartments);

module.exports = router;
