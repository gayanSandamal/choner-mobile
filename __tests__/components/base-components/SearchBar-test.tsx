import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBar from '@/components/Base/SearchBar';

describe('SearchBar', () => {
  it('should render correctly', () => {
    const { getByPlaceholderText } = render(<SearchBar placeholder='Search here' onSubmit={() => {}} />);
    const inputElement = getByPlaceholderText('Search here');
    expect(inputElement).toBeTruthy();
  });

  it('should update search term on input change', () => {
    const { getByPlaceholderText } = render(<SearchBar placeholder='Search here' onSubmit={() => {}} />);
    const inputElement = getByPlaceholderText('Search here');
    fireEvent.changeText(inputElement, 'example');
    expect(inputElement.props.value).toBe('example');
  });
});