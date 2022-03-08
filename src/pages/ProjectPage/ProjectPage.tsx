import { AddIcon } from '@chakra-ui/icons';
import { Box, Grid, GridItem, IconButton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import TaskList from '../../components/content/TaskList';
import { TaskOnList } from '../../components/content/TaskListItem';
import Header from '../../components/layout/Header';
import NewTaskModal from '../../components/modals/NewTaskModal/NewTaskModal';
import ProjectNameModal from '../../components/modals/ProjectNameModal';
import {
  jsonToTask,
  ProjectIn,
  taskToJson,
} from '../../content/handleTaskToJson';
import { initProject } from '../../content/tasks';
import capitalizeSentence from '../../utils/capitalizeSentence';
import splitProjectTitle from '../../utils/splitProjectTitle';
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
  const [isNewTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [isProjectNameModalOpen, setProjectNameModalOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  function loadFirstProject() {
    const projName = params.project as string;

    const proj = localStorage.getItem(
      `kanbasic-${projName.replace('%20', ' ')}`,
    );

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

  function handleSubmitTaskModal(e: React.FormEvent) {
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
    setNewTaskModalOpen(false);
  }

  function handleSubmitProjectModal(e: React.FormEvent) {
    e.preventDefault();

    setProject({ ...project, name: newProjectName });
    setNewProjectName('');
    setProjectNameModalOpen(false);
    navigate(`/${newProjectName.toLowerCase().replace(' ', '%20')}`);

    localStorage.removeItem(`kanbasic-${project.name.replace('%20', ' ')}`);
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
      `kanbasic-${project.name.replace('%20', ' ')}`,
      JSON.stringify(taskToJson(projectToStore)),
    );
  }, [project]);

  return (
    <>
      <Header
        title={capitalizeSentence(splitProjectTitle(project.name))}
        setDrawerOpen={setDrawerOpen}
        setProjectNameModalOpen={setProjectNameModalOpen}
      />

      <NewTaskModal
        handleSubmitNewTaskModal={handleSubmitTaskModal}
        isNewTaskModalOpen={isNewTaskModalOpen}
        newTask={newTask}
        setNewTaskModalOpen={setNewTaskModalOpen}
        setNewTask={setNewTask}
      />

      <ProjectNameModal
        handleSubmitProjectModal={handleSubmitProjectModal}
        isProjectNameModalOpen={isProjectNameModalOpen}
        setProjectNameModalOpen={setProjectNameModalOpen}
        newProjectName={newProjectName}
        setNewProjectName={setNewProjectName}
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
              onClick={() => setNewTaskModalOpen(true)}
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
