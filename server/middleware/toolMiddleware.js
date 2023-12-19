const toolMiddleware = {

  addTime: (req, res, next) => {
    res.locals.time = Date.now();
    return next();
  },

  getContainers:  (req, res, next) => {
    res.locals.containersData = containersParser(res.locals.podsData);
    return next();
  },

}

export default toolMiddleware;