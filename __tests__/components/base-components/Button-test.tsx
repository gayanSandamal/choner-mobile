import React from 'react';
import renderer from 'react-test-renderer';
import { CharmBtn, Btn, BtnGroup, BtnLink } from '@/components/Base/Button';

describe('<CharmBtn />', () => {
  it('rendered sucessfully', () => {
    const tree = renderer.create(<CharmBtn onPress={() => { }} />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});

describe('<Btn />', () => {
  it('rendered sucessfully', () => {
    const tree = renderer.create(<Btn onPress={() => { }} title="Test" />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});

describe('<BtnGroup />', () => {
  it('rendered sucessfully', () => {
    const buttons = [
      { id: 1, title: 'Test 1' },
    ] as { id: number, title: string }[]
    const tree = renderer.create(<BtnGroup onPress={() => { }} buttons={buttons} />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});

describe('<BtnLink />', () => {
  it('rendered sucessfully', () => {
    const tree = renderer.create(<BtnLink href="" title="Test" />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});