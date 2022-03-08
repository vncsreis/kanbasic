import { DeleteIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  IconButton,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import capitalizeSentence from '../../utils/capitalizeSentence';
import splitProjectTitle from '../../utils/splitProjectTitle';

interface AsideProps {
  isOpen: boolean;
  setOpen: (newVal: boolean) => void;
  projects: string[];
  setProjectsChanged: () => void;
  openNewProjectModal: () => void;
}

export default function Aside({
  isOpen,
  setOpen,
  projects,
  setProjectsChanged,
  openNewProjectModal,
}: AsideProps) {
  const params = useParams();
  const navigate = useNavigate();

  function deleteProject(project: string) {
    localStorage.removeItem(`kanbasic-${project.toLowerCase()}`);
    setProjectsChanged();

    if (
      params.project === project.toLowerCase() &&
      Object.keys(localStorage).length > 0
    ) {
      navigate(splitProjectTitle(Object.keys(localStorage)[0]));
    }

    if (Object.keys(localStorage).length === 0) {
      navigate('new project');
    }
  }

  return (
    <Drawer
      placement="left"
      isOpen={isOpen}
      onClose={() => {}}
      preserveScrollBarGap
      onEsc={() => setOpen(false)}
      onOverlayClick={() => setOpen(false)}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            display="flex"
            justifyContent="space-between"
          >
            <Heading size="lg" cursor="default">
              Menu
            </Heading>
            <Button
              variant="solid"
              colorScheme="red"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </DrawerHeader>
          <List
            width="100%"
            display="flex"
            flexDir="column"
            alignItems="center"
          >
            <ListItem w="100%">
              <Accordion allowToggle>
                <AccordionItem border="none">
                  <AccordionButton boxShadow="md">
                    <Text fontSize="xl" mr="auto">
                      My Projects
                    </Text>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel
                    borderTopWidth="1px"
                    // borderBottomWidth="1px"
                    m="0"
                    p="0"
                  >
                    <List boxShadow="xs">
                      {projects.map((p) => (
                        <ListItem
                          w="100%"
                          h="100%"
                          backgroundColor="#eee"
                          pt={2}
                          pb={2}
                          key={p}
                          display="flex"
                          alignItems="center"
                          _hover={{ backgroundColor: '#ddd' }}
                          transition="ease-in-out background-color .25s"
                          cursor="pointer"
                        >
                          <Text
                            as="a"
                            href={`/${p}`}
                            display="flex"
                            flexGrow={1}
                            pl={8}
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              navigate(`/${p}`);
                            }}
                          >
                            {capitalizeSentence(p)}
                          </Text>
                          <IconButton
                            _hover={{ backgroundColor: 'transparent' }}
                            backgroundColor="transparent"
                            mr={2}
                            aria-label="Delete project"
                            icon={<DeleteIcon />}
                            onClick={() => deleteProject(p)}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Box p={2} display="flex" w="100%">
                      <Button
                        colorScheme="blue"
                        ml="auto"
                        onClick={() => {
                          setOpen(false);
                          openNewProjectModal();
                        }}
                      >
                        New Project
                      </Button>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </ListItem>
          </List>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
