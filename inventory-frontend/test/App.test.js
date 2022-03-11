
import React from "react";
import { render, screen } from "@testing-library/react";
import {App} from "../src/App";

describe("App", () =>{
    const products = [{
        id: 1,
        attributes:{
            name: "App failed to connect",
            createdAt:	"2022-02-18T10:47:49.151Z",
            updatedAt:	"2022-02-18T10:58:40.866Z",
            publishedAt:	"2022-02-18T10:58:40.865Z", 
        }
    }]
    
    const stockEvents = [{
        id: 1,
        attributes:{
            type: 'add',
            qty: 100,
            createdAt:	"2022-02-18T10:59:02.976Z",
            updatedAt:	"2022-02-18T10:59:23.930Z",
            publishedAt:	"2022-02-18T10:59:23.929Z",
            product: {
                data: {
                    id: 1,
                    attributes:{
                        name: "App failed to connect",
                        createdAt:	"2022-02-18T10:47:49.151Z",
                        updatedAt:	"2022-02-18T10:58:40.866Z",
                        publishedAt:	"2022-02-18T10:58:40.865Z", 
                    }
                }
            }
        }
    }] 

    const isSubscribed = true



})