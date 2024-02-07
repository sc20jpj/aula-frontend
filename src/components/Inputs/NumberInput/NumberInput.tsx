import styles from '@components/Inputs/NumberInput/NumberInput.module.scss';  // Note the use of module.scss extension


interface NumberInputProps {
    title: string;
    onChange: (value: string) => void;

}


function NumberInput(props: NumberInputProps) {


    const { title,onChange } = props;

    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
       onChange(inputValue);
      };
    
    return (
        <>
            <p>{title}</p>

            <input
                type={'number'}
                onChange={handleInputChange}
            />
        </>
    )
}

export default NumberInput
