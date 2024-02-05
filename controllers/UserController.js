//import { error } from "console";
import User from "../models/User";
import fs, { copyFileSync } from "fs";

//helper function to find and verify user
async function findAndVerifyUser(req) {
  const user = await User.findById(req.params.id);

  if (!user) {
    req.status = 404;
    throw new Error("User does not exist");
  }

  return user;
}

// Helper function to extract and filter specific parameters from the request body.
// If a file is attached to the request, it assigns it to the 'avatar' property.
function getStrongParams(req) {
  // Check if a file is attached to the request
  if (req.file) {
    // If a file exists, assign it to the 'avatar' property in the request body
    req.body.avatar = req.file;
  }

  // Destructure specific properties from the request body
  const { id, firstName, lastName, nickname, email, avatar, password } =
    req.body;

  // Return an object containing the extracted properties
  return { id, firstName, lastName, nickname, email, avatar, password };
}

export const index = async (req, res, next) => {
  try {
    const users = await User.find();

    res.render("users/index", {
      title: "List of Users",
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const show = async (req, res, next) => {
  try {
    const user = await findAndVerifyUser(req);

    res.render("users/show", {
      user,
      title: "User View",
    });
  } catch (error) {
    next(error);
  }
};

export const add = async (req, res, next) => {
  try {
    res.render("users/add", {
      formType: "create",
      title: "New User",
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    const user = await findAndVerifyUser(req);

    res.render("users/edit", {
      user,
      formType: "update",
      title: "Edit User",
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const { firstName, lastName, nickname, email, password, avatar } =
      getStrongParams(req);
    const user = new User({
      firstName,
      lastName,
      nickname,
      email,
    });

    const validationErrors = user.validateSync();

    if (validationErrors) {
      if (avatar && fs.existsSync(avatar.path)) {
        fs.unlinkSync(avatar.path);
      }

      const message = Object.values(validationErrors.errors).map(
        (error) => error.message
      );

      res.status(400);

      throw new Error(message.join("\n"));
    }

    if (avatar && fs.existsSync(avatar.path)) {
      copyFileSync(avatar.path, `avatars/${avatar.filename}`);
      fs.unlinkSync(avatar.path);
      user.avatar = avatar.filename;
    }

    await User.register(user, password);

    res.redirect("/users");
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { firstName, lastName, nickname, email, password, avatar } =
      getStrongParams(req);
    const user = await findAndVerifyUser(req);

    user.firstName = firstName;
    user.lastName = lastName;
    user.nickname = nickname;
    user.email = email;

    const validationErrors = user.validateSync();

    if (validationErrors) {
      if (avatar && fs.existsSync(avatar.path)) {
        fs.unlinkSync(avatar.path);
      }

      const message = Object.values(validationErrors.errors).map(
        (error) => error.message
      );

      res.status(400);

      throw new Error(message.join("\n"));
    }

    if (avatar && fs.existsSync(avatar.path)) {
      copyFileSync(avatar.path, `avatars/${avatar.filename}`);
      fs.unlinkSync(avatar.path);
      fs.unlinkSync(`avatars/${user.avatar}`);
      user.avatar = avatar.filename;
    }

    if (password) {
      await user.setPassword(password);
    }

    user.save();

    res.redirect("/users");
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const user = await findAndVerifyUser(req);

    const filepath = `avatars/${user.avatar}`;

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await User.findByIdAndDelete(req.params.id);

    res.redirect("/users");
  } catch (error) {
    next(error);
  }
};
