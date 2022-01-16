// https://github.com/vercel/next.js/issues/18393#issuecomment-783269086
import * as NextImage from 'next/image';
// import { withCreeveyEnhanced } from './decorators/withCreeveyEnhanced';

const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#ffffff',
      },
      {
        name: 'whiteSmoke',
        value: '#f5f5f5',
      },
    ],
  },
};

// export const decorators = [withCreeveyEnhanced];
