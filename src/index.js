const express = require('express')
const app = express()
const allRoutes = require('./routers/index')
const  cookieParser  = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
require('./strategy/local')


app.use(express.json())
app.use(cookieParser("magico"))
app.use(session({
    secret: 'arkade',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 6000 * 60
    }
}))

app.use(passport.initialize())
app.use(passport.session())

const PORT = process.env.PORT || 3000



 

app.get('/', (request, response) => {
    console.log(request.session)
    console.log(request.session.id)
    request.session.visited = true
    response.cookie('hello', 'world', { maxAge: 10000, signed: true})
    response.send({ msg: 'you black' })
})

app.get('/user', (req, res) => {
    res.send({ 
        msg: 'you need to be black to be a user'
     })
})

app.use(allRoutes)

app.post('/auth', passport.authenticate("local"), (req, res) => {})

app.get('/auth', (req, res) => {
    return req.session.user ? res.status(200).send(req.session.user) : 
    res.status(401).send({ msg: "not authy" })
})

app.post('/cart', (req, res) => {
    if (!req.session.user)
        return res.sendStatus(401)

    const { body: item } = req

    const { cart } = req.session
    if ( cart ) {
        cart.push(item)
    } else  {
        req.session.cart = [item]
    }

    return res.status(201).send(item)
})

app.get('/cart', (req, res) => {
    if (!req.session.user) 
        return res.sendStatus(401)
    return res.send(req.session.cart ?? [])
})





app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})