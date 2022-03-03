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

interface NewTaskModalProps {
  isNewTaskModalOpen: boolean;
  setNewTaskModalOpen: (x: boolean) => void;
  newTask: string;
  setNewTask: (newTask: string) => void;
  handleSubmitNewTaskModal: (e: React.FormEvent) => void;
}

export default function NewTaskModal({
  isNewTaskModalOpen,
  newTask,
  setNewTaskModalOpen,
  setNewTask,
  handleSubmitNewTaskModal,
}: NewTaskModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Modal
      isOpen={isNewTaskModalOpen}
      onClose={() => {}}
      onEsc={() => setNewTaskModalOpen(false)}
      onOverlayClick={() => setNewTaskModalOpen(false)}
      initialFocusRef={inputRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Task</ModalHeader>
        <ModalCloseButton onClick={() => setNewTaskModalOpen(false)} />
        <ModalBody pb="4">
          <form onSubmit={handleSubmitNewTaskModal}>
            <FormLabel htmlFor="name">Task Name</FormLabel>
            <Input
              id="new-task"
              type="text"
              onChange={(e) => setNewTask(e.target.value)}
              value={newTask}
              ref={inputRef}
            />
            <Box p="4" display="flex" justifyContent="flex-end">
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
