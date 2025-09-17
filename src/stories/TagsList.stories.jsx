import TagsList from '../components/TagsList';
import { useState } from 'react';

export default {
  title: 'Components/TagsList',
  component: TagsList,
};

const sampleTags = [
  { id: '1', category: 'React' },
  { id: '2', category: 'Nextjs' },
  { id: '3', category: 'Nodejs' },
  { id: '4', category: 'Tailwindcss' },
];

export const Default = () => {
  const [selectedCategory, setSelectedCategory] = useState('Technology');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    console.log('Category clicked:', category);
  };

  return (
    <TagsList
      tags={sampleTags}
      selectedCategory={selectedCategory}
      onCategoryClick={handleCategoryClick}
    />
  );
};