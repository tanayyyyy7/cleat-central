export default (req, res) =>
  res.status(404).json({ error: { code: 404, message: "Route not found!" } });
