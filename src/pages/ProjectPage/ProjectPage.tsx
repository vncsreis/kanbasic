import { AddIcon } from '@chakra-ui/icons';
import { Box, Grid, GridItem, IconButton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import TaskList from '../../components/content/TaskList';
import { TaskOnList } from '../../components/content/TaskListItem';
import Header from '../../components/layout/Header';
import NewTaskModal from '../../components/modals/NewTaskModal/NewTaskModal';
import {
  jsonToTask,
  ProjectIn,
  taskToJson,
} from '../../content/handleTaskToJson';
import { initProject } from '../../content/tasks';
import capitalizeSentence from '../../utils/capitalizeSentence';
import './ProjectPage.css';

interface Project {
  name: string;
  tasks: {
    todo: TaskOnList[];
    doing: TaskOnList[];
    done: TaskOnList[];
  };
}

export default function ProjectPage() {
  const setDrawerOpen = useOutletContext<() => void>();
  const [isAddTaskOpen, setAddTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const params = useParams();

  function loadFirstProject() {
    const projName = params.project as string;

    const proj = localStorage.getItem(projName.replace('%20', ' '));

    if (proj) {
      const parsedProject: ProjectIn = jsonToTask(JSON.parse(proj));

      return parsedProject;
    }
    return initProject;
  }

  const [project, setProject] = useState<Project>(loadFirstProject());

  function advanceToDoing(task: TaskOnList) {
    const newTodo = project.tasks.todo
      .filter((t) => t.visible)
      .map((t) => {
        if (t.id === task.id) {
          return { ...task, visible: false, animation: true };
        }
        return { ...t, animation: false };
      });
    setProject({
      ...project,
      tasks: {
        ...project.tasks,
        todo: newTodo,
        doing: [
          ...project.tasks.doing,
          { ...task, status: 'doing', animation: true },
        ],
      },
    });
  }

  function advanceToDone(task: TaskOnList) {
    const newDoing = project.tasks.doing
      .filter((t) => t.visible)
      .map((t) => {
        if (t.id === task.id) {
          return { ...task, visible: false, animation: true };
        }
        return { ...t, animation: false };
      });
    setProject({
      ...project,
      tasks: {
        ...project.tasks,
        doing: newDoing,
        done: [
          ...project.tasks.done,
          { ...task, status: 'done', animation: true },
        ],
      },
    });
  }

  function finish(task: TaskOnList) {
    const newDone = project.tasks.done
      .filter((t) => t.visible)
      .map((t) => {
        if (t.id === task.id) {
          return { ...task, visible: false, animation: true };
        }
        return { ...t, animation: false };
      });
    setProject({
      ...project,
      tasks: {
        ...project.tasks,
        done: newDone,
      },
    });
  }

  function handleSubmitModal(e: React.FormEvent) {
    e.preventDefault();

    const newTodo: TaskOnList[] = [
      ...project.tasks.todo.filter((t) => t.visible),
      {
        name: newTask,
        visible: true,
        id: v4(),
        animation: true,
        status: 'todo',
      },
    ];

    setProject({
      ...project,
      tasks: {
        ...project.tasks,
        todo: newTodo,
      },
    });
    setNewTask('');
    setAddTaskOpen(false);
  }

  useEffect(() => {
    const projectToStore = {
      ...project,
      tasks: {
        todo: project.tasks.todo.filter((t) => t.visible),
        doing: project.tasks.doing.filter((t) => t.visible),
        done: project.tasks.done.filter((t) => t.visible),
      },
    };

    localStorage.setItem(
      project.name.toLowerCase(),
      JSON.stringify(taskToJson(projectToStore)),
    );
  }, [project]);

  return (
    <>
      <Header
        title={capitalizeSentence(project.name)}
        setOpen={setDrawerOpen}
      />

      <NewTaskModal
        handleSubmitModal={handleSubmitModal}
        isAddTaskOpen={isAddTaskOpen}
        newTask={newTask}
        setAddTaskOpen={setAddTaskOpen}
        setNewTask={setNewTask}
      />

      <Box py={4} px={4} h="90%" w="100%">
        <Grid templateColumns="repeat(3, 1fr)" h="100%">
          <GridItem
            display="flex"
            flexDir="column"
            borderRightWidth="1px"
            h="100%"
          >
            <TaskList
              name="To Do"
              advance={(task: TaskOnList) => advanceToDoing(task)}
              tasks={project.tasks.todo}
            />
            <IconButton
              mx="auto"
              my="10"
              h="20"
              w="20"
              boxShadow="dark-lg"
              colorScheme="blue"
              rounded="full"
              aria-label="Add Task"
              icon={<AddIcon fontSize="4xl" />}
              onClick={() => setAddTaskOpen(true)}
            />
          </GridItem>

          <GridItem h="100%">
            <TaskList
              name="Doing"
              advance={(task: TaskOnList) => advanceToDone(task)}
              tasks={project.tasks.doing}
            />
          </GridItem>

          <GridItem borderLeftWidth="1px" h="100%">
            <TaskList
              name="Done"
              tasks={project.tasks.done}
              advance={(task: TaskOnList) => finish(task)}
            />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
