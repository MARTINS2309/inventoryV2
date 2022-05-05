import App from "./App";
import * as ReactDOM from "react-dom";

describe("App", () => {

    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        ReactDOM.render(<App />, container);
    });

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    });

    it("renders without crashing", () => {
        const p = container.querySelectorAll("p");
        expect(p.length).toBe(1);
        expect(p[0].textContent).toBe("Edit src/App.tsx and save to reload.");
    });

    it("renders a link", () => {
        const a = container.querySelectorAll("a");
        expect(a.length).toBe(1);
        expect(a[0].textContent).toBe("Learn React");
    });

    it("renders a logo", () => {
        const img = container.querySelectorAll("img");
        expect(img.length).toBe(1);
        expect(img[0].src).toContain("/logo.svg");
    });

    it("renders a header", () => {
        const header = container.querySelectorAll("header");
        expect(header.length).toBe(1);
    });

});
