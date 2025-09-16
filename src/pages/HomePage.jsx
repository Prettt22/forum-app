import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncNeutralizeThreadVote,
  asyncToggleDownVoteThread,
  asyncToggleUpVoteThread,
} from '../states/threads/action';
import asyncPopulateThreadAndUsers from '../states/shared/action';
import TagsList from '../components/TagsList';
import ThreadsList from '../components/ThreadsList';

function Homepage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateThreadAndUsers());
  }, [dispatch]);

  const tagsList = threads.map((thread) => ({
    id: thread.id,
    category: thread.category,
  }));

  const filteredThreads = selectedCategory
    ? threads.filter((thread) => thread.category === selectedCategory)
    : threads;

  const threadList = filteredThreads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const onUpvoteThread = (threadId) => {
    dispatch(asyncToggleUpVoteThread(threadId));
  };

  const onDownVoteThread = (threadId) => {
    dispatch(asyncToggleDownVoteThread(threadId));
  };

  const onNeutralizeVoteThread = (threadId) => {
    dispatch(asyncNeutralizeThreadVote(threadId));
  };

  return (
    <section className='max-w-4xl mx-auto px-4 py-6'>
      <h2 className='text-xl font-semibold mb-4'>Kategori Populer</h2>
      <TagsList
        tags={tagsList}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />

      <h2 className='text-xl font-semibold mt-8 mb-4'>Diskusi Tersedia</h2>
      <ThreadsList
        threads={threadList}
        authUserId={authUser.id}
        upVote={onUpvoteThread}
        downVote={onDownVoteThread}
        neutralizeVote={onNeutralizeVoteThread}
      />
    </section>
  );
}

export default Homepage;
