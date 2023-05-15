const whitelist = ['http://localhost:3000',"https://vendor-front-kappa.vercel.app/"];
export default  function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true,
      credentials: true,
      methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
    };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};