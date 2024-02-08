import React from 'react';
import styles from '@components/Button/Button.module.scss';

interface ButtonProps {
  title: string;
  onClick: () => void; // Change this to () => void for a generic function
}

function Button(props: ButtonProps) {
  const { title, onClick } = props;

  return (
    <>
      <button  onClick={onClick} className={styles.button}>{title}</button>
    </>
  );
}

export default Button;
