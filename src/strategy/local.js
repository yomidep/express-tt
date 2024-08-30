const passportLocal = require('passport-local').Strategy
const passport = require('passport')
const mockUsers = require('../utils/mockUsers')

passport.serializeUser((user, done) => {
    console.log(`Innside serialize`)
    console.log(user)
    done(null, user.id)
})

passport.deserializeUser((id,done) => {
    console.log(`Inside deserializer`)
    console.log(`Deserializing ${id}`)
    try {
        const findName = mockUsers.find((user) => user.id === id)
        if (!findName)
            throw new Error("User not found")
        done(null, user)
    } catch (err) {
        done(err,  null)
    }
})

passport.use(
    new passportLocal( 
        { usernameField: "name"},
         (username, password, done) => {
        console.log(`Username: ${username}`)
        console.log(`Password: ${password}`)
        try {
            const findName = mockUsers.find((user) => user.name === username)
            if (!findName)
                throw new Error("User not found")
            if (findName.password !== password)
                throw new Error("Invalid Credentials")
            done(null, findName)
        } catch (err) {
            done(err, null)
        }
       } 
    )
)


module.exports = passport