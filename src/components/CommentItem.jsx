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

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
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

  return (
    <div className='bg-white rounded-xl shadow p-4 space-y-3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Avatar name={owner.name} src={owner.avatar} />
          <div>
            <h4 className='font-medium'>{owner.name}</h4>
            <p className='text-xs text-gray-500'>{postedAt(createdAt)}</p>
          </div>
        </div>
      </div>

      <div className='prose max-w-none'>{parse(content)}</div>

      <div className='flex gap-3'>
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
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};

export default CommentItem;
