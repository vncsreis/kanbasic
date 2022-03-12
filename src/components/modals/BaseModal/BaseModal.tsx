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

interface BaseModalProps {
  title: string;
  label: string;
  buttonText: string;
  isModalOpen: boolean;
  setModalOpen: (x: boolean) => void;
  textInput: string;
  setTextInput: (newTask: string) => void;
  handleSubmitModal: (e: React.FormEvent) => void;
}

export default function BaseModal({
  title,
  label,
  buttonText,
  isModalOpen,
  setModalOpen,
  textInput,
  setTextInput,
  handleSubmitModal,
}: BaseModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {}}
      onEsc={() => setModalOpen(false)}
      onOverlayClick={() => setModalOpen(false)}
      initialFocusRef={inputRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader role="heading">{title}</ModalHeader>
        <ModalCloseButton onClick={() => setModalOpen(false)} />

        <ModalBody pb="4">
          <form onSubmit={handleSubmitModal}>
            <FormLabel htmlFor="name">{label}</FormLabel>
            <Input
              id="new-task"
              type="text"
              onChange={(e) => setTextInput(e.target.value)}
              value={textInput}
              ref={inputRef}
            />
            <Box p="4" display="flex" justifyContent="flex-end">
              <Button type="submit" colorScheme="blue">
                {buttonText}
              </Button>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
