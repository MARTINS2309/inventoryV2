/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import {StockDetail} from "../src/components/StockDetail";

describe("StockDetail", ()=>{

    const name = "Product"
    const total = 1
    const stockEvents = 
    [
        {
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
        }
    ]

    it("renders correctly", ()=>{
        const{queryByTestId} = render(<StockDetail name ={name} total={total} stockEvents={stockEvents} />)

        expect(queryByTestId('stock-detail')).toBeTruthy()
    })
    it("does not render StockDetail_Card by default", ()=>{
        const{queryByTestId} = render(<StockDetail name ={name} total={total} stockEvents={stockEvents} />)

        expect(queryByTestId('stock-detail-card')).toBeNull()
    })
    it("does render StockDetail_Card after clicking it", ()=>{
        const{queryByTestId, getByTestId} = render(<StockDetail name ={name} total={total} stockEvents={stockEvents} />)

        expect(queryByTestId('stock-detail-card')).toBeNull()

        fireEvent.click(getByTestId('stock-detail'))

        expect(queryByTestId('stock-detail-card')).toBeTruthy()
    })

    

})