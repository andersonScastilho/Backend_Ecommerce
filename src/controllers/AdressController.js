import Adress from "../models/Adress";
import User from "../models/User";

class AdressController {
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
        adress_number,
        complement,
        cep,
      } = req.body;

      const isValidBRZip = zip => /^[0-9]{5}-[0-9]{3}$/.test(zip);
      const cepIsValid = isValidBRZip(cep)

      if (!cepIsValid) {
        return res.status(400).json({
          errors: ['Enter a valid zip code']
        })
      }


      await Adress.create({
        country,
        state,
        city,
        neighborhood,
        street,
        adress_number,
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
        adress_number,
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

      const adress_id = +req.params.adress_id;

      const adress = await Adress.findByPk(adress_id, {
        attributes: ['country', 'state', 'city', 'neighborhood', 'street', 'adress_number', 'cep', 'complement', 'user_id'],
        include: {
          attributes: ["name", "email", "surname", "tel"],
          model: User,
        },
      });


      if (!adress) {
        return res.status(404).json({
          errors: ['Adress not found']
        })
      }

      if (adress.user_id !== +req.user_id) {
        return res.status(401).json({
          errors: ['This address does not belong to you']
        })
      }


      return res.status(200).json({ adress });
    } catch (e) {
      console.log(e)
    }
  }
  async update(req, res) {
    try {
      const id = +req.params.adress_id;

      const {
        country,
        state,
        city,
        neighborhood,
        street,
        adress_number,
        complement,
        cep,
      } = req.body;

      if (!state && !country &&
        !city && !neighborhood &&
        !street && !adress_number &&
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

      const adress = await Adress.findByPk(id);

      if (!adress) {
        return res.status(404).json({ errors: ["Adress not found"] });
      }

      if (adress.user_id !== req.user_id) {
        return res.status(401).json({
          erros: ['This address does not belong to you']
        })
      }

      const updatedAdress = await adress.update({
        country,
        state,
        city,
        neighborhood,
        street,
        adress_number,
        complement,
        cep
      });

      return res.status(200).json(updatedAdress);
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
  async delete(req, res) {
    const { adress_id } = req.params

    const address = await Adress.findByPk(adress_id)

    if (!address) {
      return res.status(400).json({
        errors: ['Adress not found']
      })
    }

    if (address.user_id !== req.user_id) {
      return res.status(400).json({
        errors: ['You are not allowed to delete this']
      })
    }

    await address.destroy()

    res.status(200).json({
      message: ['Deleted adress']
    })
  }
}
export default new AdressController();
