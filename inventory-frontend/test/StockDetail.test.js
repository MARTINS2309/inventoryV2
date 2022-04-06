/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import {StockDetail} from "../src/components/StockDetail";

//tests for StockDetail component
describe("StockDetail", ()=>{
    //prop and state setup
    const props = {
        prodName : "Product 1",
        total : 100,
        stockEvents : [
        {
            id: 1,
            type: 'add',
            qty: 100,
            created_at:	"2022-02-18T10:59:02.976Z",
            updated_at:	"2022-02-18T10:59:23.930Z",
            published_at:	"2022-02-18T10:59:23.929Z",
            product_id: 1
        }
        ]
    }

    it("renders correctly", ()=>{
        const{queryByTestId} = render(<StockDetail {...props} />)

        expect(queryByTestId('stock-detail')).toBeTruthy()
    })    
    it("does not render StockDetail_Body by default", ()=>{
        const{queryByTestId} = render(<StockDetail {...props} />)

        expect(queryByTestId('stock-detail-body')).toBeNull()
    })
    it("does render StockDetail_Body after clicking StockDetail_Heading", ()=>{
        const{queryByTestId, getByTestId} = render(<StockDetail {...props} />)

        expect(queryByTestId('stock-detail-body')).toBeNull()

        fireEvent.click(getByTestId('stock-detail-heading'))

        expect(queryByTestId('stock-detail-body')).toBeTruthy()
    })

    it("does not render StockDetail_Card if no stockEvents prop is passed", () =>{
        const{queryByTestId, getByTestId} = render(<StockDetail name={props.prodName} total={props.total} />)
        
        expect(queryByTestId('stock-detail-body')).toBeNull()
        fireEvent.click(getByTestId('stock-detail-heading'))
        expect(queryByTestId('stock-detail-body')).not.toBeNull()
        
        expect(queryByTestId('stock-detail-card')).toBeNull()
    })

    it("does render StockDetail_Card with information from stockEvents prop", () =>{
        const{queryByTestId, getByTestId} = render(<StockDetail {...props} />)
        
        expect(queryByTestId('stock-detail-card')).toBeNull()
        fireEvent.click(getByTestId('stock-detail-heading'))
        expect(queryByTestId('stock-detail-card')).toBeTruthy()

        expect(getByTestId('p-id').textContent).toMatch('ID: '+ props.stockEvents[0].id)
        expect(getByTestId('p-type').textContent).toMatch('TYPE: '+ props.stockEvents[0].type)
        expect(getByTestId('p-qty').textContent).toMatch('QUANTITY: '+ props.stockEvents[0].qty)
        expect(getByTestId('p-time').textContent).toMatch('TIMESTAMP: '+ props.stockEvents[0].published_at)
    })
})