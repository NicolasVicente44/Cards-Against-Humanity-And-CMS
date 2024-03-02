// controllers.js
export const home = (req, res) => {
  res.render("pages/home", {
    title: "Home",
    loading: req.loading,
  });
};

export const about = (req, res) => {
  res.render("pages/about", {
    title: "About",
    loading: req.loading,
  });
};

export const contact = (req, res) => {
  res.render("pages/contact", {
    title: "Contact",
    loading: req.loading,
  });
};
