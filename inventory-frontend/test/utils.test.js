/**
* @jest-environment jsdom
*/
import {fetchData} from '../src/components/utils.js';
//Tests for utils module
describe("utils", () => {
    //Tests for fetchData function that fetches data from server and sets it to state of parent component using setData function
    describe("fetchData", () => {
        //Mock data
        const products = [
            {
                id: 1,
                name: "App failed to connect",
                created_at:	"2022-02-18T10:47:49.151Z",
                updated_at:	"2022-02-18T10:58:40.866Z",
                published_at:	"2022-02-18T10:58:40.865Z"
            }
        ];
        //Mock fetch function
        global.fetch = jest.fn(() => {
            Promise.resolve({
                json: () => Promise.resolve(products)
            });
        });
        //Clear mock data
        beforeEach(() => {
            fetch.mockClear();
        });
        //Test for fetchData function
        it("fetches data from server and sets it to state of parent component using setData function", async () => {
            const setData = jest.fn();
            const url = "products";
            const sgnl = {};
            await fetchData({ setData, url, sgnl });
            expect(setData).toHaveBeenCalledWith(products);
        });
    });
});