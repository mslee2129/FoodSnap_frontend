import React from "react";
import {render, fireEvent, screen, waitFor} from "@testing-library/react";
import Home from "../pages/Home/Home";
import {BrowserRouter, MemoryRouter, useNavigate} from 'react-router-dom'
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import renderer from 'react-test-renderer';

// Mock axios in jest - this mock is used in this test
jest.mock('axios');

describe('Home', () =>
{
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Creates a snapshot of the current Home page - this test then compares any new builds to this snapshot
    test('Matches DOM Snapshot', () => {
        const { asFragment } = render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test("is rendered", () => {
        // Renders the home page
        render(<Home/>, {wrapper: MemoryRouter})

        // Asserts that the heading is rendered on the page
        expect(screen.getByRole("heading")).toHaveTextContent(/Welcome to FoodSnap!/);
    });

    test("upload button exists", () => {
        render(<Home/>, {wrapper: MemoryRouter})

        expect(screen.getByRole("button", {name: "Upload"})).toBeEnabled();
    });

    test("sets file state when a file is uploaded", () => {
        // Renders the home page
        render(<Home />, { wrapper: MemoryRouter });

        // Mock file to 'upload'
        const testFile = new File(["test"], "test.png", { type: "image/png" });

        // Update the upload-form form with this mock file
        const fileInput = screen.getByTestId("upload-form");
        fireEvent.change(fileInput, { target: { files: [testFile] } });

        // Assert that the uploaded file matches test file
        expect(fileInput.files[0]).toStrictEqual(testFile);
        expect(screen.getByRole("button", { name: "Upload" })).toBeEnabled();
    });

    test("does not set file state if user cancels file upload", () => {
        // Renders the home page
        render(<Home />, { wrapper: MemoryRouter });

        // Upload a file and then cancel input
        const submitButton = screen.getByRole("button", { name: "Upload" });
        fireEvent.change(submitButton, { target: { files: [] } });

        // Assert that no file state has been set
        expect(submitButton.files).toHaveLength(0);
        expect(screen.getByTestId("upload-form")).toHaveTextContent(/To start upload a picture/);
    });

    test("does not make API request if file state is not set", async () => {
        // Renders the home page
        render(<Home />, { wrapper: MemoryRouter });

        // Clicks upload button
        const submitButton = screen.getByRole("button", { name: "Upload" });
        fireEvent.click(submitButton);

        // Asserts that API request has not been made
        await waitFor(() => {
            expect(axios.post).not.toHaveBeenCalled();
        });
    });

    // NOTICE: BACKEND INTEGRATION REQUIRED FOR THIS TEST - maybe a backend test?
    // test("updates response data state with correct data", async () => {
    //     render(<Home />, { wrapper: MemoryRouter });
    //     const responseData = {
    //         label: "test label",
    //         nutrition: "test nutrition",
    //         weight: "test weight",
    //     };
    //     axios.post.mockResolvedValueOnce({ data: responseData });
    //     const testFile = new File(["test"], "test.png", { type: "image/png" });
    //     const fileUploadInput = screen.getByRole("button", { name: "Upload" });
    //     fireEvent.change(fileUploadInput, { target: { files: [testFile] } });
    //     const submitButton = screen.getByRole("button", { name: "Upload" });
    //     fireEvent.click(submitButton);
    //     await waitFor(() => {
    //         expect(axios).toHaveBeenCalledTimes(1);
    //     });
    //     expect(screen.getByRole("heading", { name: "Results" })).toBeInTheDocument();
    //     expect(screen.getByText("test label")).toBeInTheDocument();
    //     expect(screen.getByText("test nutrition")).toBeInTheDocument();
    //     expect(screen.getByText("test weight")).toBeInTheDocument();
    // });
});