/**
 * skenario test
 *
 * - asyncPreloadProcess thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 */

import api from '../../utils/api';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import { setAuthUserActionCreator } from '../authUser/action';

const fakeAuthUser = {
  id: 'jane_doe',
  name: 'Jane Doe',
  email: 'jane@example.com',
  avatar: 'https://dummy-image-url.jpg',
};

const fakeError = new Error('Ups, something went wrong');

describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;
    delete api._getOwnProfile;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.getOwnProfile = () => Promise.resolve(fakeAuthUser);
    const dispatch = vi.fn();
    // action
    await asyncPreloadProcess()(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeAuthUser),
    );
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // arrange
    api.getOwnProfile = () => Promise.reject(fakeError);
    const dispatch = vi.fn();
    // action
    await asyncPreloadProcess()(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
