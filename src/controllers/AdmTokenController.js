import jwt from "jsonwebtoken";

import AdministrativeUser from "../models/AdministrativeUser";

class AdmTokenController {
  async store(req, res) {
    try {
      const { username = "", password = "" } = req.body;

      if (!username || !password) {
        return res.status(401).json({
          errors: ["Invalid credentials"],
        });
      }

      const admUser = await AdministrativeUser.findOne({ where: { username } });

      if (!admUser) {
        return res.status(401).json({
          errors: ["Administrative user not found"],
        });
      }

      if (!(await admUser.passwordIsValid(password))) {
        return res.status(401).json({ errors: ["Invalid password"] });
      }

      const { id } = admUser;

      const token = jwt.sign({ id, username }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.json({ token });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
}
export default new AdmTokenController();
