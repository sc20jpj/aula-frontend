import styles from '@components/Inputs/FileInput/FileInput.module.scss';  // Note the use of module.scss extension


interface FileInputProps {
    title: string;
    onChange: (value: FileList | null) => void;

}


function FileInput(props: FileInputProps) {


    const { title, onChange } = props;


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files; // Get the first file selected

        onChange(file);
    }


    return (

        <input
        id='fileUpload'
        type='file'
        onChange={handleInputChange}
        multiple
        accept='
            application/vnd.openxmlformats-officedocument.presentationml.presentation,
            application/pdf,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document,
            image/jpeg,
            image/png,
            application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
        '
    />
    )


}

export default FileInput
