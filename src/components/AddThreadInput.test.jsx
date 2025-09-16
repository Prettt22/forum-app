/**
 * skenario testing
 *
 * - AddThreadInput component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 *   - should call addThread function when addThread button is clicked
 */

import * as matchers from '@testing-library/jest-dom/matchers';
import AddThreadInput from './AddThreadInput';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

expect.extend(matchers);

describe('AddThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // arrange
    render(<AddThreadInput addThread={() => {}} />);
    const titleInput = await screen.getByPlaceholderText('Judul');
    // action
    await userEvent.type(titleInput, 'inijudul');
    // assert
    expect(titleInput).toHaveValue('inijudul');
  });

  it('should handle category typing correctly', async () => {
    // arrange
    render(<AddThreadInput addThread={() => {}} />);
    const categoryInput = await screen.getByPlaceholderText('Kategori');
    // action
    await userEvent.type(categoryInput, 'inikategori');
    // assert
    expect(categoryInput).toHaveValue('inikategori');
  });

  it('should handle body typing correctly', async () => {
    // arrange
    render(<AddThreadInput addThread={() => {}} />);
    const bodyInput = await screen.getByPlaceholderText('Isi');
    // action
    await userEvent.type(bodyInput, 'iniisi');
    // assert
    expect(bodyInput).toHaveValue('iniisi');
  });

  it('should call addThread function when addThread button is clicked', async () => {
    // arrange
    const mockAddThread = vi.fn();
    render(<AddThreadInput addThread={mockAddThread} />);
    const titleInput = await screen.getByPlaceholderText('Judul');
    await userEvent.type(titleInput, 'inijudul');
    const categoryInput = await screen.getByPlaceholderText('Kategori');
    await userEvent.type(categoryInput, 'inikategori');
    const bodyInput = await screen.getByPlaceholderText('Isi');
    await userEvent.type(bodyInput, 'iniisi');
    const addThreadButton = await screen.getByRole('button', { name: 'Buat Diskusi' });
    // action
    await userEvent.click(addThreadButton);
    // assert
    expect(mockAddThread).toBeCalledWith({
      title: 'inijudul',
      body: 'iniisi',
      category: 'inikategori',
    });
  });
});
