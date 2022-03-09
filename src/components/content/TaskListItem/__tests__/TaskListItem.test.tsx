import { List } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import fs from "fs";
import path from "path";
import TaskListItem, { TaskOnList } from "../";

export function appendStyle(container: HTMLElement, pathToFile: string) {
  //get App.css file and append to document, so classes are effectively applied
  const cssFile = fs.readFileSync(path.resolve(__dirname, pathToFile), "utf-8");
  const style = document.createElement("style");

  style.innerHTML = cssFile;
  container.append(style);
}

// TESTS TODO
/*
DEFINEICON FUNCTION
DEFINEBUTTON FUNCTION
TEST ON ENTER CALLS ADVANCE

26,30-32,39,49-54,69,87-88

*/

describe("Task List tests", () => {
  const testTask: TaskOnList = {
    animation: true,
    id: "test-task",
    name: "Test",
    status: "doing",
    visible: true,
  };

  it("renders task text correctly", () => {
    render(
      <List>
        <TaskListItem task={testTask} advance={() => {}} />
      </List>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("does not show hidden tasks", () => {
    const view = render(
      <List>
        <TaskListItem
          task={{ ...testTask, visible: false }}
          advance={() => {}}
        />
      </List>
    );

    appendStyle(
      view.container,
      "../../../../pages/ProjectPage/ProjectPage.css"
    );

    const text = screen.getByText("Test");

    expect(text).not.toBeVisible();
  });

  it("calls advance function when clicked", () => {
    const spy = jest.fn();

    render(
      <List>
        <TaskListItem task={testTask} advance={spy} />
      </List>
    );

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(spy).toHaveBeenCalled();
  });
});
