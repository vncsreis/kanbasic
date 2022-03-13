import { Button, Flex, Heading, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { OutletContextProps } from '../../App';
import OpenAsideButton from '../../components/layout/OpenAsideButton';
import PageLayout from '../../components/layout/PageLayout';
import BaseModal from '../../components/modals/BaseModal';
import capitalizeSentence from '../../utils/capitalizeSentence';
import './HomePage.css';

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
      <BaseModal
        buttonText="Submit"
        handleSubmitModal={handleSubmitNewProjectModal}
        isModalOpen={context.isNewProjectModalOpen}
        label="New Project Name"
        setModalOpen={context.setNewProjectModalOpen}
        setTextInput={setNewProject}
        textInput={newProject}
        title="Create New Project"
      />
      <header>
        <OpenAsideButton onClick={() => context.openDrawer()} />
      </header>
      <Flex
        mx="auto"
        mt="44"
        flexDir="column"
        alignItems="center"
        height="full"
        overflow="hidden"
      >
        <Heading
          cursor="default"
          fontSize="9xl"
          color="white"
          textDecoration="underline"
          className="home-heading"
        >
          Kanbasic
        </Heading>

        <Button
          fontSize="3xl"
          p="8"
          mt="10"
          colorScheme="blue"
          boxShadow="dark-lg"
          onClick={() => {
            context.setNewProjectModalOpen(true);
          }}
          className="home-button"
        >
          Start
        </Button>
      </Flex>
    </PageLayout>
  );
}
