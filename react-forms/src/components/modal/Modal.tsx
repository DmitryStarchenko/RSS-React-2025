import { UncontrolledForm } from '../uncontrolled-form/Form';
import { ControlledForm } from '../controlled-form/Form';
import { createPortal } from 'react-dom';

type Props = {
  isShowing: boolean;
  hide: () => void;
  isControlled: boolean;
};

export const Modal = ({ isShowing, hide, isControlled }: Props) =>
  isShowing
    ? createPortal(
        isControlled ? (
          <ControlledForm isShowing={isShowing} hide={hide} />
        ) : (
          <UncontrolledForm isShowing={isShowing} hide={hide} />
        ),
        document.body,
      )
    : null;
