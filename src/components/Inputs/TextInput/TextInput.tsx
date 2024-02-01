import styles from './TextInput.module.scss';  // Note the use of module.scss extension


interface TextInputProps {
    title: string;
    isPassword: boolean
    onChange: (value: string) => void;

}


function TextInput(props: TextInputProps) {


    const { title,isPassword ,onChange } = props;

    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
       onChange(inputValue);
      };
    
    return (
        <>
            <p>{title}</p>

            <input
                type={isPassword ? 'password' : 'text'}
                onChange={handleInputChange}
            />
        </>
    )
}

export default TextInput
