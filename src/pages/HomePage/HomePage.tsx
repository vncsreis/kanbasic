import { Button, Flex, Heading } from '@chakra-ui/react';
import { Link, useOutletContext } from 'react-router-dom';
import { OutletContextProps } from '../../App';
import OpenAsideButton from '../../components/layout/OpenAsideButton';
import PageLayout from '../../components/layout/PageLayout';

export default function HomePage() {
  const context = useOutletContext<OutletContextProps>();

  return (
    <PageLayout>
      <header>
        <OpenAsideButton onClick={() => context.openDrawer()} />
      </header>
      <Flex mx="auto" mt="44" flexDir="column" alignItems="center">
        <Heading
          cursor="default"
          fontSize="9xl"
          color="white"
          textDecoration="underline"
        >
          Kanbasic
        </Heading>

        <Link to="/new project">
          <Button fontSize="3xl" p="8" mt="10" colorScheme="blue">
            Start
          </Button>
        </Link>
      </Flex>
    </PageLayout>
  );
}
