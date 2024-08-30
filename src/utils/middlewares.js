const mockUsers = require('./mockUsers')

const resolveUserbyId = (req, res, next) => {
    const {
        params: { id },
    } = req

    const ppIds = parseInt(id)
    if (isNaN(ppIds))
        return res.sendStatus(400)

    const findnameIndex = mockUsers.findIndex(
        (user) => user.id === ppIds
    )

    if (findnameIndex === -1)
        return res.sendStatus(404)
    req.findnameIndex = findnameIndex
    next()
}

module.exports = resolveUserbyId