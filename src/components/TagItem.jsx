import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function TagItem({ category, isSelected, onCategoryClick }) {
  const [isActive, setIsActive] = useState(isSelected);

  useEffect(() => {
    setIsActive(isSelected);
  }, [isSelected]);

  const handleClick = () => {
    setIsActive(!isActive);
    onCategoryClick(category);
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className={`px-4 pb-1 rounded-full cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition font-semibold ${
        isActive
          ? 'bg-indigo-600 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
          : 'bg-white text-indigo-500 hover:bg-indigo-50 border-2 border-indigo-500'
      }`}
    >
      #{category}
    </button>
  );
}

TagItem.propTypes = {
  category: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onCategoryClick: PropTypes.func.isRequired,
};

export default TagItem;
