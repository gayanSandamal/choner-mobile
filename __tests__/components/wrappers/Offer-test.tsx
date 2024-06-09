import { render } from '@testing-library/react-native';
import { Vivid } from '@/components/Wrappers/Offer';

describe('Vivid', () => {
  it('renders correctly', () => {
    const props = {
      title: 'Test Title',
      subtitleLine1: 'Test Subtitle 1',
      subtitleLine2: 'Test Subtitle 2',
      button: {
        title: 'Test Button',
        href: 'https://example.com',
      },
      bgImgUri: 'https://example.com/image.jpg',
      color: 'text-white',
    };

    const { getByText } = render(<Vivid {...props} />);

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Subtitle 1')).toBeTruthy();
    expect(getByText('Test Subtitle 2')).toBeTruthy();
    expect(getByText('Test Button')).toBeTruthy();
  });
});