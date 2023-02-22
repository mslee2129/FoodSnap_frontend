import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from "../src/pages/Home/Home"

test('renders home', async () => {
    render(<Home/>);

    expect(screen.getByRole("heading")).toHaveTextContent(/Welcome to FoodSnap!/);
})
