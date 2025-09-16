/**
 * skenario testing
 *
 * - CommentInput component
 *   - should handle comment typing correctly
 *   - should call comment function when comment button is clicked
 */

import * as matchers from '@testing-library/jest-dom/matchers';
import CommentInput from './CommentInput';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

expect.extend(matchers);

describe('CommentInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle comment typing correctly', async () => {
    // arrange
    render(<CommentInput comment={() => {}} />);
    const commentInput = await screen.getByRole('textbox');
    // action
    await userEvent.type(commentInput, 'inikomentar');
    // assert
    expect(commentInput).toHaveValue('inikomentar');
  });

  it('should call comment function when comment button is clicked', async () => {
    // arrange
    const comment = vi.fn();
    render(<CommentInput comment={comment} />);
    const commentInput = await screen.getByRole('textbox');
    await userEvent.type(commentInput, 'inikomentar');
    const commentButton = await screen.getByRole('button', { name: 'Kirim' });
    // action
    await userEvent.click(commentButton);
    // assert
    expect(comment).toBeCalledWith({
      commentValue: 'inikomentar',
    });
  });
});
