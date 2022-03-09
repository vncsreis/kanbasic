import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Heading, IconButton } from "@chakra-ui/react";

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
        <IconButton
          aria-label="Open Menu"
          type="button"
          variant="unstyled"
          size="lg"
          onClick={() => setDrawerOpen(true)}
          icon={
            <HamburgerIcon
              w={10}
              h={10}
              color="white"
              _hover={{ filter: "brightness(90%)" }}
            />
          }
        />
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
        <Heading
          textAlign="right"
          cursor="default"
          size="lg"
          fontWeight="light"
          color="white"
          padding="2"
        >
          Kanbasic
        </Heading>
      </Box>
    </Box>
  );
}
