import { Flex, Heading, List } from "@chakra-ui/react";
import TaskListItem, { TaskOnList } from "../TaskListItem";

export interface TaskListProps {
  name: string;
  tasks: TaskOnList[];
  advance?: (task: TaskOnList) => void;
}

export default function TaskList({
  name,
  tasks,
  advance = () => {},
}: TaskListProps) {
  return (
    <>
      <Flex flexDir="column" alignItems="center">
        <Heading
          size="lg"
          py={2}
          borderBottomWidth="2px"
          borderColor="#ccc"
          color="white"
          fontWeight="light"
          cursor="default"
        >
          {name}
        </Heading>
      </Flex>
      <Flex>
        <List w="100%" p={4} display="flex" flexDir="column">
          {tasks?.map((t) => (
            <TaskListItem task={t} advance={advance} key={t.id} />
          ))}
          {tasks.length === 1 && tasks[0].visible === false ? (
            <Heading
              fontWeight="thin"
              color="white"
              fontSize={48}
              textAlign="center"
              className="fade-in-text"
            >
              All done!
            </Heading>
          ) : null}
        </List>
      </Flex>
    </>
  );
}
