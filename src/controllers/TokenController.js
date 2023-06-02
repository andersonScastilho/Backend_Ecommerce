import jwt from "jsonwebtoken";

import User from "../models/User";

import validator from "validator";
class TokenControlle {
  async store(req, res) {
    try {
      const { email = "", password = "" } = req.body;
      if (!email || !password) {
        return res.status(401).json({
          errors: ["Missing data"],
        });
      }

      if (!validator.isEmail(email)) {
        return res.status(400).json({
          errors: ['Provide a valid email']
        })
      }


      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({
          errors: ["User not found"],
        });
      }

      if (!(await user.passwordIsValid(password))) {
        return res.status(401).json({ errors: ["Invalid password"] });
      }

      const { id } = user;

      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
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

export default new TokenControlle();
