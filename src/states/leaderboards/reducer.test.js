/**
 * test scenario for leaderboardsReducer
 *
 * - leaderboardsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the leaderboards when given by RECEIVE_LEADERBOARDS action
 *
 */

import leaderboardsReducer from './reducer';
import { ActionType } from './action';
import { describe, expect, it } from 'vitest';

describe('leaderboardsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = leaderboardsReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the leaderboards when given by RECEIVE_LEADERBOARDS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards: [
          {
            user: {
              id: 'user-11',
              name: 'Alex Johnson',
              email: 'alex@example.com',
              avatar: 'https://dummy-image-url.jpg',
            },
            score: 42,
          },
          {
            user: {
              id: 'user-12',
              name: 'Emily Stone',
              email: 'emily@example.com',
              avatar: 'https://dummy-image-url.jpg',
            },
            score: 30,
          },
        ],
      },
    };
    // action
    const nextState = leaderboardsReducer(initialState, action);
    // assert
    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
