const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull} = require('graphql');

const Project = require('../models/Project.js');
const Client = require('../models/Client.js');


// Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
    })
})

// Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent, args){
                return Client.findById(parent.clientId);
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:() => ({
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, arg){
                return Client.find();
            }
        },
        client:{
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Client.findById(args.id)
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, arg){
                return Project.find();
            }
        },
        project:{
            type: ProjectType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Project.findById(args.id);
            }
        }
    })
})
// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addClient: {
            type: ClientType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                })
                return client.save();
            }
        }, 
        deleteClient:{
            type: ClientType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            }, 
            resolve(parent, args){
                return Client.findByIdAndDelete(args.id);
            }
        }
    })
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})