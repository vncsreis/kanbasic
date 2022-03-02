import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton } from '@chakra-ui/react';

interface HeaderProps {
  setOpen: (newValue: boolean) => void;
  title: string;
}

export default function Header({ setOpen, title }: HeaderProps) {
  return (
    <Box display="flex" width="100%">
      <IconButton
        aria-label="Open Menu"
        type="button"
        variant="unstyled"
        size="lg"
        onClick={() => setOpen(true)}
        icon={
          <HamburgerIcon
            w={10}
            h={10}
            color="white"
            _hover={{ filter: 'brightness(90%)' }}
          />
        }
      />

      <Box marginLeft="auto" p="4">
        <Heading fontSize="5xl" color="white" fontWeight="bold">
          {title}
        </Heading>
      </Box>

      <Box marginLeft="auto">
        <Heading size="lg" fontWeight="light" color="white" padding="2">
          Kanbasic
        </Heading>
      </Box>
    </Box>
  );
}
