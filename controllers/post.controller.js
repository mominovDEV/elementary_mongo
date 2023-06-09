const { default: mongoose } = require("mongoose");
const { errorHandler } = require("../helpers/error_handler");
const AddPost = async (req, res) => {
  try {
    const { title, post_text, author } = req.body;
    if (!title || !post_text || !author) {
      return res.status(400).send({ message: "Ma'lumotlarni tuliq kriting!" });
    }
    res.status(200).send({ message: "Post qushildi" });
    const newUser = await Post({
      title,
      post_text,
      author,
    });
    await newUser.save();
  } catch (error) {
    errorHandler(res, error);
  }
};

const GetPost = async (req, res) => {
  try {
    const post = await User.find({});

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "Incorrect ID" });
    }

    const { author } = req.body;
    if (!author) {
      return res.status(400).send({ message: "Author is required" });
    }

    res.json({ post });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = { AddPost, GetPost };
