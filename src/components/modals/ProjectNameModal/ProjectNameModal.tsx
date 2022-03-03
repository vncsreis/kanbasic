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

interface ProjectNameModalProps {
  newProjectName: string;
  isProjectNameModalOpen: boolean;
  setNewProjectName: (newName: string) => void;
  setProjectNameModalOpen: (x: boolean) => void;
  handleSubmitProjectModal: (e: React.FormEvent) => void;
}

export default function ProjectNameModal({
  newProjectName,
  isProjectNameModalOpen,
  setNewProjectName,
  setProjectNameModalOpen,
  handleSubmitProjectModal,
}: ProjectNameModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Modal
      isOpen={isProjectNameModalOpen}
      onClose={() => {}}
      onEsc={() => setProjectNameModalOpen(false)}
      onOverlayClick={() => setProjectNameModalOpen(false)}
      initialFocusRef={inputRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Project Name</ModalHeader>
        <ModalCloseButton onClick={() => setProjectNameModalOpen(false)} />
        <ModalBody pb="4">
          <form onSubmit={handleSubmitProjectModal}>
            <FormLabel htmlFor="name">New Project Name</FormLabel>
            <Input
              id="project-name"
              type="text"
              onChange={(e) => setNewProjectName(e.target.value)}
              value={newProjectName}
              ref={inputRef}
            />
            <Box p="4" display="flex" justifyContent="flex-end">
              <Button type="submit" colorScheme="blue">
                Save
              </Button>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
