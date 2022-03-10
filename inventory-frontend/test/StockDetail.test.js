/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import {StockDetail} from "../src/components/StockDetail";

describe("StockEventsTable_Card", ()=>{

    it("renders correctly", ()=>{
        const{queryByPlaceholderText} = render(<StockDetail 
                                                    name="Product" 
                                                    total="1" 
                                                    stockEvents = 
                                                />)

        expect(queryByPlaceholderText('StockEventsTable_Card')).toBeTruthy()
    })
})
/*
describe("StockEventsTable_Card", ()=>{
    
    it("renders correctly", ()=>{
        render(<StockDetail />);
    })
})
*/