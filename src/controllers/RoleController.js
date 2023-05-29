import Role from "../models/Role";

class RoleController {
  async store(req, res) {
    try {
      const role = await Role.create(req.body);

      return res.status(200).json(role);
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
}
export default new RoleController();
