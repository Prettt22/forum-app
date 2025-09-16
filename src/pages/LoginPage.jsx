import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/action';
import { asyncPreloadProcess } from '../states/isPreload/action';
import LoginInput from '../components/LoginInput';

function LoginPage() {
  const { authUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  if (authUser) {
    return <Navigate to='/' />;
  }

  return (
    <section className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-2xl p-8'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>
          Welcome Back
        </h2>
        <LoginInput login={onLogin} />

        <p className='text-center text-gray-500 mt-4'>
          Don&apos;t have an account?{' '}
          <Link to='/register' className='text-indigo-600 hover:underline'>
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
