import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Button from './button';

type buttonType = {
  onClick: () => void;
};

export default function ButtonCloseModal({ onClick }: buttonType) {
  return (
    <Button onClick={onClick} dataTestid="closeModal" className="text-skin-textColor">
      <FaTimes />
    </Button>
  );
}
