const { userServices } = require("../services");
const { bcryptPassword, tokenGenerator } = require("../util");

module.exports = {
  register: async (req, res) => {
    const user = await userServices.findByUsername(req.body.username);
    if (user)
      return res.status(401).json({
        message: "existing username",
      });

    const pass = await bcryptPassword.hashPassword(req.body.password);

    const result = await userServices.create({
      username: req.body.username,
      password: pass,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    result.password = null;
    return res.json(result);
  },
  login: async (req, res) => {
    let user = await userServices.findByUsername(req.body.username);

    if (!user)
      return res.status(401).json({
        message: "invalid username or password",
      });

    const isCorrectPassword = await bcryptPassword.verifyPassword(
      req.body.password,
      user.password
    );

    if (!isCorrectPassword)
      return res.status(400).json({
        message: "invalid username or password",
      });

    const accessToken = tokenGenerator.accessTokenGenerator(user.uid);
    user.password = null;

    return res.json({
      account: user,
      token: {
        accessToken: accessToken,
        tokenType: "bearer",
        expiresIn: 3600,
      },
    });
  },
  delete: async (req, res) => {
    const countDelete = await userServices.delete(req.user);
    return res.json({
      deleted: countDelete,
    });
  },
  info: async (req, res) => {
    let userInfo = await userServices.findById(req.user);
    if (userInfo) {
      userInfo.password = null;
      return res.json(userInfo);
    }
    return res.status(404).json({ message: "NOT_FOUND" });
  },
};
