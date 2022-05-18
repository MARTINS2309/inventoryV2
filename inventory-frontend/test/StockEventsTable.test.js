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
        name: "Product 1",
        created_at:	"2022-02-18T10:47:49.151Z",
        updated_at:	"2022-02-18T10:58:40.866Z",
        published_at:	"2022-02-18T10:58:40.865Z"
    }];

    //Mock fetch function
    global.fetch = jest.fn((url) => {
        if (url === "http://localhost:3001/api/products") {
            return Promise.resolve({
                json: () => Promise.resolve(products)
            });
        } else if (url === "http://localhost:3001/api/stockevents") {
            return Promise.resolve({
                json: () => Promise.resolve(stockEvents)
            });
        } else {
            return Promise.reject(new Error("Invalid url"));
        }
    });
    //Clear mock data
    beforeEach(() => {
        fetch.mockClear();
    });
    
    it("renders correctly", () => {
        const { getByTestId } = render(<StockEventsTable />);
        expect(getByTestId("s-e-t")).toBeTruthy();
    });

    it("fetches both products and stockevents", () => {
        render(<StockEventsTable />);
        expect(fetch).toHaveBeenCalledTimes(2);
    });
})