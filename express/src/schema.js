const { gql } = require('apollo-server');

const typeDefs = gql`
    type Product {
        id: ID!
        attributes:{
            name: String
            createdAt: String
            updatedAt: String
            publishedAt: String
        }
    }

    type StockEvent {
        id: ID!
        attributes:{
            type: Action
            qty: Int
            createdAt: String
            updatedAt: String
            publishedAt: String
            product: {
                data: Product
            }
        }
    }

    enum Action {
        add
        remove
    }

    type Query {
        products: [Product]!
        stockEvents: [StockEvent]
    }
`;

module.exports = typeDefs;