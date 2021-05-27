import 'react-native'
import { render, fireEvent } from '@testing-library/react-native'
import React from 'react'

import Dropdown from '../../src/components/controls/Dropdown'

// Note: test renderer must be required after react-native.

const mockOptions = [
  {
    key: 'alabaster',
    text: 'Alabaster',
  },
  {
    key: 'beige',
    text: 'Beige',
  },
  {
    key: 'cashmere',
    text: 'Cashmere',
  },
  {
    key: 'dove',
    text: 'Dove',
  },
]

const testID = 'dropdownTest'

describe('Dropdown', () => {
  it('Renders with empty values.', () => {
    const { getByTestId } = render(
      <Dropdown testID={testID} options={mockOptions} onChange={() => {}} />
    )
    const text = getByTestId(`${testID}_textvalue`)
    expect(text).toHaveTextContent('Select')
  })
  it('Renders initial value correctly.', () => {
    const { getByTestId } = render(
      <Dropdown
        testID={testID}
        options={mockOptions}
        initialValue="cashmere"
        onChange={() => {}}
      />
    )
    const text = getByTestId(`${testID}_textvalue`)
    expect(text).toHaveTextContent('Cashmere')
  })

  it('Opens menu on click.', () => {
    const { getByTestId } = render(
      <Dropdown testID={testID} options={mockOptions} onChange={() => {}} />
    )
    const pressable = getByTestId(`${testID}_pressable`)
    fireEvent.press(pressable)
    const dropbox = getByTestId(`${testID}_dropbox`)
    expect(dropbox.children).toHaveLength(4)
  })

  it('Clicking on menu item changes text and fires OnPress event.', () => {
    const mockFn = jest.fn()
    const { getByTestId } = render(
      <Dropdown testID={testID} options={mockOptions} onChange={mockFn} />
    )
    const text = getByTestId(`${testID}_textvalue`)
    expect(text).toHaveTextContent('Select')
    const pressable = getByTestId(`${testID}_pressable`)
    fireEvent.press(pressable)
    const thirdOption = getByTestId(`${testID}_options_2`)
    fireEvent.press(thirdOption)
    expect(text).toHaveTextContent(mockOptions[2].text)
    expect(mockFn).toHaveBeenCalledWith(mockOptions[2].key)
  })
})
