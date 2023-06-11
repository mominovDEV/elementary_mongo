const { Router } = require("express");
const {
  GetWorkers,
  getWorkersById,
  AddWorkers,
} = require("../controllers/worker.controller");

const router = Router();

router.get("/", GetWorkers);
router.get("/:id", getWorkersById);
router.post("/", AddWorkers);

module.exports = router;
