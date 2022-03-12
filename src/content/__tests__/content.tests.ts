import { formatToGet, formatToStore } from '../projectFormat';

const testProjectIn = {
  name: 'Test Project',
  tasks: {
    todo: [
      {
        id: 'test1',
        name: 'Test1',
        status: 'todo',
        animation: false,
        visible: true,
      },
    ],
    doing: [
      {
        id: 'test2',
        name: 'Test2',
        status: 'doing',
        animation: false,
        visible: true,
      },
    ],
    done: [
      {
        id: 'test3',
        name: 'Test3',
        status: 'done',
        animation: false,
        visible: true,
      },
    ],
  },
};

const testProjectOut = {
  name: 'Test Project',
  tasks: {
    todo: [
      {
        id: 'test1',
        name: 'Test1',
        status: 'todo',
      },
    ],
    doing: [
      {
        id: 'test2',
        name: 'Test2',
        status: 'doing',
      },
    ],
    done: [
      {
        id: 'test3',
        name: 'Test3',
        status: 'done',
      },
    ],
  },
};

describe('Format to Store tests', () => {
  it('formats project to storable format', () => {
    expect(formatToStore(testProjectIn)).toEqual(testProjectOut);
  });
});

describe('Format to store', () => {
  it('formats project to usable format', () => {
    expect(formatToGet(testProjectOut)).toEqual(testProjectIn);
  });
});
