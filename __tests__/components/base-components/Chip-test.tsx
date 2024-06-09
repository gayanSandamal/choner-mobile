import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Chip from '@/components/Base/Chip';

describe('Chip component', () => {
  test('renders correctly with default props', () => {
    const { getByText } = render(<Chip title="Default Chip" />);
    const chipElement = getByText('Default Chip');
    expect(chipElement).toBeTruthy();
  });

  test('renders correctly with active state', () => {
    const { getByText } = render(<Chip title="Active Chip" isActive />);
    const chipElement = getByText('Active Chip');
    expect(chipElement).toBeTruthy();
  });

  test('calls onPress callback when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Chip title="Clickable Chip" onPress={onPressMock} />);
    const chipElement = getByText('Clickable Chip');
    fireEvent.press(chipElement);
    expect(onPressMock).toHaveBeenCalled();
  });
});