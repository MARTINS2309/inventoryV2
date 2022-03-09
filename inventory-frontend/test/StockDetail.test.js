//StockDetail has name,total
//  -it displays Products name, and stock total
//StockDetail has stockEvents array
//  -it contains events objects
//  -display events object contents in div StockEventsTable_Card
//StockDetail can shown/hide stockEvents on click
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import {StockDetail} from "../src/components/StockDetail";


it("renders correctly", ()=>{
    const{} = render(<StockDetail/>)
})
/*
describe("StockEventsTable_Card", ()=>{
    
    it("renders correctly", ()=>{
        render(<StockDetail />);
    })
})
*/