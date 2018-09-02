const asyncRoute = route => (req, res, next) => {
  Promise.resolve(route(req, res)).catch(next);
};

export { asyncRoute };
