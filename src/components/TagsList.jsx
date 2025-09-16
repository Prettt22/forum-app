import TagItem from './TagItem';
import PropTypes from 'prop-types';

function TagsList({ tags, selectedCategory, onCategoryClick }) {
  const uniqueCategory = tags.filter(
    (value, index, self) =>
      index === self.findIndex((tag) => tag.category === value.category),
  );

  return (
    <div className='flex flex-wrap gap-2'>
      {uniqueCategory.map((tag) => (
        <TagItem
          key={tag.id}
          isSelected={selectedCategory === tag.category}
          onCategoryClick={onCategoryClick}
          {...tag}
        />
      ))}
    </div>
  );
}

TagsList.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedCategory: PropTypes.string,
  onCategoryClick: PropTypes.func.isRequired,
};

export default TagsList;
