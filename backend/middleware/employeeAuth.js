module.exports = (
  req,
  res,
  next
) => {

  if (!req.session.employee) {

    return res.status(401).json({
      success: false,
      message:
        "Employee login required"
    });

  }

  next();
};