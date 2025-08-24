import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';
import { UncontrolledForm } from '../uncontrolled-form/Form';
import { ControlledForm } from '../controlled-form/Form';
import { createPortal } from 'react-dom';

vi.mock('../uncontrolled-form/Form', () => ({
  UncontrolledForm: vi.fn(({ hide }) => (
    <div data-testid="uncontrolled-form">
      <button onClick={hide}>Close Uncontrolled</button>
    </div>
  )),
}));

vi.mock('../controlled-form/Form', () => ({
  ControlledForm: vi.fn(({ hide }) => (
    <div data-testid="controlled-form">
      <button onClick={hide}>Close Controlled</button>
    </div>
  )),
}));

vi.mock('react-dom', () => ({
  createPortal: vi.fn((children) => children),
}));

describe('Modal', () => {
  const mockHide = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return null when isShowing is false', () => {
    const { container } = render(
      <Modal isShowing={false} hide={mockHide} isControlled={false} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render UncontrolledForm when isShowing is true and isControlled is false', () => {
    render(<Modal isShowing={true} hide={mockHide} isControlled={false} />);
    expect(screen.getByTestId('uncontrolled-form')).toBeInTheDocument();
    expect(screen.queryByTestId('controlled-form')).not.toBeInTheDocument();
  });

  it('should render ControlledForm when isShowing is true and isControlled is true', () => {
    render(<Modal isShowing={true} hide={mockHide} isControlled={true} />);
    expect(screen.getByTestId('controlled-form')).toBeInTheDocument();
    expect(screen.queryByTestId('uncontrolled-form')).not.toBeInTheDocument();
  });

  it('should call createPortal with correct arguments', () => {
    render(<Modal isShowing={true} hide={mockHide} isControlled={true} />);
    expect(createPortal).toHaveBeenCalledWith(expect.anything(), document.body);
  });

  it('should pass correct props to UncontrolledForm', () => {
    render(<Modal isShowing={true} hide={mockHide} isControlled={false} />);
    expect(UncontrolledForm).toHaveBeenCalled();
    const call = vi.mocked(UncontrolledForm).mock.calls[0];
    expect(call[0]).toEqual(
      expect.objectContaining({
        isShowing: true,
        hide: mockHide,
      }),
    );
  });

  it('should pass correct props to ControlledForm', () => {
    render(<Modal isShowing={true} hide={mockHide} isControlled={true} />);
    expect(ControlledForm).toHaveBeenCalled();
    const call = vi.mocked(ControlledForm).mock.calls[0];
    expect(call[0]).toEqual(
      expect.objectContaining({
        isShowing: true,
        hide: mockHide,
      }),
    );
  });

  it('should call hide function when form close button is clicked', () => {
    render(<Modal isShowing={true} hide={mockHide} isControlled={false} />);
    const closeButton = screen.getByText('Close Uncontrolled');
    fireEvent.click(closeButton);
    expect(mockHide).toHaveBeenCalledTimes(1);
  });

  it('should handle controlled form hide function', () => {
    render(<Modal isShowing={true} hide={mockHide} isControlled={true} />);
    const closeButton = screen.getByText('Close Controlled');
    fireEvent.click(closeButton);
    expect(mockHide).toHaveBeenCalledTimes(1);
  });
});
