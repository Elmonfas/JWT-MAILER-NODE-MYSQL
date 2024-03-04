const { transporter, main } = require('./mailer');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const con = require('../database/conn')
const bcrypt = require('bcryptjs')

router.get('/',(req, res) => {
    res.render('home')
})

// RECUPERAR PASSWORD CON TOKEN EN LOS PARAMS
router.get('/reset-password/:token',(req,res)=>{
    const token = req.params.token;

    const verify = jwt.verify(token,'my_secret_key', (e) => {
        if (e){
            res.sendStatus(403)
        } else {
            res.render('new-pass')
        }
    })

})



// RECUPERAR CONTRASEÑA
router.post('/forgot',(req , res) => {
    const user = req.body
    const email = req.body.email
    console.log(email)
    const token = jwt.sign({user}, 'my_secret_key', {
        expiresIn: '1m'
    })
    const url = 'http://192.168.0.51:5050/reset-password/'+token
    main(url,res,email).catch(console.error);
},)



router.get('/forgot', (req, res) => {
    res.render('forgot')
})


router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register',hasing, async (req, res) => {
    
    try {
        if (req.body === ''){
            res.send('Rellena todos los campos')
        }
        
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        
        console.log(user)

        await con.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',[user.name,user.email,user.password])
        
        res.render('home')
        
        } catch (e) {
        console.log('Error en el registro de usuario :',e)
        }

})

async function hasing(req, res, next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashed_pass = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashed_pass
        next()
    } catch (e) {
        next(e)
    }

}

module.exports = router