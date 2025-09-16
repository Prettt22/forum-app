import ThreadItem from './ThreadItem';
import PropTypes from 'prop-types';

function ThreadsList({
  threads,
  upVote,
  downVote,
  neutralizeVote,
  authUserId,
}) {
  return (
    <div className='mt-4'>
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          authUserId={authUserId}
          upVote={upVote}
          downVote={downVote}
          neutralizeVote={neutralizeVote}
        />
      ))}
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.array.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};

export default ThreadsList;
