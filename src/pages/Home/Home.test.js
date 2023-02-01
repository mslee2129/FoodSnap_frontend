/* eslint-disable no-undef */
/*
  checks REACT component App if link "learn react" is created
*/

import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from './Home'

test('renders welcome message', () => {
  render(<Home />)
  const { getByText } = within(screen.getByTestId('Home-header'))
  expect(getByText('Welcome to FoodSnap!')).toBeInTheDocument()
})
