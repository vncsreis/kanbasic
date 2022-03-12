import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { TaskOnList } from '../../TaskListItem';
import TaskList from '../TaskList';

const testTasks: TaskOnList[] = [
  {
    animation: false,
    status: 'todo',
    visible: true,
    id: 'task1',
    name: 'Task1',
  },
  {
    animation: false,
    status: 'todo',
    visible: true,
    id: 'task2',
    name: 'Task2',
  },
  {
    animation: false,
    status: 'todo',
    visible: true,
    id: 'task3',
    name: 'Task3',
  },
];

describe('Task List tests', () => {
  const component = (
    <TaskList name="Test List" tasks={testTasks} advance={() => {}} />
  );

  it('renders task list name', () => {
    const name = 'Test List';

    render(component);

    const listName = screen.getByText(name);

    expect(listName).toBeInTheDocument();
  });

  it('renders all the tasks', () => {
    render(component);

    const taskArray = screen.getAllByText(/Task/);

    expect(taskArray).toHaveLength(3);
  });

  it('shows "All done!" text when one hidden task on list', () => {
    render(
      <TaskList
        tasks={[{ ...testTasks[0], visible: false }]}
        name="Test List"
        advance={() => {}}
      />,
    );

    const noTaskText = screen.getByText('All done!');

    expect(noTaskText).toBeInTheDocument();
  });

  it('shows "All done!" after item has been clicked away', () => {
    const testTask = { ...testTasks[0] };

    const { rerender } = render(
      <TaskList
        tasks={[testTask]}
        name="Test List"
        advance={() => {
          testTask.visible = false;
        }}
      />,
    );

    const noTaskTextBefore = screen.queryByText('All done!');

    expect(noTaskTextBefore).toBeNull();

    const button = screen.getByRole('button');

    fireEvent.click(button);

    rerender(
      <TaskList
        tasks={[testTask]}
        name="Test List"
        advance={() => {
          testTask.visible = false;
        }}
      />,
    );

    const noTaskTextAfter = screen.queryByText('All done!');

    expect(noTaskTextAfter).toBeInTheDocument();
  });
});
