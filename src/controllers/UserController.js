import Address from "../models/Address";
import User from "../models/User";

class UserController {
  async store(req, res) {
    try {
      const { name, surname, tel, email, password } = req.body

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
