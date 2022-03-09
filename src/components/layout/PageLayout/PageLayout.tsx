import { Flex } from '@chakra-ui/react';

interface PageLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <Flex
      flexDir="column"
      height="100%"
      width="100%"
      backgroundColor="purple.500"
    >
      {children}
    </Flex>
  );
}
