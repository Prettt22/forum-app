// src/pages/LeaderboardsPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardUserItem from '../components/LeaderboardUserItem';
import Avatar from '../components/Avatar';

function LeaderboardsPage() {
  const { authUser, leaderboards } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  // pisah top3 dan sisanya
  const topThree = leaderboards.slice(0, 3);
  const rest = leaderboards.slice(3);

  return (
    <div className='min-h-screen bg-gray-50 py-10'>
      <div className='max-w-6xl mx-auto px-4 mb-10 text-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
          Klasemen Pengguna Aktif
        </h2>
        <p className='text-gray-500 mt-2'>Top kontributor di komunitas</p>
      </div>

      {/* top 3 */}
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 px-4'>
        {topThree.map((item, idx) => (
          <div
            key={item.user.id}
            className='bg-white rounded-2xl shadow-md p-6 flex flex-col items-center relative hover:-translate-y-1 hover:shadow-lg transition'
          >
            <span className='absolute top-3 left-3 bg-indigo-600 text-white text-sm font-bold px-2 py-0.5 rounded-full'>
              #{idx + 1}
            </span>
            <Avatar
              name={item.user.name}
              src={item.user.avatar}
              size={80}
              className='mb-4 border-4 border-indigo-100'
            />
            <h3 className='text-lg font-semibold text-gray-800'>
              {authUser.id === item.user.id
                ? `${item.user.name} (you)`
                : item.user.name}
            </h3>
            <p className='text-indigo-600 font-medium'>{item.score} pts</p>
          </div>
        ))}
      </div>

      {/* sisanya */}
      <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden'>
        <div className='grid grid-cols-2 px-6 py-3 bg-gray-50 text-gray-500 font-medium'>
          <p>Pengguna</p>
          <p className='text-right'>Skor</p>
        </div>
        <div className='flex flex-col'>
          {rest.map((leaderboard, idx) => (
            <LeaderboardUserItem
              key={leaderboard.user.id}
              {...leaderboard}
              rank={idx + 4} // bisa kirim rank ke komponen juga
              authUser={authUser}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeaderboardsPage;
