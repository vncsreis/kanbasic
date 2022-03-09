import { Box, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import OpenAsideButton from '../OpenAsideButton';

interface HeaderProps {
  setDrawerOpen: (newValue: boolean) => void;
  setProjectNameModalOpen: (newValue: boolean) => void;
  title: string;
}

export default function Header({
  setDrawerOpen,
  setProjectNameModalOpen,
  title,
}: HeaderProps) {
  return (
    <Box as="header" display="flex" width="100%" justifyContent="space-between">
      <Box flexGrow={1} flexBasis={0}>
        <OpenAsideButton onClick={() => setDrawerOpen(true)} />
      </Box>

      <Box marginLeft="auto" p="4" mx="auto">
        <Heading
          fontSize="5xl"
          color="white"
          fontWeight="bold"
          onClick={() => setProjectNameModalOpen(true)}
          cursor="pointer"
        >
          {title}
        </Heading>
      </Box>

      <Box flexGrow={1} flexBasis={0}>
        <Link to="/">
          <Heading
            textAlign="right"
            size="lg"
            fontWeight="light"
            color="white"
            padding="2"
          >
            Kanbasic
          </Heading>
        </Link>
      </Box>
    </Box>
  );
}
