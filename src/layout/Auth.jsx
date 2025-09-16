import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import { asyncPreloadProcess } from '../states/isPreload/action';
import Navigation from '../components/Navigation';

export default function Auth() {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const signOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) return null;

  if (!authUser) return <Navigate to='/login' />;

  return (
    <div className='flex flex-col min-h-screen bg-gray-100 text-gray-900'>
      <Navigation authUser={authUser} signOut={signOut} />
      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  );
}
