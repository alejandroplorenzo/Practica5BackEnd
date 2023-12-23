import { Estado } from "../types.ts";
export const typeDefs = `#graphql

    type Cliente {
        id: ID!,
        name: String!
        email: String!
        cards: [Tarjeta!]!
        travels: [Viaje!]!
    }

    type Conductor {
        id: ID!,
        name: String!
        email: String!
        username: String!
        travels: [Viaje!]!
    }

    type Viaje {
        id: ID!,
        client: Cliente!
        driver: Conductor!
        money: Int!
        distance: Int!
        date: String!
        status: Estado!
    }

    type Tarjeta {
        number: Int!
        cvv: Int!
        expirity: String!
        money: Int!
    }
    
    enum Estado {
        Before 
        In process
        Finished
    }

    type Query {
        clientes: [Cliente!]!
        conductores: [Conductor!]!
        viajes: [Viaje!]!
    }

    type Mutation {
        addCliente(name: String!, email: String!): Cliente!
        addConductor(name: String!, email: String!, username: String!): Conductor!
        addTarjeta(id: ID!, number: Int!, cvv: String!, expirity: String!, money: Int!): Cliente!
        addViaje(client: ID!, driver: ID!, money: Int!, distance: Int!, date: String!, status: Estado!): Viaje!
        deleteCliente(id: ID!): String!
        deleteConductor(id: ID!): String!
        deleteTarjeta(id: ID!): String!
    }
`;