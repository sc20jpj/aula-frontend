import React from 'react';
import styles from '@components/Inputs/CheckboxInput/CheckBoxInput.module.scss';

interface CheckboxInputProps {
    title: string;
    onChange?: (value: boolean) => void;
    onChangeChoice?: (questionId: string, choiceId: string) => void;
    choiceId?: string;
    questionId?: string
    checked?: boolean;
}

function CheckboxInput(props: CheckboxInputProps) {
    const { title, choiceId, questionId, onChangeChoice, onChange } = props;
    var checked = props.checked

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.checked;
        if (questionId && choiceId && onChangeChoice) {
            onChangeChoice(questionId, choiceId)
        }
        else {
            if (onChange) {
                onChange(inputValue)

            }
        }
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
