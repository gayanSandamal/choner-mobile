import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NumberInput from '@/components/Base/NumberInput';

describe('NumberInput', () => {
  it('should render with initial value', () => {
    const { getByDisplayValue } = render(<NumberInput initialValue={5} onChange={() => {}} />);
    const inputElement = getByDisplayValue('5');
    expect(inputElement).toBeDefined();
  });
});