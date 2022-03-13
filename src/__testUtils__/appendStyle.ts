import fs from 'fs';

// eslint-disable-next-line import/prefer-default-export
export function appendStyle(container: HTMLElement, pathToFile: string) {
  // get App.css file and append to document, so classes are effectively applied
  const cssFile = fs.readFileSync(pathToFile, 'utf-8');
  const style = document.createElement('style');

  style.innerHTML = cssFile;
  container.append(style);
}
