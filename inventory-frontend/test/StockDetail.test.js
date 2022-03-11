/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import {StockDetail} from "../src/components/StockDetail";

describe("StockDetail", ()=>{

    const name = "App failed to connect"
    const total = 1
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

    it("renders correctly", ()=>{
        const{queryByTestId} = render(<StockDetail name ={name} total={total} stockEvents={stockEvents} />)

        expect(queryByTestId('stock-detail')).toBeTruthy()
    })
    it("does not render StockDetail_Body by default", ()=>{
        const{queryByTestId} = render(<StockDetail name ={name} total={total} stockEvents={stockEvents} />)

        expect(queryByTestId('stock-detail-body')).toBeNull()
    })
    it("does render StockDetail_Body after clicking StockDetail_Heading", ()=>{
        const{queryByTestId, getByTestId} = render(<StockDetail name ={name} total={total} stockEvents={stockEvents} />)

        expect(queryByTestId('stock-detail-body')).toBeNull()

        fireEvent.click(getByTestId('stock-detail-heading'))

        expect(queryByTestId('stock-detail-body')).toBeTruthy()
    })

    it("does not render StockDetail_Card if no stockEvents prop is passed", () =>{
        const{queryByTestId, getByTestId} = render(<StockDetail name ={name} total={total}  />)
        
        expect(queryByTestId('stock-detail-body')).toBeNull()
        fireEvent.click(getByTestId('stock-detail-heading'))
        expect(queryByTestId('stock-detail-body')).not.toBeNull()
        
        expect(queryByTestId('stock-detail-card')).toBeNull()
    })

    it("does render StockDetail_Card with information from stockEvents prop", () =>{
        const{queryByTestId, getByTestId} = render(<StockDetail name ={name} total={total} stockEvents={stockEvents} />)
        
        expect(queryByTestId('stock-detail-card')).toBeNull()
        fireEvent.click(getByTestId('stock-detail-heading'))
        expect(queryByTestId('stock-detail-card')).toBeTruthy()

        expect(getByTestId('p-id').textContent).toMatch('ID: '+stockEvents[0].id)
        expect(getByTestId('p-type').textContent).toMatch('TYPE: '+stockEvents[0].attributes.type)
        expect(getByTestId('p-qty').textContent).toMatch('QUANTITY: '+stockEvents[0].attributes.qty)
        expect(getByTestId('p-time').textContent).toMatch('TIMESTAMP: '+stockEvents[0].attributes.publishedAt)
    })
})