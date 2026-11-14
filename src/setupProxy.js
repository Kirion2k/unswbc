const { handler } = require('../netlify/functions/instagram-feed');

// CRA does not run Netlify Functions; serve the same feed handler locally.
module.exports = function (app) {
  app.get('/.netlify/functions/instagram-feed', async (req, res, next) => {
    try {
      const result = await handler();
      res.status(result.statusCode).set(result.headers).send(result.body);
    } catch (error) {
      next(error);
    }
  });
};
