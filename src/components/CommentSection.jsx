import CommentInput from './CommentInput';
import CommentList from './CommentList';
import PropTypes from 'prop-types';

function CommentSection({
  comments,
  comment,
  upVote,
  downVote,
  neutralizeVote,
  authUserId,
}) {
  return (
    <section className='space-y-6'>
      <CommentInput comment={comment} />
      <h3 className='text-lg font-semibold'>
        Komentar <span className='text-gray-500'>({comments.length})</span>
      </h3>
      <CommentList
        commentList={comments}
        upVote={upVote}
        downVote={downVote}
        neutralizeVote={neutralizeVote}
        authUserId={authUserId}
      />
    </section>
  );
}

CommentSection.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
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
  comment: PropTypes.func.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};

export default CommentSection;
