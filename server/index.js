const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./model/Register')

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/test');

app.post('/login', (req, res) => {
    const {email, password} = req.body
    RegisterModel.findOne({email:email})
        .then(user => {
            if (user) {
                if(user.password === password) {
                    res.json('Login Success!')
                } else {
                    res.json('Sai password!')
                }
            } else {
                res.json('No record existed!')
            }
        })
        .catch
})

app.post('/register', (req, res) => {
    RegisterModel.create(req.body)
                .then(register => res.json(register))
                .catch(error => res.json(error))
})

app.listen(3001, () => {
    console.log('Server is running!')
})