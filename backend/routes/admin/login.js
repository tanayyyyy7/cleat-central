export default (req, res) => {
  const { email, password } = req.body;
  if (email === "tanay1@gmail.com" && password === "donuts") {
    req.session.user = "Homer Simpson";
    return res.redirect("/admin/dashboard");
  } else {
    return res.redirect("/admin/login");
  }
};