import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';

interface AsideProps {
  isOpen: boolean;
  setOpen: (newValue: boolean) => void;
}

export default function Aside({ isOpen, setOpen }: AsideProps) {
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
            <Heading size="lg">Menu</Heading>
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
              <Accordion boxShadow="xs" allowToggle>
                <AccordionItem border="none">
                  <AccordionButton>
                    <Text fontSize="xl" mr="auto">
                      My Projects
                    </Text>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel
                    borderTopWidth="1px"
                    borderBottomWidth="1px"
                    backgroundColor="#ddd"
                    m="0"
                  >
                    <List>
                      <ListItem w="100%" h="100%" backgroundColor="#ddd">
                        Project 1
                      </ListItem>
                    </List>
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
