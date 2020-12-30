import express from "express";
import { getPost } from "../controllers/postController.js";
import User from "../models/userModel.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  const payload = {
    pageTitle: req.session.user.username,
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
    profileUser: req.session.user,
  };

  res.status(200).render("profilePage", payload);
});

router.get("/:username", async (req, res, next) => {
  const payload = await getPayload(req.params.username, req.session.user);
  res.status(200).render("profilePage", payload);
});

async function getPayload(username, userLoggedIn) {
  let user = await User.findOne({ username });

  if (user == null) {
    user = await User.findById(username);

    if (user == null) {
      return {
        pageTitle: "User not found",
        userLoggedIn,
        userLoggedInJs: JSON.stringify(userLoggedIn),
      };
    }
  }

  return {
    pageTitle: user.username,
    userLoggedIn,
    userLoggedInJs: JSON.stringify(userLoggedIn),
    profileUser: user,
  };
}

export default router;