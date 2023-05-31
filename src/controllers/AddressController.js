import Address from "../models/Address";
import User from "../models/User";

class AddressController {
  async store(req, res) {
    try {
      if (!req.user_id) {
        return res.status(400).json({ errors: ["login required"] });
      }
      const user_id = req.user_id;

      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(401).json({ errors: ["User not found"] });
      }

      const {
        country,
        state,
        city,
        neighborhood,
        street,
        address_number,
        complement,
        cep,
      } = req.body;

      await Address.create({
        country,
        state,
        city,
        neighborhood,
        street,
        address_number,
        complement,
        cep,
        user_id,
      });

      return res.status(200).json({
        country,
        state,
        city,
        neighborhood,
        street,
        address_number,
        complement,
        cep,
      });

    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
  async show(req, res) {
    try {

      const address_id = +req.params.address_id;

      const address = await Address.findByPk(address_id, {
        attributes: ['country', 'state', 'city', 'neighborhood', 'street', 'address_number', 'cep', 'complement', 'user_id'],
        include: {
          attributes: ["name", "email", "surname", "tel"],
          model: User,
        },
      });


      if (!address) {
        return res.status(404).json({
          errors: ['Address not found']
        })
      }

      if (address.user_id !== +req.user_id) {
        return res.status(401).json({
          errors: ['This address does not belong to you']
        })
      }


      return res.status(200).json({ address });
    } catch (e) {
      console.log(e)
    }
  }
  async update(req, res) {
    try {
      const id = +req.params.address_id;

      const {
        country,
        state,
        city,
        neighborhood,
        street,
        address_number,
        complement,
        cep,
      } = req.body;

      if (!state && !country &&
        !city && !neighborhood &&
        !street && !address_number &&
        !cep && !complement) {
        return res.status(400).json({
          errors: ['Missing data']
        })
      }

      if (!id) {
        return res.status(400).json({
          errors: ["Inform the address"],
        });
      }

      const address = await Address.findByPk(id);

      if (!address) {
        return res.status(404).json({ errors: ["Address not found"] });
      }

      if (address.user_id !== req.user_id) {
        return res.status(401).json({
          erros: ['This address does not belong to you']
        })
      }

      const updatedAddress = await address.update({
        country,
        state,
        city,
        neighborhood,
        street,
        address_number,
        complement,
        cep
      });

      return res.status(200).json(updatedAddress);
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
  async delete(req, res) {
    const { address_id } = req.params

    const address = await Address.findByPk(address_id)

    if (!address) {
      return res.status(400).json({
        errors: ['Address not found']
      })
    }

    if (address.user_id !== req.user_id) {
      return res.status(400).json({
        errors: ['You are not allowed to delete this']
      })
    }

    await address.destroy()

    res.status(200).json({
      message: ['Deleted address']
    })
  }
}
export default new AddressController();
