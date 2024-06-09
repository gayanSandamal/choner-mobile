import React from 'react';
import renderer from 'react-test-renderer';
import BottomModal from '@/components/Base/Modal';

describe('BottomModal', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<BottomModal slot='' isVisible={true} onClose={jest.fn()} />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});