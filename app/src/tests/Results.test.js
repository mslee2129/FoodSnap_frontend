import React from "react";
import {render} from "@testing-library/react";
import Results from "../pages/Results/Results";
import {BrowserRouter} from 'react-router-dom'
import "@testing-library/jest-dom/extend-expect";

describe('Home', () => {
    // Creates a snapshot of the current Results page - this test then compares any new builds to this snapshot
    test('Matches DOM Snapshot', () => {
        const {asFragment} = render(
            <BrowserRouter>
                <Results/>
            </BrowserRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});