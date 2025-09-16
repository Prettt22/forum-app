import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../states/users/action';
import RegisterInput from '../components/RegisterInput';

function RegisterPage() {
  const { authUser } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    const successCallback = () => {
      navigate('/');
    };
    dispatch(asyncRegisterUser({ name, email, password, successCallback }));
  };

  if (authUser) {
    return <Navigate to='/' />;
  }

  return (
    <section className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-2xl p-8'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>
          Create Your Account
        </h2>
        <RegisterInput register={onRegister} />

        <p className='text-center text-gray-500 mt-4'>
          Already have an account?{' '}
          <Link to='/' className='text-indigo-600 hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
