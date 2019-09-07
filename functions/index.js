const functions = require('firebase-functions');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { admin, db } = require('./firebase')

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors())

app.post('/', (req, res) => {
    const ref = db.ref("question/question" + req.body.qno)
    ref.once("value", question => {
        
        if(!question.val()) {
            return res.status(404).send()
        }

        res.send(question.val())
    })
})

app.get('/', (req, res) => {
    res.send("This app is running")
})

exports.app = functions.https.onRequest(app);
