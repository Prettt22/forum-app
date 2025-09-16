/**
 * test scenario for authUserReducer
 *
 * - authUserReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the authUser when given by SET_AUTH_USER action
 *  - should return null value when given UNSET_AUTH_USER action
 *
 */

import authUserReducer from './reducer';
import { ActionType } from './action';
import { describe, expect, it } from 'vitest';

describe('authUserReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrage
    const initialState = null;
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = authUserReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the authUser when given by SET_AUTH_USER action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: {
          id: 'jane_doe',
          name: 'Jane Doe',
          email: 'jane@example.com',
          avatar: 'https://dummy-image-url.jpg',
        },
      },
    };
    // action
    const nextState = authUserReducer(initialState, action);
    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  it('should return null value when given UNSET_AUTH_USER action', () => {
    // arrange
    const initialState = {
      id: 'jane_doe',
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatar: 'https://dummy-image-url.jpg',
    };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };
    // action
    const nextState = authUserReducer(initialState, action);
    // assert
    expect(nextState).toBeNull();
  });
});
