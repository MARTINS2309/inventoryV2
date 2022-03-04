import { gql } from "apollo-server-express";

const typeDefs = gql`
    type Product {
        id: ID!
        name: String!
    }

    enum Type{
        ADD
        REMOVE
    }

    type StockEvent {
        id: ID!
        type: Type!
        qty: Int!
        product: Product!
    }
    
    type Query {
        getProducts: [Product!]
        getStockEvents: [StockEvent!]
    }
`;

export default typeDefs;