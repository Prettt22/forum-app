import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function AddThreadInput({ addThread }) {
  const [title, setTitleChange] = useInput('');
  const [category, setCategoryChange] = useInput('');
  const [body, setBodyChange] = useInput('');

  return (
    <form className='flex flex-col gap-4'>
      <input
        type='text'
        value={title}
        onChange={setTitleChange}
        placeholder='Judul'
        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none'
      />
      <input
        type='text'
        value={category}
        onChange={setCategoryChange}
        placeholder='Kategori'
        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none'
      />
      <textarea
        value={body}
        onChange={setBodyChange}
        placeholder='Isi'
        className='w-full min-h-[150px] px-4 py-2 border border-gray-300 rounded-lg resize-y focus:ring focus:ring-indigo-200 focus:outline-none'
      />
      <button
        type='button'
        onClick={() => addThread({ title, body, category })}
        className='bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition cursor-pointer'
      >
        Buat Diskusi
      </button>
    </form>
  );
}

AddThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default AddThreadInput;
