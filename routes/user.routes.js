const { Router } = require("express");
const {
  AddUsers,
  GetUsers,
  getUsersById,
  UpdateUsers,
  LoginUsers,
  DeleteUserById,
  getUsersByName,
} = require("../controllers/user.controller");

const router = Router();

router.post("/", AddUsers);
router.get("/", GetUsers);
router.get("/:id", getUsersById);
router.get("/name/:name", getUsersByName);
router.put("/:id", UpdateUsers);
router.delete("/:id", DeleteUserById);
router.post("/login", LoginUsers);

module.exports = router;
