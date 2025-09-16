import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { useEffect, useRef, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

function Navigation({ authUser, signOut }) {
  const { name, avatar } = authUser;
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();
  const currentPath = location.pathname;

  const menus = [
    { name: 'Home', link: '/' },
    { name: 'Leaderboards', link: '/leaderboards' },
    { name: 'New Thread', link: '/threads/new' },
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className='bg-white shadow-md sticky top-0 z-50 w-full'>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16 items-center'>
          <div className='flex-shrink-0 flex items-center'>
            <Link to='/' className='text-2xl font-bold text-indigo-600'>
              Forum App
            </Link>
          </div>

          <div className='hidden md:flex space-x-6 items-center'>
            {menus.map((menu) => {
              const active = currentPath === menu.link;
              return (
                <Link
                  key={menu.name}
                  to={menu.link}
                  className={`relative pb-1.5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-indigo-600 after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform ${active ? 'after:scale-x-100 text-indigo-600 font-bold' : 'text-gray-700'}`}
                >
                  {menu.name}
                </Link>
              );
            })}
          </div>

          <div className='flex items-center space-x-3 md:hidden'>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen((prev) => !prev);
                setProfileOpen(false);
              }}
              className='text-gray-700 focus:outline-none cursor-pointer'
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
            <div className='relative' ref={profileRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  setProfileOpen((prev) => !prev);
                }}
                className='flex items-center focus:outline-none'
              >
                <Avatar
                  name={name}
                  src={avatar}
                  size={40}
                  className='border-2 border-indigo-500 cursor-pointer'
                />
              </button>
              <div
                className={`
                  absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 transform transition-all duration-200 ease-out origin-top ${profileOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
                `}
              >
                <button
                  onClick={signOut}
                  className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-md cursor-pointer'
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div
            className='hidden md:flex items-center relative'
            ref={profileRef}
          >
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className='flex items-center focus:outline-none'
            >
              <Avatar
                name={name}
                src={avatar}
                size={40}
                className='border-2 border-indigo-500 cursor-pointer'
              />
            </button>
            <div
              className={`
                absolute right-0 mt-23 w-40 bg-white rounded-md shadow-lg border-2 border-gray-200 transform transition-all duration-200 ease-out origin-top ${profileOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
              `}
            >
              <button
                onClick={signOut}
                className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-md cursor-pointer'
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className='md:hidden bg-white shadow-lg' ref={mobileMenuRef}>
          <div className='px-2 pt-2 pb-3 space-y-1'>
            {menus.map((menu) => {
              const active = currentPath === menu.link;
              return (
                <Link
                  key={menu.name}
                  to={menu.link}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    active
                      ? 'text-indigo-600 font-semibold bg-indigo-50'
                      : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                >
                  {menu.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
