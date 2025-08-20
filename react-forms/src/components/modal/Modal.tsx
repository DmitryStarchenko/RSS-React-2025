import { ControlledForm } from '../controlled-form/Form';
import { createPortal } from 'react-dom';

type Props = {
  isShowing: boolean;
  hide: () => void;
};

export const Modal = ({ isShowing, hide }: Props) =>
  isShowing
    ? createPortal(
        <ControlledForm isShowing={isShowing} hide={hide} />,
        document.body,
      )
    : null;
