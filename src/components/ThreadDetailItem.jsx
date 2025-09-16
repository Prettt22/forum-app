import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from 'react-icons/fa';
import { postedAt } from '../utils/index';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { useState } from 'react';
import Avatar from './Avatar';

function ThreadDetailItem({
  upVote,
  downVote,
  neutralizeVote,
  authUserId,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
}) {
  const [upVoteIsActive, setUpVoteSetActive] = useState(
    upVotesBy.includes(authUserId),
  );
  const [downVoteIsActive, setDownVoteSetActive] = useState(
    downVotesBy.includes(authUserId),
  );

  const onUpvoteHandleClick = () => {
    if (upVotesBy.includes(authUserId)) {
      neutralizeVote();
      setUpVoteSetActive(false);
    } else {
      upVote();
      setUpVoteSetActive(true);
      setDownVoteSetActive(false);
    }
  };

  const onDownvoteHandleClick = () => {
    if (downVotesBy.includes(authUserId)) {
      neutralizeVote();
      setDownVoteSetActive(false);
    } else {
      downVote();
      setDownVoteSetActive(true);
      setUpVoteSetActive(false);
    }
  };

  return (
    <article className='bg-white rounded-2xl shadow p-6 space-y-4'>
      <p className='inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium'>
        #{category}
      </p>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <div className='prose max-w-none'>{parse(body)}</div>

      <div className='flex items-center gap-4'>
        <button
          className={`flex items-center gap-1 cursor-pointer active:scale-90 transition-transform ${
            upVoteIsActive ? 'text-indigo-500' : 'text-gray-500'
          }`}
          aria-label='Upvote Button'
          onClick={onUpvoteHandleClick}
        >
          {upVoteIsActive ? <FaThumbsUp /> : <FaRegThumbsUp />}
          <span>{upVotesBy.length}</span>
        </button>
        <button
          className={`flex items-center gap-1 cursor-pointer active:scale-90 transition-transform ${
            downVoteIsActive ? 'text-gray-600' : 'text-gray-500'
          }`}
          aria-label='Downvote Button'
          onClick={onDownvoteHandleClick}
        >
          {downVoteIsActive ? <FaThumbsDown /> : <FaRegThumbsDown />}
          <span>{downVotesBy.length}</span>
        </button>
      </div>

      <div className='flex items-center justify-between pt-4 border-t'>
        <p className='text-sm text-gray-500'>{postedAt(createdAt)}</p>
        <div className='flex items-center gap-2 text-sm'>
          <Avatar src={owner.avatar} alt={owner.name} size={30} />
          <span className='text-gray-700'>
            by <span className='font-medium'>{owner.name}</span>
          </span>
        </div>
      </div>
    </article>
  );
}

ThreadDetailItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};

export default ThreadDetailItem;
