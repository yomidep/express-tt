const router = require('express').Router()
const { query, validationResult, checkSchema, matchedData } = require('express-validator')
const mockUsers = require('../utils/mockUsers')
const createUseradValidationschema = require('../utils/validationSchemas')
const resolveUserbyId = require('../utils/middlewares')


router.get('/userad', query('filter').isString()
.notEmpty().
withMessage("Must not be empty")
.isLength({ min: 3, max: 10 })
.withMessage("Must be at least 3-10 char"), 
(req, res) => {
    console.log(req.query)
    console.log(req.session)
    console.log(req.session.id)
    req.sessionStore.get(req.session.id, (err, sessionData) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(sessionData)
    })
    const result = validationResult(req)
    console.log(result)
    const {
        query: { filter, value },
    } = req

    if (!filter && !value)
        return res.send(mockUsers)

    if (filter && value) {
        const filteredUsers = mockUsers.filter((user) =>
            user[filter]?.includes(value)
        )

        if (filteredUsers.length === 0)
            return res.status(404).send({ msg: 'No users found' })

        return res.send(filteredUsers)
    }
})

router.post('/userad', checkSchema(createUseradValidationschema), (req, res) => {
    const result = validationResult(req)
    console.log(result)

    if (!result.isEmpty())
        return res.status(400).send({ error: result.array() })
    console.log(req.body)
    const { body } = req
    const data = matchedData(req)

    console.log(data)
    const newName = { id: mockUsers[mockUsers.length - 1].id + 1, ...data }
    mockUsers.push(newName)
    return res.status(200).send(newName)
})

router.get('/userad/:id', (req, res) => {
    console.log(req.params)
    const ppId = parseInt(req.params.id)
    if (isNaN(ppId))
        return res.status(400).send({
            msg: "Bad Requet, Invalid ID"
        })

    const findId = mockUsers.find((user) => user.id === ppId)
    if (!findId) return res.status(404).send({
        msg: 'User not found'
    })
    return res.send(findId)

})

router.put('/userad/:id', resolveUserbyId, (req, res) => {
    const { body, findnameIndex } = req
    mockUsers[findnameIndex] = { id: [findnameIndex], ...body }
    return res.sendStatus(200)

})

router.patch('/userad/:id', (req, res) => {
    const { body, findnameIndex } = req

    mockUsers[findnameIndex] = { ...mockUsers[findnameIndex], ...body }
    return res.sendStatus(200)
})

router.delete('/userad/:id', (req, res) => {
    const {
        params: { id },
    } = req

    const ppIds = parseInt(id)
    if (isNaN(ppIds))
        return res.sendStatus(400)

    const findNameIndex = mockUsers.findIndex((user) => user.id === ppIds)
    if (findNameIndex === -1)
        return res.sendStatus(404)

    mockUsers.splice(findNameIndex)
    return res.sendStatus(200)
})

module.exports = router