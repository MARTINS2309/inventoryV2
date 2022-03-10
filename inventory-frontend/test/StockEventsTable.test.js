/**
 * @jest-environment jsdom
 */
 import React from "react";
 import { render, fireEvent } from "@testing-library/react";
 import {StockEventsTable} from "../src/components/StockEventsTable";
 
describe("StockEventTable", ()=>{
    
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
                        name: "test",
                        createdAt:	"2022-02-18T10:47:49.151Z",
                        updatedAt:	"2022-02-18T10:58:40.866Z",
                        publishedAt:	"2022-02-18T10:58:40.865Z", 
                    }
                }
            }
        }
    }]

    it("renders correctly", ()=>{
        const{queryByTestId} = render(<StockEventsTable products={products} stockEvents={stockEvents} />)

        expect(queryByTestId('s-e-t')).toBeTruthy()
        expect(queryByTestId('s-e-t-container')).toBeTruthy()
    })

    it("does not call StockDetail if no props provided", ()=>{
        const{queryByTestId} = render(<StockEventsTable/>)

        expect(queryByTestId('s-e-t-container')).toBeNull()
    })



    it.skip("passes correct props to the child component", ()=>{
        const mockStockDetail = jest.fn();
        jest.mock("../src/components/StockDetail", () => (props) => {
            mockStockDetail(props)
    
            return <mock-StockDetail />
        })

        render(<StockEventsTable products={products} stockEvents={stockEvents} />)

        expect(mockStockDetail).toHaveBeenCalledWith(
            expect.objectContaining({
                name: "App failed to connect",
                total: 100,
                stockEvents: {stockEvents}
            })
        )
    })

    

})