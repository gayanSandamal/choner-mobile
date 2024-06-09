import React from 'react';
import { render } from '@testing-library/react-native';
import { ContentSection } from '@/components/Wrappers/Sections';

describe('ContentSection', () => {
  it('renders the title correctly', () => {
    const title = 'Test Title';
    const { getByText } = render(<ContentSection title={title} />);
    const titleElement = getByText(title);
    expect(titleElement).toBeTruthy();
  });

  it('renders the link correctly', () => {
    const link = { href: '/shop', title: 'Shop' };
    const { getByText } = render(<ContentSection title='test' link={link} slot='' />);
    const linkElement = getByText(link.title);
    expect(linkElement).toBeTruthy();
  });
});