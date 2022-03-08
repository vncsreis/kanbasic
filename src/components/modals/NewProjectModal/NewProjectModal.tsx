import {
  Box,
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useRef } from 'react';

interface NewProjectModalProps {
  newProject: string;
  isNewProjectModalOpen: boolean;
  setNewProject: (newName: string) => void;
  setNewProjectModalOpen: (x: boolean) => void;
  handleSubmitNewProjectModal: (e: React.FormEvent) => void;
}

export default function NewProjectModal({
  newProject,
  isNewProjectModalOpen,
  setNewProject,
  setNewProjectModalOpen,
  handleSubmitNewProjectModal,
}: NewProjectModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Modal
      isOpen={isNewProjectModalOpen}
      onClose={() => {}}
      onEsc={() => setNewProjectModalOpen(false)}
      onOverlayClick={() => setNewProjectModalOpen(false)}
      initialFocusRef={inputRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Project</ModalHeader>
        <ModalCloseButton onClick={() => setNewProjectModalOpen(false)} />
        <ModalBody pb="4">
          <form onSubmit={handleSubmitNewProjectModal}>
            <FormLabel htmlFor="name">New Project Name</FormLabel>
            <Input
              id="project-name"
              type="text"
              onChange={(e) => setNewProject(e.target.value)}
              value={newProject}
              ref={inputRef}
            />
            <Box p="4" display="flex" justifyContent="flex-end">
              <Button type="submit" colorScheme="blue">
                Create
              </Button>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
