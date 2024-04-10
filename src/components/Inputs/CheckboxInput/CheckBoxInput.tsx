import React from 'react';
import styles from '@components/Inputs/CheckboxInput/CheckBoxInput.module.scss';

interface CheckboxInputProps {
    title: string;
    onChange: (value: boolean) => void;
    checked?: boolean;
}

function CheckboxInput(props: CheckboxInputProps) {
    const { title, onChange, checked } = props;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.checked;
        onChange(inputValue);
    };

    return (
        <div className={styles.checkBoxWrapper}>
            
                <input
                    type='checkbox'
                    className={styles.checkBoxInput}
                    checked={checked}
                    onChange={handleInputChange}
                />

            <label className={styles.checkBoxLabel}>
                <p>{title}</p>
            </label>
        </div>
    );
}

export default CheckboxInput;
