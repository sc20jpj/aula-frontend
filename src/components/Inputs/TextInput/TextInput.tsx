// TextInput.tsx

import React from 'react';
import styles from '@components/Inputs/TextInput/TextInput.module.scss'; // Import SCSS file

interface TextInputProps {
  title: string;
  isPassword?: boolean;
  value?: string;
  onChange: (value: string) => void;
}

function TextInput(props: TextInputProps) {
  const { title, isPassword, value, onChange } = props;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    onChange(inputValue);
  };

  return (
    <div className={styles.textInput}>
      <p>{title}</p>

      <input
        type={isPassword ? 'password' : 'text'}
        className={styles.input}
        onChange={handleInputChange}
        value={value}
      />
    </div>
  );
}

export default TextInput;

