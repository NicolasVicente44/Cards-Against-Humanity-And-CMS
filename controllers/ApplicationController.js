import Application from "../models/Application";
import jwt from "jsonwebtoken";
import passport from "passport";

export const index = async (req, res, next) => {
  try {
    const applications = await Application.find();

    res.render("applications/index", {
      applications,
      title: "Application List",
    });
  } catch (error) {
    next(error);
  }
};

export const show = async (req, res, next) => {
  try {
    const application = await findAndVerifyApplication();

    res.render("applications/show", {
      application,
      title: "Application View",
    });
  } catch (error) {
    next(error);
  }
};

export const add = async (req, res, next) => {
  try {
    res.render("applications/add", {
      formType: "create",
      title: "New Application",
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    const application = await findAndVerifyApplication();

    res.render("applications/edit", {
      application,
      formType: "update",
      title: "Edit Application",
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const application = new Application({ name });
    await application.save();

    req.session.notifications = [
      {
        alertType: "alert-success",
        message: "Application created successfully",
      },
    ];
    res.redirect("/applications");
  } catch (error) {
    req.session.notifications = [
      { alertType: "alert-danger", message: "Application failed to create" },
    ];

    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { name } = req.body;
    const application = await findAndVerifyApplication(req);

    application.name = name;
    await application.save();

    req.session.notifications = [
      {
        alertType: "alert-success",
        message: "Application was updated successfully",
      },
    ];
  } catch (error) {
    req.session.notifications = [
      {
        alertType: "alert-danger",
        message: "Application failed to update",
      },
    ];
    next(error);
  }
};
export const remove = async (req, res, next) => {
  try {
    const application = await findAndVerifyApplication(req);

    await Application.findByIdAndDelete(application.id);

    req.session.notifications = [
      {
        alertType: "alert-success",
        message: "Application deleted successfully",
      },
    ];

    res.redirect("/applications");
  } catch (error) {
    req.session.notifications = [
      {
        alertType: "alert-danger",
        message: "Application failed to delete",
      },
    ];
    next(error);
  }
};

//helper function to find user
async function findAndVerifyApplication(req) {
  const applicaiton = await Application.findById(req.params.id);

  if (!applicaiton) {
    req.status = 404;

    throw new Error("Application does not exist");
  }
}
