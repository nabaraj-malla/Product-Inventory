export const setLastVisit = (req, res, next) => {
  // 1. if Cookie is set, then add a local variable with last visit time data that can be accessed in out ejs
  if (req.cookies.lastVisit) {
    res.locals.lastVisitDateAndTime = new Date(
      req.cookies.lastVisit
    ).toLocaleString();
  }
  res.cookie("lastVisit", new Date().toISOString(), {
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
  // console.log("set last visit middleware");
  next();
};
