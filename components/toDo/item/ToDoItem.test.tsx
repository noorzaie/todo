import React from 'react';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToDoItemComponent from './ToDoItemComponent';

afterEach(() => {
  cleanup();
});

const mockCallback = jest.fn();

const baseProps = {
  title: 'task 1',
  description: 'task description',
  editing: false,
  onEdit: mockCallback,
  onCancelEdit: mockCallback,
  onDelete: mockCallback,
  onEnableEdit: mockCallback
};

describe('Test ToDoItemComponent functionality', () => {
  test('Should render title and description texts', () => {
    const { getByRole } = render(<ToDoItemComponent
      {...baseProps}
    />);

    expect(getByRole('title').textContent).toBe('task 1');
    expect(getByRole('description').textContent).toBe('task description');
  });

  test('Should render inputs in edit mode', () => {
    const { getByLabelText } = render(<ToDoItemComponent
      {...baseProps}
      editing={true}
    />);

    expect(getByLabelText('Title')).toBeInTheDocument();
    expect(getByLabelText('Description')).toBeInTheDocument();
  });

  test('Should trigger click events', () => {
    const { rerender, getByRole } = render(<ToDoItemComponent
      {...baseProps}
      editing={true}
    />);

    fireEvent.click(getByRole('editButton'));
    expect(mockCallback).toBeCalledTimes(1);

    fireEvent.click(getByRole('cancelEditButton'));
    expect(mockCallback).toBeCalledTimes(2);

    // Disable edit mode
    rerender(<ToDoItemComponent
      {...baseProps}
      editing={false}
    />);
    fireEvent.click(getByRole('enableEditButton'));
    expect(mockCallback).toBeCalledTimes(3);
    fireEvent.click(getByRole('deleteButton'));
    expect(mockCallback).toBeCalledTimes(4);
  });

  test('Should return title and description when press edit button', () => {
    const onEditMock = jest.fn((title: string, description: string) => ({ title, description }));
    const { getByLabelText, getByRole } = render(<ToDoItemComponent
      {...baseProps}
      editing={true}
      onEdit={onEditMock}
    />);

    const titleInput = getByLabelText('Title');
    const descriptionInput = getByLabelText('Description');
    fireEvent.change(titleInput, { target: { value: 'Edited title' } });
    fireEvent.change(descriptionInput, { target: { value: 'Edited description' } });

    fireEvent.click(getByRole('editButton'));
    expect(onEditMock.mock.results[0].value).toEqual({ title: 'Edited title', description: 'Edited description' });
  });
});
