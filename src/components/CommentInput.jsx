import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

function CommentInput({ comment }) {
  const [commentValue, setCommentValue, setValue] = useInput();

  return (
    <div className='bg-white rounded-xl shadow p-4 space-y-3'>
      <h3 className='text-lg font-medium'>Beri Komentar</h3>
      <textarea
        className='w-full min-h-[100px] rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500'
        placeholder='Tulis komentar anda di sini…'
        value={commentValue}
        onChange={setCommentValue}
      />
      <button
        type='button'
        onClick={() => {
          comment({ commentValue });
          setValue('');
        }}
        className='px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer'
      >
        Kirim
      </button>
    </div>
  );
}

CommentInput.propTypes = {
  comment: PropTypes.func.isRequired,
};

export default CommentInput;
