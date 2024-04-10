import styles from '@components/Inputs/TextAreaInput/TextAreaInput.module.scss';  // Note the use of module.scss extension


interface TextAreaInputProps {
    title: string;
    onChange: (value: string) => void;

}


function TextAreaInput(props: TextAreaInputProps) {


    const { title, onChange } = props;


    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = event.target.value;

        onChange(inputValue);
    }



    return (
        <label>
                 {title}
        <div>
            <textarea
                onChange={handleInputChange}
                rows={10} // Set the number of rows dynamically
                cols={50} // Set a fixed number of columns
                style={{ resize: 'none' }} // Prevent resizing by the user
            />
        </div>
   
        </label>

    );
}

export default TextAreaInput;


