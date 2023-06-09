const { Router } = require("express");

const userRouter = require("./user.routes");
const postRouter = require("./post.routes");

const router = Router();

router.use("/api/user", userRouter);
router.use("/api/post", postRouter);

module.exports = router;
