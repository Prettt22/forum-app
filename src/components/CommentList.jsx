import CommentItem from './CommentItem';
import PropTypes from 'prop-types';

function CommentList({
  commentList,
  upVote,
  downVote,
  neutralizeVote,
  authUserId,
}) {
  return (
    <div className='flex flex-col gap-4'>
      {commentList.map((comment) => (
        <CommentItem
          key={comment.id}
          upVote={upVote}
          downVote={downVote}
          neutralizeVote={neutralizeVote}
          authUserId={authUserId}
          {...comment}
        />
      ))}
    </div>
  );
}

CommentList.propTypes = {
  commentList: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};

export default CommentList;
