export default async (req, res) => {
  const { default: app } = await import('../backend/app.js');
  app(req, res);
};