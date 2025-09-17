/** @type { import('@storybook/react-vite').Preview } */
import '../src/styles/style.css';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  viewport: {
    viewports: 'iphone6',
  },
};

export default preview;
