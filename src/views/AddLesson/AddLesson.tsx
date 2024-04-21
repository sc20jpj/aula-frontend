import { useSelector } from 'react-redux';
import { useAppDispatch } from '@store/hooks';
import {
    auth
} from '@store/auth/authSlice'
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@components/Button/Button'
import { useEffect, useState } from 'react';
import { API } from '@lib/APi';
import styles from '@views/AddLesson/AddLesson.module.scss'

import TextInput from '@components/Inputs/TextInput/TextInput';
import RoutesChoice from '@enums/Routes';
import FileInput from '@components/Inputs/FileInput/FileInput';


function AddStudent() {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);
    const navigate = useNavigate()

    const params = useParams();
    const [moduleId, setModuleId] = useState('');
    const [files, setFiles] = useState<Base64File[]>([])
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [error, setError] = useState<string>("")



    const handleSubmit = () => {
        if (name === "") {
            setError("Please enter a name")
        }
        if (description === "") {
            setError("Please enter a code")
        }
        else {
            const lesson: LessonRequest = {
                name: name,
                description: description,
                files: files
            }
            console.log("the Lesson sent is " ,lesson)
            API.postLesson(moduleId,lesson)
                .then((res) => {
                    navigate(RoutesChoice.TeacherPortal)
                }).catch((res) => {
                    setError("Error uploding file")
                })
        }

    }
    const handleFiletoBase64 = (fileList: FileList |  null) => {
        if (fileList) {
            const filesArray = Object.values(fileList);
    
            const  uploadedFiles =  [...files];
            var fileError = ""
            filesArray.forEach((file: File) => {
                const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        if (reader.result) {
                            const base64String = reader.result.toString().split(',')[1];
                            const base64File: Base64File = {
                                name: file.name,
                                file_type: file.type,
                                base64: base64String
                            };
                            console.log(base64File)

                            uploadedFiles.push(base64File)
                           
                        } else {
                            
                        }

                    };
                    reader.onerror = (error) => {
                        fileError = "Error reading file"
                        console.error('Error reading file:', reader.error);
                    };
            
                
            });
            if (fileError === "") {
                setFiles(uploadedFiles)
            }
      
            
        }
    };
        useEffect(() => {
        console.log(params.moduleId);
        if (params.moduleId) {
            setModuleId(params.moduleId);
        }
    }, [params.moduleId]);


    return (
        <>

            <div className={styles.container}>
                <h1>Create a lesson  </h1>

                <div className={styles.inputContainer}>
                    <TextInput title='Name' onChange={(value) => setName(value)} ></TextInput>
                    <TextInput title='description' onChange={(value) => setDescription(value)} ></TextInput>

                    {error && (
                        <p>{error}</p>
                    )}

                    <FileInput multiple={true} title='Upload files' onChangeList ={(value) => handleFiletoBase64(value)}/>
                    <div className={styles.buttonContainer}>
                        
                        <Button title="submit" onClick={() => handleSubmit()}></Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddStudent
