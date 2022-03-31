/**
* @jest-environment jsdom
*/
import React from "react";
import { render } from "@testing-library/react";
import {StockEventsTable} from "../src/components/StockEventsTable";

//Tests for StockEventsTable component
describe("StockEventsTable", () => {
    //sample state
    const stockEvents = [{
        id: 1,
        type: 'add',
        qty: 100,
        created_at:	"2022-02-18T10:59:02.976Z",
        updated_at:	"2022-02-18T10:59:23.930Z",
        published_at:	"2022-02-18T10:59:23.929Z",
        product_id: 1
    }];
    const products = [{
        id: 1,
        name: "App failed to connect",
        created_at:	"2022-02-18T10:47:49.151Z",
        updated_at:	"2022-02-18T10:58:40.866Z",
        published_at:	"2022-02-18T10:58:40.865Z"
    }];
    
    it.skip("renders correctly", () => {
        const { queryByTestId } = render(<StockEventsTable/>);
        
        jest.mock("../src/components/utils", () => {
            return {
                fetchData: jest.fn().mockImplementation(({ setData, url, sgnl }) => {
                    if (url === "http://localhost:3001/api/products") {
                        setData([{
                            id: 1,
                            name: "App failed to connect",
                            created_at:	"2022-02-18T10:47:49.151Z",
                            updated_at:	"2022-02-18T10:58:40.866Z",
                            published_at:	"2022-02-18T10:58:40.865Z"
                        }]);
                    } else if (url === "http://localhost:3001/api/stockevents") {
                        setData([{
                            id: 1,
                            type: 'add',
                            qty: 100,
                            created_at:	"2022-02-18T10:59:02.976Z",
                            updated_at:	"2022-02-18T10:59:23.930Z",
                            published_at:	"2022-02-18T10:59:23.929Z",
                            product_id: 1
                        }]);
                    }
                    else {
                        setData([]);
                    }
                })
            }
        });


        expect(queryByTestId('stock-events-table')).toBeTruthy();
    });


})