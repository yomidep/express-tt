const router = require('express').Router()

router.get('/products', (req,res) => {
    console.log(req.headers.cookie)
    console.log(req.cookies)
    console.log(req.signedCookies.hello)
    if (req.signedCookies.hello && req.signedCookies.hello === 'world')
        return res.send([{ 
        id: 144,
        name: "Pizza",
        price: 15
    }])

    return res.send('Sorry you need the cookie')
})

module.exports = router