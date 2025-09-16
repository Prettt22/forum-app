/**
 * skenario test
 *
 * - asyncSetAuthUser thunk
 *  - should store accessToken in local storage when user login
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncUnsetAuthUser thunk
 *  - accessToken in local storage should be null when user logout
 *  - should dispatch action correctly when user logout
 */

import api from '../../utils/api';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from './action';

const dummyAccessToken = 'dummyAccessToken';

const dummyAuthUser = {
  id: 'jane_doe',
  name: 'Jane Doe',
  email: 'jane@example.com',
  avatar: 'https://dummy-image-url.jpg',
};

const dummyError = new Error('Oops, something bad happened');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;

    delete api._login;
    delete api._getOwnProfile;
  });

  it('should store accessToken in local storage when user login', async () => {
    // Arrange
    const email = 'jane@example.com';
    const password = 'password';
    api.login = () => Promise.resolve(dummyAccessToken);
    api.getOwnProfile = () => Promise.resolve(dummyAuthUser);
    const dispatch = vi.fn();
    // Action
    await asyncSetAuthUser({ email, password })(dispatch);
    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(localStorage.getItem('accessToken')).toBe(dummyAccessToken);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    const email = 'jane@example.com';
    const password = 'password';
    api.login = () => Promise.resolve(dummyAccessToken);
    api.getOwnProfile = () => Promise.resolve(dummyAuthUser);
    const dispatch = vi.fn();
    // action
    await asyncSetAuthUser({ email, password })(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(dummyAuthUser),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    const email = 'jane@example.com';
    const password = 'password';
    api.login = () => Promise.reject(dummyError);
    api.getOwnProfile = () => Promise.reject(dummyError);
    const dispatch = vi.fn();
    window.alert = vi.fn();
    // action
    await asyncSetAuthUser({ email, password })(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(dummyError.message);
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  it('accessToken in local storage should be null when user logout', () => {
    // arrange
    localStorage.setItem('accessToken', dummyAccessToken);
    const dispatch = vi.fn();
    // action
    asyncUnsetAuthUser()(dispatch);
    // assert
    expect(localStorage.getItem('accessToken')).toBe('');
  });

  it('should dispatch action correctly when user logout', () => {
    // arrange
    const dispatch = vi.fn();
    // action
    asyncUnsetAuthUser()(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
  });
});
