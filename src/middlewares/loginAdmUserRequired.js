import jwt from "jsonwebtoken";

import AdministrativeUser from "../models/AdministrativeUser";

export default async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ errors: ["Login required"] });
  }
  const [, token] = authorization.split(" ");

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, username } = dados;

    const admUser = await AdministrativeUser.findOne({
      where: {
        id,
        username,
      },
    });

    if (!admUser) {
      return res.status(401).json({ errors: ["Invalid user"] });
    }

    req.admUser_id = id;
    req.admUser_username = username;

    return next();
  } catch (e) {
    return res.status(401).json({ errors: ["Token expired or invalid"] });
  }
};
