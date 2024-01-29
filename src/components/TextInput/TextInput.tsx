import styles from './TextInput.module.scss';  // Note the use of module.scss extension


interface TextInputProps {
    title: string;
    onChange: (value: string) => void;


}


function TextInput(props: TextInputProps) {
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        onChange(inputValue);
    };
    const { title, onChange } = props;

    return (
        <>
            <p>{title}</p>
            <input
                type="text"
                id="username"
                name="username"
                onChange={handleInputChange}
            />
        </>
    )
}

export default TextInput
