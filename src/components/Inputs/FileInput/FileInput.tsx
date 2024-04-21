import styles from '@components/Inputs/FileInput/FileInput.module.scss';  // Note the use of module.scss extension


interface FileInputProps {
    title: string;
    multiple: boolean
    onChangeList?: (value: FileList | null) => void;
    onChange?: (value: File | null) => void;

}


function FileInput(props: FileInputProps) {


    const { title, multiple, onChange , onChangeList } = props;

    console.log(multiple)
    const handleInputFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files && event.target.files; // Get the first file selected
        if (onChangeList ) {
            onChangeList(file);
        }
      
    }

    const handleInputFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("hello")
        if (event.target.files && onChange) {

            const file = event.target.files[0] && event.target.files[0]; // Get the first file selected
            console.log("hello")
            onChange(file);
        }

    }


    return (
        multiple ? (
            <input
                id='fileUpload'
                type='file'
                onChange={handleInputFilesChange}
                multiple={multiple}
                accept='
                application/vnd.openxmlformats-officedocument.presentationml.presentation,
                application/pdf,
                application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                image/jpeg,
                image/png,
                application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
            '
            />
        ) : (
            <input
                id='fileUpload'
                type='file'
                onChange={handleInputFileChange}
                multiple={multiple}
                accept='
                image/jpeg,
                image/png,
            '
            />
        )

    )


}

export default FileInput
