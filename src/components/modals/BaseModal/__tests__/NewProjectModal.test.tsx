import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import BaseModal from '..';

const testTitle = 'Test Title';
const testButtonText = 'Test Button';
const testLabelText = 'Test Label';
const handleSubmitModal = jest.fn();
const setTextInput = jest.fn();
const setModalOpen = jest.fn();
const textInput = '';

describe('BaseModal tests', () => {
  const component = (
    <BaseModal
      buttonText={testButtonText}
      handleSubmitModal={handleSubmitModal}
      isModalOpen
      label={testLabelText}
      setModalOpen={setModalOpen}
      setTextInput={setTextInput}
      textInput={textInput}
      title={testTitle}
    />
  );

  it('renders correctly', () => {
    const expectedText = 'Test Title';

    render(component);

    const input = screen.getByRole('textbox');
    const buttons = screen.getAllByRole('button');
    const text = screen.getByRole('heading');

    expect(input).toBeInTheDocument();
    expect(buttons).toHaveLength(2);
    expect(text).toBeInTheDocument();
    expect(text.innerHTML).toEqual(expectedText);
  });

  it('calls close function on click on close button', () => {
    render(component);

    const closeButton = screen.getAllByRole('button')[0];

    fireEvent.click(closeButton);

    expect(setModalOpen).toHaveBeenCalledWith(false);
  });

  it('calls close function on click outisde', () => {
    render(component);

    const overlay = document.querySelector(
      '.chakra-modal__content-container',
    ) as HTMLElement;

    fireEvent.mouseDown(overlay);
    fireEvent.mouseUp(overlay);
    fireEvent.click(overlay);

    expect(setModalOpen).toHaveBeenCalledWith(false);
  });

  it('calls close function on esc key press', () => {
    render(component);

    // eslint-disable-next-line
    const overlay = document.querySelector(
      '.chakra-modal__content-container',
    ) as HTMLElement;

    fireEvent.keyDown(overlay, { key: 'Esc', code: 27, charCode: 27 });
    fireEvent.keyUp(overlay, { key: 'Esc', code: 27, charCode: 27 });
    fireEvent.keyPress(overlay, { key: 'Esc', code: 27, charCode: 27 });

    expect(setModalOpen).toBeCalledWith(false);
  });

  it('updates text on text input', () => {
    render(component);

    const input = screen.getByRole('textbox');

    const newText = 'New Text';
    fireEvent.change(input, { target: { value: newText } });

    expect(setTextInput).toHaveBeenLastCalledWith(newText);
  });

  it('calls submit function when button is pressed', () => {
    handleSubmitModal.mockImplementation((e) => e.preventDefault());

    render(component);

    const submitButton = screen.getAllByRole('button')[1];

    fireEvent.click(submitButton);

    expect(handleSubmitModal).toHaveBeenCalled();
  });
});
