import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';

import Nav from './Nav';

describe("Nav", () => {
    
    let container: any;
    let root: any;

    beforeEach(() => {
        container = document.getElementById("nav") as HTMLElement;
        root = createRoot(container);
    });

    afterEach(() => {
        container.remove();
        root.unmount();
    });

    it("renders Nav without crashing", () => {
        act(() => {
            root.render(<Nav />);
        });

        expect(container.querySelector("nav")).toBeTruthy();
    });

});