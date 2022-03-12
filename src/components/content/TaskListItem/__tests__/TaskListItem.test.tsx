import { List } from '@chakra-ui/react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import TaskListItem, { TaskOnList } from '..';

// eslint-disable-next-line import/prefer-default-export
export function appendStyle(container: HTMLElement, pathToFile: string) {
  // get App.css file and append to document, so classes are effectively applied
  const cssFile = fs.readFileSync(path.resolve(__dirname, pathToFile), 'utf-8');
  const style = document.createElement('style');

  style.innerHTML = cssFile;
  container.append(style);
}

jest.mock('@chakra-ui/icons', () => ({
  __esmodule: true,
  ...jest.requireActual('@chakra-ui/icons'),
  ArrowForwardIcon: () => <div>Forward</div>,
  CheckIcon: () => <div>Check</div>,
  CheckCircleIcon: () => <div>CheckCircle</div>,
  WarningIcon: () => <div>Warning</div>,
  QuestionIcon: () => <div>Question</div>,
}));

describe('Task List tests', () => {
  const testTask: TaskOnList = {
    animation: true,
    id: 'test-task',
    name: 'Test',
    status: 'doing',
    visible: true,
  };

  const testTaskArray: TaskOnList[] = [
    {
      animation: true,
      id: 'test-task1',
      name: 'Test',
      status: 'todo',
      visible: true,
    },
    {
      animation: true,
      id: 'test-task2',
      name: 'Test',
      status: 'doing',
      visible: true,
    },
    {
      animation: true,
      id: 'test-task3',
      name: 'Test',
      status: 'done',
      visible: true,
    },
  ];

  it('renders task text correctly', () => {
    render(
      <List>
        <TaskListItem task={testTask} advance={() => {}} />
      </List>,
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('does not show hidden tasks', () => {
    const view = render(
      <List>
        <TaskListItem
          task={{ ...testTask, visible: false }}
          advance={() => {}}
        />
      </List>,
    );

    appendStyle(
      view.container,
      '../../../../pages/ProjectPage/ProjectPage.css',
    );

    const text = screen.getByText('Test');

    expect(text).not.toBeVisible();
  });

  it('calls advance function when clicked', () => {
    const spy = jest.fn();

    render(
      <List>
        <TaskListItem task={testTask} advance={spy} />
      </List>,
    );

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(spy).toHaveBeenCalled();
  });

  it('renders buttons correctly', () => {
    render(
      <List>
        {testTaskArray.map((task) => (
          <TaskListItem key={task.id} task={task} advance={() => {}} />
        ))}
      </List>,
    );

    const arrowForwardArray = screen.getAllByText('Forward');

    const checkArray = screen.getAllByText('Check');

    expect(arrowForwardArray).toHaveLength(2);

    expect(checkArray).toHaveLength(1);
  });

  it('renders icons correctly', () => {
    render(
      <List>
        {testTaskArray.map((task) => (
          <TaskListItem key={task.id} task={task} advance={() => {}} />
        ))}
      </List>,
    );

    const warning = screen.getByText('Warning');
    const question = screen.getByText('Question');
    const checkCircle = screen.getByText('CheckCircle');

    expect(warning).toBeDefined();
    expect(question).toBeDefined();
    expect(checkCircle).toBeDefined();
  });
});
