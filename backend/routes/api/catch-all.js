export default (req, res) =>
  res.status(404).json({ error: { code: 404, message: "This is catch all endpoint!: Route not found!" } });
