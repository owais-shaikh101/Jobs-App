const errorHandlingMiddleware = async (err, req, res, next) => {
  console.log(err);
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again" });
};

const notFoundError = (req, res) =>
  res.status(404).send("Route does not exist");

export { errorHandlingMiddleware, notFoundError };
