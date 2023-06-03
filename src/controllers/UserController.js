import Address from "../models/Address";
import User from "../models/User";

import validator from "validator";

import { regExpIsValidText } from '../utils/regExp'

class UserController {
  async store(req, res) {
    try {
      const { name, surname, tel, email, password } = req.body

      const isValidName = regExpIsValidText(name)
      const isValidSurname = regExpIsValidText(surname)

      if (!name || !surname || !tel || !email || !password) {
        return res.status(400).json({
          errors: ['Missing data']
        })
      }


      if (!isValidName) {
        return res.status(400).json({
          errors: ['Provide a valid name']
        })
      }

      if (!isValidSurname) {
        return res.status(400).json({
          errors: ['Provide a valid surname']
        })
      }

      if (!validator.isEmail(email)) {
        return res.status(400).json({
          errors: ['Provide a valid email']
        })
      }

      if (!validator.isMobilePhone(tel)) {
        return res.status(400).json({
          errors: ['Provide a valid number']
        })
      }

      const user = await User.create({
        name, surname, tel, email, password
      })

      return res.status(200).json({
        email,
        name,
        surname,
      });

    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      if (!req.user_id) {
        return res.status(400).json({ errors: ["login required"] });
      }

      const user = await User.findByPk(req.user_id);

      if (!user) {
        return res.status(401).json({ error: ["User not found"] });
      }

      const { email, name, surname, tel } = req.body;

      if (!name && !surname && !tel && !email) {
        return res.status(400).json({
          errors: ['Missing data']
        })
      }

      if (email) {
        if (!validator.isEmail(email)) {
          return res.status(400).json({
            errors: ['Provide a valid email']
          })
        }
      }

      if (name) {
        const isValidName = regExpIsValidText(name)
        if (!isValidName) {
          return res.status(400).json({
            errors: ['Provide a valid name']
          })
        }
      }

      if (surname) {
        const isValidSurname = regExpIsValidText(surname)
        if (!isValidSurname) {
          return res.status(400).json({
            errors: ['Provide a valid surname']
          })
        }
      }

      if (tel) {
        if (!validator.isMobilePhone(tel)) {
          return res.status(400).json({
            errors: ['Provide a valid tel']
          })
        }
      }

      await user.update({ name, email, surname, tel });

      return res.status(200).json({
        email,
        name,
        surname,
        tel,
      });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async show(req, res) {
    try {
      if (!req.user_id) {
        return res.status(400).json({ errors: ["login required"] });
      }

      const user = await User.findByPk(req.user_id, {
        attributes: ["name", "email", "surname", "tel"],
        include: {
          model: Address,
        },
      });

      if (!user) {
        return res.status(400).json({ error: ["User not found"] });
      }

      return res.status(200).json(user);
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      if (!req.user_id) {
        return res.status(401).json({ errors: ["login required"] });
      }
      const user = await User.findByPk(req.user_id);

      if (!user) {
        return res.status(400).json({ errors: ["User not found"] });
      }

      await user.destroy()

      return res.status(200).json({
        errors: ['User deleted']
      });

    } catch (e) {
      res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
}
export default new UserController();
