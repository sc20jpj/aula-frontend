import React from 'react';
import styles from './TextInput.module.scss';

interface ButtonProps {
  title: string;
  onClick: () => void; // Change this to () => void for a generic function
}

function Button(props: ButtonProps) {
  const { title, onClick } = props;

  return (
    <>
      <p>{title}</p>
      <button onClick={onClick}>{title}</button>
    </>
  );
}

export default Button;
