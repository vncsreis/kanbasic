import { Button, Flex, Heading, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { OutletContextProps } from '../../App';
import OpenAsideButton from '../../components/layout/OpenAsideButton';
import PageLayout from '../../components/layout/PageLayout';
import NewProjectModal from '../../components/modals/NewProjectModal';
import capitalizeSentence from '../../utils/capitalizeSentence';

export default function HomePage() {
  const context = useOutletContext<OutletContextProps>();
  const [newProject, setNewProject] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

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

  return (
    <PageLayout>
      <NewProjectModal
        handleSubmitNewProjectModal={handleSubmitNewProjectModal}
        isNewProjectModalOpen={context.isNewProjectModalOpen}
        newProject={newProject}
        setNewProject={setNewProject}
        setNewProjectModalOpen={context.setNewProjectModalOpen}
      />
      <header>
        <OpenAsideButton onClick={() => context.openDrawer()} />
      </header>
      <Flex mx="auto" mt="44" flexDir="column" alignItems="center">
        <Heading
          cursor="default"
          fontSize="9xl"
          color="white"
          textDecoration="underline"
        >
          Kanbasic
        </Heading>

        <Link to="/new project">
          <Button
            fontSize="3xl"
            p="8"
            mt="10"
            colorScheme="blue"
            boxShadow="dark-lg"
          >
            Start
          </Button>
        </Link>
      </Flex>
    </PageLayout>
  );
}
