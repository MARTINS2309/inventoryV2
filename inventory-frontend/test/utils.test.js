import {fetchData} from '../src/components/utils.js';
//Tests for utils module
describe("utils", () => {
    //Tests for fetchData function that fetches data from server and sets it to state of parent component using setData function
    describe("fetchData", () => {
        it.skip("fetches data from server and sets it to state of parent component using setData function", async () => {
            const setData = jest.fn();
            const sgnl = {};
            const url = "http://localhost:3001/api/products";

            jest.spyOn("fetchData", 'fetch').mockImplementation(() => {
                return Promise.resolve([{}]);
            });

            await fetchData({ setData, url, sgnl });
            expect(setData).toHaveBeenCalled();
        });
    });
});