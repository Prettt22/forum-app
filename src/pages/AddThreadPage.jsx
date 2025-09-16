import AddThreadInput from '../components/AddThreadInput';
import { useDispatch } from 'react-redux';
import { asyncAddThread } from '../states/threads/action';
import { useNavigate } from 'react-router-dom';

function AddThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCreate = ({ title, body, category }) => {
    const successCallback = () => {
      navigate('/');
    };
    dispatch(asyncAddThread({ title, body, category, successCallback }));
  };

  return (
    <div className='max-w-3xl mx-auto my-8 bg-white rounded-2xl shadow p-6'>
      <h2 className='text-2xl font-semibold text-center mb-6'>
        Buat Diskusi Baru
      </h2>
      <AddThreadInput addThread={onCreate} />
    </div>
  );
}

export default AddThreadPage;