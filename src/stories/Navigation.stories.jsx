import Navigation from '../components/Navigation';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Components/Navigation',
  component: Navigation,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const dummyUser = {
  name: 'Jane Doe',
  avatar: 'https://i.pravatar.cc/150?img=12',
};

const dummySignOut = () => alert('Sign out clicked');

export const Default = {
  args: {
    authUser: dummyUser,
    signOut: dummySignOut,
  },
};
