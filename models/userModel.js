



const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name : {
        type : String,
        required: [true, 'Please add a name']
    },
    email : {
        type : String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password : {
        type : String,
        required: [true, 'Please add a pasword']
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)

