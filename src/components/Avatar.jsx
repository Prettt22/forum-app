import PropTypes from 'prop-types';

function Avatar({ src, name, size = 48, className = '' }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`rounded-full object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }
  const initials = (name || '?')
    .split(' ')
    .map((s) => s[0] || '')
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <div
      className='rounded-full bg-gray-300 text-gray-800 font-semibold flex items-center justify-center'
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default Avatar;
