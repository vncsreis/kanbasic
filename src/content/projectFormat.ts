import { TaskOnList } from '../components/content/TaskListItem/TaskListItem';
import { Task } from './tasks';

export interface ProjectIn {
  name: string;
  tasks: {
    todo: TaskOnList[];
    doing: TaskOnList[];
    done: TaskOnList[];
  };
}

export interface ProjectOut {
  name: string;
  tasks: {
    todo: Task[];
    doing: Task[];
    done: Task[];
  };
}

export function formatToStore(project: ProjectIn) {
  const projectToJson = {
    name: project.name,
    tasks: {
      todo: project.tasks.todo.map((task) => ({
        id: task.id,
        name: task.name,
        status: task.status,
      })),
      doing: project.tasks.doing.map((task) => ({
        id: task.id,
        name: task.name,
        status: task.status,
      })),
      done: project.tasks.done.map((task) => ({
        id: task.id,
        name: task.name,
        status: task.status,
      })),
    },
  };

  return projectToJson;
}

export function formatToGet(project: ProjectOut) {
  const projectToReturn = {
    name: project.name,
    tasks: {
      todo: project.tasks.todo.map((task) => ({
        id: task.id,
        name: task.name,
        status: task.status,
        animation: false,
        visible: true,
      })),
      doing: project.tasks.doing.map((task) => ({
        id: task.id,
        name: task.name,
        status: task.status,
        animation: false,
        visible: true,
      })),
      done: project.tasks.done.map((task) => ({
        id: task.id,
        name: task.name,
        status: task.status,
        animation: false,
        visible: true,
      })),
    },
  };
  return projectToReturn;
}
