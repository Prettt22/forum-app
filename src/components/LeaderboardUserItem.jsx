// src/components/LeaderboardUserItem.jsx
import PropTypes from 'prop-types';
import Avatar from './Avatar';

function LeaderboardUserItem({ user, score, authUser, rank }) {
  return (
    <div className='flex items-center justify-between px-6 py-4 hover:bg-indigo-50 transition'>
      <div className='flex items-center gap-4'>
        {rank && (
          <span className='w-6 text-center text-sm font-semibold text-gray-400'>
            #{rank}
          </span>
        )}
        <Avatar name={user.name} src={user.avatar} />
        <p className='font-medium text-gray-800'>
          {authUser.id === user.id ? `${user.name} (you)` : user.name}
        </p>
      </div>
      <p className='text-indigo-600 font-semibold'>{score}</p>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

LeaderboardUserItem.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
  authUser: PropTypes.shape(userShape).isRequired,
  rank: PropTypes.number, // opsional
};

export default LeaderboardUserItem;
