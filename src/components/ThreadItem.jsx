import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
  FaRegComment,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { postedAt } from '../utils';
import parse from 'html-react-parser';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  user,
  upVotesBy,
  downVotesBy,
  totalComments,
  upVote,
  downVote,
  neutralizeVote,
  authUserId,
}) {
  const [upVoteIsActive, setUpVoteSetActive] = useState(
    upVotesBy.includes(authUserId),
  );
  const [downVoteIsActive, setDownVoteSetActive] = useState(
    downVotesBy.includes(authUserId),
  );

  const navigate = useNavigate();

  const onUpvoteHandleClick = () => {
    if (upVotesBy.includes(authUserId)) {
      neutralizeVote(id);
      setUpVoteSetActive(false);
    } else {
      upVote(id);
      setUpVoteSetActive(true);
      setDownVoteSetActive(false);
    }
  };

  const onDownvoteHandleClick = () => {
    if (downVotesBy.includes(authUserId)) {
      neutralizeVote(id);
      setDownVoteSetActive(false);
    } else {
      downVote(id);
      setDownVoteSetActive(true);
      setUpVoteSetActive(false);
    }
  };

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  return (
    <div className='bg-white shadow rounded-lg p-4 mb-4 hover:shadow-md hover:-translate-y-0.5 transition'>
      <div className='flex items-center justify-between mb-2'>
        <p className='inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium'>
          #{category}
        </p>
        <p className='text-xs text-gray-500'>{postedAt(createdAt)}</p>
      </div>
      <button
        onClick={onThreadClick}
        className='text-lg font-semibold text-left hover:underline text-gray-800 mb-2 cursor-pointer'
      >
        {title}
      </button>
      <div className='max-w-none mb-3 text-gray-700 line-clamp-4'>{parse(body)}</div>
      <div className='flex items-center justify-between text-sm text-gray-600'>
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
          <div className='flex items-center gap-1 text-gray-500'>
            <FaRegComment />
            <span>{totalComments}</span>
          </div>
        </div>
        <div className='text-xs text-gray-500'>Dibuat oleh {user.name}</div>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};

export default ThreadItem;
