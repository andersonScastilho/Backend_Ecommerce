import AdministrativeUser from "../models/AdministrativeUser";
import Role from "../models/Role";

class AdministrativeUserController {
  async store(req, res) {
    try {
      const { role_id, username, email, fullname, password } = req.body;

      if (!role_id) {
        return res.status(400).json({ error: ["Role is required"] });
      }

      const role = await Role.findByPk(role_id, {
        attributes: ["role"],
      });

      if (!role) {
        return res.status(404).json({
          errors: ['Role not found']
        })
      }

      const verifyEmail = await AdministrativeUser.findOne({
        where: {
          email,
        },
      });

      if (verifyEmail) {
        return res.status(400).json({ erros: ["E-mail in use"] });
      }

      const verifyUsername = await AdministrativeUser.findOne({
        where: {
          username,
        },
      });

      if (verifyUsername) {
        return res.status(400).json({ erros: ["Username in use"] });
      }

      const admUser = await AdministrativeUser.create({
        fullname,
        role_id,
        email,
        username,
        password
      },);

      return res.status(200).json({
        username,
        fullname,
        email,
        role
      });

    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
  async show(req, res) {
    try {
      const id = req.admUser_id;

      const admUser = await AdministrativeUser.findByPk(id, {
        attributes: ["username", "fullname", "email"],
        include: {
          attributes: ["role"],
          model: Role,
        },
      });

      if (!admUser) {
        return res.status(404).json({
          errors: ["Administrativer user not found"],
        });
      }

      return res.status(200).json(admUser);
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
}
export default new AdministrativeUserController();
