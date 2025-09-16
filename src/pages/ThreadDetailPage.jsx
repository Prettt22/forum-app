import ThreadDetailItem from '../components/ThreadDetailItem';
import CommentSection from '../components/CommentSection';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  asyncAddThreadComment,
  asyncNeutralizeVoteComment,
  asyncReceiveThreadDetail,
  asyncToggleDownVoteComment,
  asyncToggleUpVoteComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncNeutralizeThreadDetailVote,
} from '../states/threadDetail/action';
import { useParams } from 'react-router-dom';

function ThreadDetailPage() {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onComment = ({ commentValue }) => {
    dispatch(asyncAddThreadComment({ threadId: id, commentValue }));
  };

  const onUpvoteThread = () => {
    dispatch(asyncToggleUpVoteThreadDetail(id));
  };

  const onDownVoteThread = () => {
    dispatch(asyncToggleDownVoteThreadDetail(id));
  };

  const onNeutralizeVoteThread = () => {
    dispatch(asyncNeutralizeThreadDetailVote(id));
  };

  const onUpvoteComment = (commentId) => {
    dispatch(asyncToggleUpVoteComment({ threadId: id, commentId }));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncToggleDownVoteComment({ threadId: id, commentId }));
  };

  const onNeutralizeVoteComment = (commentId) => {
    dispatch(asyncNeutralizeVoteComment({ threadId: id, commentId }));
  };

  if (!threadDetail) return null;

  return (
    <div className='max-w-4xl mx-auto px-4 py-6 space-y-8'>
      <ThreadDetailItem
        upVote={onUpvoteThread}
        downVote={onDownVoteThread}
        neutralizeVote={onNeutralizeVoteThread}
        authUserId={authUser.id}
        {...threadDetail}
      />
      <CommentSection
        comment={onComment}
        upVote={onUpvoteComment}
        downVote={onDownVoteComment}
        neutralizeVote={onNeutralizeVoteComment}
        authUserId={authUser.id}
        {...threadDetail}
      />
    </div>
  );
}

export default ThreadDetailPage;
