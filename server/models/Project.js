const mongoos = require('mongoose');

const ProjectSchema = new mongoos.Schema({
    name:{type: String},
    description:{type: String},
    status:{type: String, enum: ['Not Started', 'In Progress', 'Completed']},
    clientId: {
        type: mongoos.Schema.Types.ObjectId,
        ref: 'Client',
    }
});

module.exports = mongoos.model('Project', ProjectSchema);