import { v4 } from 'uuid';

export interface Task {
  name: string;
  status: string;
  id: string;
}

export const initProject = {
  name: 'New Project',
  tasks: {
    todo: [],
    doing: [],
    done: [],
  },
};

export const initProject1 = {
  name: 'Project 1',
  tasks: {
    todo: [
      {
        name: '1',
        status: 'todo',
        id: v4(),
        animation: false,
        visible: true,
      },
      {
        name: '2',
        status: 'todo',
        id: v4(),
        animation: false,
        visible: true,
      },
    ],
    doing: [
      {
        name: '3',
        status: 'doing',
        id: v4(),
        animation: false,
        visible: true,
      },
      {
        name: '4',
        status: 'doing',
        id: v4(),
        animation: false,
        visible: true,
      },
    ],
    done: [
      {
        name: '5',
        status: 'done',
        id: v4(),
        animation: false,
        visible: true,
      },
    ],
  },
};

// export const taskArray: Task[] = [
//   {
//     name: 'write something',
//     status: 'todo',
//     id: v4(),
//   },
//   {
//     name: 'write something else',
//     status: 'doing',
//     id: v4(),
//   },
//   // {
//   //   name: 'draw',
//   //   status: 'done',
//   //   id: 10,
//   // },
//   // {
//   //   name: 'eat',
//   //   status: 'todo',
//   //   id: 11,
//   // },
//   // {
//   //   name: 'sleep',
//   //   status: 'doing',
//   //   id: 12,
//   // },
//   // {
//   //   name: 'sell',
//   //   status: 'done',
//   //   id: 13,
//   // },
//   // {
//   //   name: 'document',
//   //   status: 'todo',
//   //   id: 15,
//   // },
//   // {
//   //   name: 'code',
//   //   status: 'doing',
//   //   id: 16,
//   // },
//   // {
//   //   name: 'test',
//   //   status: 'done',
//   //   id: 17,
//   // },
//   // {
//   //   name: 'build component unit test suite',
//   //   status: 'todo',
//   //   id: 18,
//   // },
//   // {
//   //   name: 'blabla',
//   //   status: 'doing',
//   //   id: 19,
//   // },
//   // {
//   //   name: 'irra',
//   //   status: 'doing',
//   //   id: 20,
//   // },
//   {
//     name: 'irra',
//     status: 'todo',
//     id: v4(),
//   },
//   {
//     name: 'irra',
//     status: 'todo',
//     id: v4(),
//   },
//   {
//     name: 'irra',
//     status: 'doing',
//     id: v4(),
//   },
//   {
//     name: 'irra',
//     status: 'doing',
//     id: v4(),
//   },
//   {
//     name: 'okokokokoko',
//     status: 'todo',
//     id: v4(),
//   },
//   {
//     name: 'eh',
//     status: 'doing',
//     id: v4(),
//   },
//   {
//     name: 'wirte something else else',
//     status: 'todo',
//     id: v4(),
//   },
// ];
