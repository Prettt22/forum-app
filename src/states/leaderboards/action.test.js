/**
 * skenario test
 *
 * - asyncReceiveLeaderboards thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import api from '../../utils/api';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  asyncReceiveLeaderboards,
  receiveLeaderboardsActionCreator,
} from './action';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';

const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'user-11',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      avatar: 'https://dummy-image-url.jpg',
    },
    score: 20,
  },
  {
    user: {
      id: 'user-12',
      name: 'Emily Stone',
      email: 'emily@example.com',
      avatar: 'https://dummy-image-url.jpg',
    },
    score: 15,
  },
];

const fakeErrorResponse = new Error('Ups, terjadi kesalahan');

describe('asyncReceiveLeaderboards thunk', () => {
  beforeEach(() => {
    // backup api asli
    api._seeLeaderboards = api.seeLeaderboards;
  });

  afterEach(() => {
    // restore api asli
    api.seeLeaderboards = api._seeLeaderboards;
    // hapus backup
    delete api._seeLeaderboards;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.seeLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);
    const dispatch = vi.fn();
    // action
    await asyncReceiveLeaderboards()(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.seeLeaderboards = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();
    // action
    await asyncReceiveLeaderboards()(dispatch);
    // assert
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
