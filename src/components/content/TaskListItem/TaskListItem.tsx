import {
  ArrowForwardIcon,
  CheckCircleIcon,
  CheckIcon,
  QuestionIcon,
  WarningIcon,
} from '@chakra-ui/icons';
import {
  IconButton,
  ListIcon,
  ListItem,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import { Task } from '../../../content/tasks';

export interface TaskOnList extends Task {
  visible: boolean;
  animation: boolean;
}

interface TaskListItemProps {
  task: TaskOnList;
  advance: (task: TaskOnList) => void;
}

export default function TaskListItem({ task, advance }: TaskListItemProps) {
  function defineIcon(stat: string) {
    switch (stat) {
      case 'todo':
        return <QuestionIcon color="blue.500" />;
      case 'doing':
        return <WarningIcon color="yellow.500" />;
      case 'done':
        return <CheckCircleIcon color="green.500" />;
      default:
        return <div />;
    }
  }

  function defineButtonIcon(stat: string) {
    switch (stat) {
      case 'todo':
        return {
          icon: <ArrowForwardIcon />,
          color: 'blue',
          tooltip: 'Start task',
        };
      case 'doing':
        return {
          icon: <ArrowForwardIcon />,
          color: 'yellow',
          tooltip: 'Complete task',
        };
      case 'done':
        return {
          icon: <CheckIcon />,
          color: 'green',
          tooltip: 'Clear task',
        };
      default:
        return {};
    }
  }

  const icon = defineIcon(task.status);

  const nextButton = defineButtonIcon(task.status);

  function getAnimationType(t: TaskOnList) {
    if (t.animation) {
      if (t.visible) {
        return 'slide-in';
      }
      return 'slide-out';
    }
    return '';
  }

  return (
    <ListItem
      className={getAnimationType(task)}
      rounded="lg"
      backgroundColor="white"
      px="2"
      mb="2"
      h="20"
      role="group"
      w="100%"
      display="flex"
      alignItems="center"
      boxShadow="dark-lg"
      tabIndex={0}
      onKeyPress={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          advance(task);
        }
      }}
    >
      <ListIcon>{icon}</ListIcon>
      <Text fontSize="xl" fontWeight="bold">
        {task.name}
      </Text>

      <Tooltip
        label={nextButton.tooltip}
        hasArrow
        borderRadius="lg"
        closeOnMouseDown
      >
        <IconButton
          aria-label="Move to next section"
          colorScheme={nextButton.color}
          opacity={0}
          _groupFocus={{ opacity: 1 }}
          _groupHover={{ opacity: 1 }}
          ml="auto"
          color="white"
          icon={nextButton.icon}
          onClick={() => {
            if (task.visible) {
              advance(task);
            }
          }}
        />
      </Tooltip>
    </ListItem>
  );
}
