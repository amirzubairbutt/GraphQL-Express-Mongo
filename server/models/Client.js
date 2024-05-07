const mongoos = require('mongoose');

const ClientSchema = new mongoos.Schema({
    name:{type: String},
    email:{type: String},
    phone:{type: String},
});

module.exports = mongoos.model('Client', ClientSchema);