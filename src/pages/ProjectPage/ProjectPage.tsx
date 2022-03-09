import { AddIcon } from '@chakra-ui/icons';
import { Box, Grid, GridItem, IconButton, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { OutletContextProps } from '../../App';
import TaskList from '../../components/content/TaskList';
import { TaskOnList } from '../../components/content/TaskListItem';
import Header from '../../components/layout/Header';
import NewProjectModal from '../../components/modals/NewProjectModal';
import NewTaskModal from '../../components/modals/NewTaskModal';
import ProjectNameModal from '../../components/modals/ProjectNameModal';
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
  const context = useOutletContext<OutletContextProps>();
  const [isNewTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [isProjectNameModalOpen, setProjectNameModalOpen] = useState(false);
  const [newProject, setNewProject] = useState('');
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  function loadProject(project: string) {
    const proj = localStorage.getItem(
      `kanbasic-${project.replace('%20', ' ')}`,
    );

    if (proj) {
      const parsedProject: ProjectIn = jsonToTask(JSON.parse(proj));

      return parsedProject;
    }
    return initProject;
  }

  const [project, setProject] = useState<Project>(
    loadProject(params.project ?? 'new project'),
  );

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

    if (newTask !== '') {
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
    } else {
      toast({
        title: 'Invalid task',
        description: "Task can't be empty",
        status: 'error',
        position: 'top',
        duration: 4000,
      });
    }
  }

  function handleSubmitProjectModal(e: React.FormEvent) {
    e.preventDefault();
    if (newProjectName !== '' && newProjectName.indexOf('/') === -1) {
      setProject({ ...project, name: newProjectName });
      setNewProjectName('');
      setProjectNameModalOpen(false);
      navigate(`/${newProjectName.toLowerCase().replace(' ', '%20')}`);

      localStorage.removeItem(
        `kanbasic-${project.name.toLowerCase().replace('%20', ' ')}`,
      );
    } else {
      toast({
        title: 'Invalid input',
        description: 'Name must contain 1 or more characters and no "/"',
        status: 'error',
        position: 'top',
        duration: 4000,
      });
    }
  }

  function handleSubmitNewProjectModal(e: React.FormEvent) {
    e.preventDefault();

    if (newProject !== '' && newProject.indexOf('/') === -1) {
      localStorage.setItem(
        `kanbasic-${newProject.toLowerCase()}`,
        JSON.stringify({
          name: capitalizeSentence(newProject),
          tasks: {
            todo: [],
            doing: [],
            done: [],
          },
        }),
      );
      context.setNewProjectModalOpen(false);
      setNewProject('');
      navigate(`/${newProject.toLowerCase()}`);
    } else {
      toast({
        title: 'Invalid input',
        description: 'Name must contain 1 or more characters and no "/"',
        status: 'error',
        position: 'top',
        duration: 4000,
      });
    }
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
      `kanbasic-${project.name.toLowerCase().replace('%20', ' ')}`,
      JSON.stringify(taskToJson(projectToStore)),
    );
  }, [project]);

  useEffect(() => {
    context.setProjectsChanged();
  }, [project.name]);

  useEffect(() => {
    setProject(loadProject(params.project ?? 'new project'));
  }, [params.project]);

  return (
    <>
      <Header
        title={capitalizeSentence(project.name)}
        setDrawerOpen={context.openDrawer}
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

      <NewProjectModal
        handleSubmitNewProjectModal={handleSubmitNewProjectModal}
        isNewProjectModalOpen={context.isNewProjectModalOpen}
        newProject={newProject}
        setNewProject={setNewProject}
        setNewProjectModalOpen={context.setNewProjectModalOpen}
      />

      <Box as="main" py={4} px={4} h="90%" w="100%">
        <Grid templateColumns="repeat(3, 1fr)" h="100%">
          <GridItem
            as="section"
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

          <GridItem h="100%" as="section">
            <TaskList
              name="Doing"
              advance={(task: TaskOnList) => advanceToDone(task)}
              tasks={project.tasks.doing}
            />
          </GridItem>

          <GridItem borderLeftWidth="1px" h="100%" as="section">
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
