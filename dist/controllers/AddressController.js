"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Address = require('../models/Address'); var _Address2 = _interopRequireDefault(_Address);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

var _regExp = require('../utils/regExp');

class AddressController {
  async store(req, res) {
    try {
      if (!req.user_id) {
        return res.status(401).json({ errors: ["Login required"] });
      }
      const user_id = req.user_id;

      const user = await _User2.default.findByPk(user_id);

      if (!user) {
        return res.status(404).json({ errors: ["User not found"] });
      }

      const {
        country,
        state,
        city,
        neighborhood,
        street,
        address_number,
        complement,
        zip_code,
      } = req.body;

      if (!country || !state ||
        !city || !neighborhood ||
        !street || !address_number || !zip_code) {
        return res.status(400).json({
          errors: ['Missing data']
        })
      }
      const countryIsValid = _regExp.regExpIsValidText.call(void 0, country)
      const stateIsValid = _regExp.regExpIsValidText.call(void 0, state)
      const cityIsValid = _regExp.regExpIsValidText.call(void 0, city)
      const neighborhoodIsValid = _regExp.regExpIsValidText.call(void 0, neighborhood)
      const streetIsValid = _regExp.regExpIsValidText.call(void 0, street)
      const zipCodeIsValid = _regExp.isValidBRZip.call(void 0, zip_code)

      if (!countryIsValid) {
        return res.status(400).json({
          errors: ['Provide a valid country']
        })
      }

      if (!stateIsValid) {
        return res.status(400).json({
          errors: ['Provide a valid state']
        })
      }

      if (!cityIsValid) {
        return res.status(400).json({
          errors: ['Provide a valid city']
        })
      }

      if (!neighborhoodIsValid) {
        return res.status(400).json({
          errors: ['Provide a valid neighborhood']
        })
      }

      if (!streetIsValid) {
        return res.status(400).json({
          errors: ['Providea valid street']
        })
      }


      if (!zipCodeIsValid) {
        return res.status(400).json({
          errors: ['Enter a valid zip code']
        })
      }

      if (complement) {
        const complementIsValid = _regExp.regExpIsValidText.call(void 0, complement)
        if (!complementIsValid) {
          return res.status(400).json({
            errors: ['Provide a valid complement']
          })
        }
      }

      if (typeof address_number !== 'number') {
        return res.status(400).json({
          errors: ['Provide a valid number']
        })
      }

      await _Address2.default.create({
        country,
        state,
        city,
        neighborhood,
        street,
        address_number,
        complement,
        zip_code,
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
        zip_code,
      });

    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
  async index(req, res) {
    try {

      if (!req.user_id) {
        return res.status(401).json({
          errors: ['Login required']
        })
      }

      const addresses = await _Address2.default.findAll({
        where: {
          user_id: req.user_id
        }
      })

      return res.status(200).json(addresses)

    } catch (error) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
  async show(req, res) {
    try {

      const address_id = +req.params.address_id;

      const address = await _Address2.default.findByPk(address_id, {
        attributes: ['country', 'state', 'city', 'neighborhood', 'street', 'address_number', 'zip_code', 'complement', 'user_id'],
        include: {
          attributes: ["name", "email", "surname", "tel"],
          model: _User2.default,
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
        zip_code,
      } = req.body;

      if (!id) {
        return res.status(400).json({
          errors: ["Inform the address"],
        });
      }

      if (!state && !country &&
        !city && !neighborhood &&
        !street && !address_number &&
        !zip_code && !complement) {
        return res.status(400).json({
          errors: ['Missing data']
        })
      }

      if (country) {
        const countryIsValid = _regExp.regExpIsValidText.call(void 0, country)
        if (!countryIsValid) {
          return res.staus(400).json({
            errors: ['Provide a valid country']
          })
        }
      }

      if (state) {
        const stateIsValid = _regExp.regExpIsValidText.call(void 0, state)
        if (!stateIsValid) {
          return res.status(400).json({
            errors: ['Provide a valid state']
          })
        }
      }

      if (city) {
        const cityIsValid = _regExp.regExpIsValidText.call(void 0, city)
        if (!cityIsValid) {
          return res.status(400).json({
            errors: ['Provide a valid city']
          })
        }
      }

      if (neighborhood) {
        const neighborhoodIsValid = _regExp.regExpIsValidText.call(void 0, neighborhood)
        if (!neighborhoodIsValid) {
          return res.status(400).json({
            errors: ['Provide a valid neighborhood']
          })
        }
      }

      if (street) {
        const streetIsValid = _regExp.regExpIsValidText.call(void 0, street)
        if (!streetIsValid) {
          return res.status(400).json({
            errors: ['Provide a valid street']
          })
        }
      }

      if (zip_code) {
        const zipCodeIsValid = _regExp.isValidBRZip.call(void 0, zip_code)

        if (!zipCodeIsValid) {
          return res.status(400).json({
            errors: ['Provide a valid zip_code']
          })
        }
      }

      if (address_number) {
        if (typeof address_number !== 'number') {
          return res.status(400).json({
            errors: ['Provide a valid number']
          })
        }
      }
      const address = await _Address2.default.findByPk(id);

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
        zip_code
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

    const address = await _Address2.default.findByPk(address_id)

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
exports. default = new AddressController();
