import { HamburgerIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

interface OpenAsideButtonProps {
  onClick: () => void;
}

export default function OpenAsideButton({ onClick }: OpenAsideButtonProps) {
  return (
    <IconButton
      aria-label="Open Menu"
      type="button"
      variant="unstyled"
      size="lg"
      onClick={onClick}
      icon={
        <HamburgerIcon
          w={10}
          h={10}
          color="white"
          _hover={{ filter: 'brightness(90%)' }}
        />
      }
    />
  );
}
