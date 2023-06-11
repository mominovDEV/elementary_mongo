const { Router } = require("express");

const departmentRouter = require("./department.routes");
const workerRouter = require("./worker.routes");

const router = Router();

router.use("/api/department", departmentRouter);
router.use("/api/worker", workerRouter);

module.exports = router;
