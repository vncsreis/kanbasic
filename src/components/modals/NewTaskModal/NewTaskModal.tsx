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
  isAddTaskOpen: boolean;
  setAddTaskOpen: (x: boolean) => void;
  newTask: string;
  setNewTask: (newTask: string) => void;
  handleSubmitModal: (e: React.FormEvent) => void;
}

export default function NewTaskModal({
  isAddTaskOpen,
  newTask,
  setAddTaskOpen,
  setNewTask,
  handleSubmitModal,
}: NewTaskModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Modal
      isOpen={isAddTaskOpen}
      onClose={() => {}}
      onEsc={() => setAddTaskOpen(false)}
      onOverlayClick={() => setAddTaskOpen(false)}
      initialFocusRef={inputRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Task</ModalHeader>
        <ModalCloseButton onClick={() => setAddTaskOpen(false)} />
        <ModalBody pb="4">
          <form onSubmit={(e) => handleSubmitModal(e)}>
            <FormLabel htmlFor="name">Task Name</FormLabel>
            <Input
              id="name"
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
