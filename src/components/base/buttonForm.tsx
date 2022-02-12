import { ReactNode } from 'react';
import Button from './button';

type ButtonType = {
  children: ReactNode;
  className: string;
  onClick: () => void;
};

export default function ButtonForm({ children, className, onClick }: ButtonType) {
  return (
    <Button className={`w-full border-2 rounded-xl ${className}`} onClick={onClick}>
      {children}
    </Button>
  );
}
