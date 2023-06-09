const { Router } = require("express");
const { AddPost, GetPost } = require("../controllers/post.controller");

const router = Router();

router.post("/", AddPost);
router.get("/", GetPost);

module.exports = router;
