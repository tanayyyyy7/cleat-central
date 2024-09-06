const protectApi = async (req, res, next) => {
  try {
    let authorization = req.header("Authorization");
    if (authorization) {
      const token = authorization.split[" "][1]; //Bearer actual-token
      await verifyToken(token);
      return next();
    }
    res.status(403).json({ message: "Unauthorized access" });
  } catch (err) {
    res.status(403).json({ message: "Unauthorized access" });
  }
}

export default protectApi;
