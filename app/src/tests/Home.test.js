import React from "react";
import {render} from "@testing-library/react";
import Home from "../pages/Home/Home";
import {BrowserRouter} from 'react-router-dom'
import "@testing-library/jest-dom/extend-expect";

describe('Home', () =>
{
    // Creates a snapshot of the current Home page - this test then compares any new builds to this snapshot
    test('Matches DOM Snapshot', () => {
        const { asFragment } = render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});