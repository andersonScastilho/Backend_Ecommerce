import AdministrativeUser from '../models/AdministrativeUser'

export default async (req, res, next) => {
    const user = await AdministrativeUser.findByPk(req.admUser_id)

    if (!user) {
        return res.status(400).json({
            errors: ['User not found']
        })
    }

    if (user.role_id !== 1) {
        return res.status(400).json({
            errors: ['You are not allowed to change this']
        })
    }

    return next()
}