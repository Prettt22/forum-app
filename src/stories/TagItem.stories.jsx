import TagItem from '../components/TagItem';

export default {
  title: 'Components/TagItem',
  component: TagItem,
};

const Template = (args) => <TagItem {...args} />;

const handleCategoryClick = (category) => {
  alert(`Category clicked: ${category}`);
};

export const Default = Template.bind({});
Default.args = {
  category: 'React',
  isSelected: false,
  onCategoryClick: handleCategoryClick,
};

export const Selected = Template.bind({});
Selected.args = {
  category: 'Nodejs',
  isSelected: true,
  onCategoryClick: handleCategoryClick,
};
