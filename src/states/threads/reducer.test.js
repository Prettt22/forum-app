/**
 * test scenario for threadsReducer
 *
 * - threadsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_THREADS action
 *  - should return the threads with the new thread when given by ADD_THREAD action
 *  - should return the threads with the toggled upvote thread when given by UPVOTE_THREAD action
 *  - should return the threads with the toggled downvote thread when given by DOWNVOTE_THREAD action
 *  - should return the threads with the clear upvote and downvote thread when given by NEUTRALIZE_THREAD_VOTE action
 */

import { ActionType } from './action';
import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2025-09-01T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };
    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2025-09-01T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2025-09-01T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };
    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return the threads with the toggled upvote thread when given by UPVOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2025-09-01T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-2'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.UPVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };
    // upvote
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [...initialState[0].upVotesBy, action.payload.userId],
      },
    ]);
    // un-upvote
    const nextState2 = threadsReducer(nextState, action);

    expect(nextState2).toEqual(initialState);
  });

  it('should return the threads with the toggled downvote thread when given by DOWNVOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2025-09-01T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: ['users-2'],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.DOWNVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };
    // downvote
    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [...initialState[0].downVotesBy, action.payload.userId],
      },
    ]);
    // un-downvote
    const nextState2 = threadsReducer(nextState, action);

    expect(nextState2).toEqual(initialState);
  });

  it('should return the threads with the clear upvote and downvote thread when given by NEUTRALIZE_THREAD_VOTE action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2025-09-01T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-1', 'users-2'],
        downVotesBy: ['users-1', 'users-3'],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.NEUTRALIZE_THREAD_VOTE,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };
    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: initialState[0].upVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
        downVotesBy: initialState[0].downVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      },
    ]);
  });
});
