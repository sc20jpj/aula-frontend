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
            API.postLesson(moduleId,lesson)
                .then((res) => {
                    navigate(RoutesChoice.TeacherPortal)
                }).catch((res) => {
                    console.log(res)
                    setError(res)
                })
        }

    }
    const handleFiletoBase64 = (fileList: FileList | null) => {

        if (fileList) {
            const promises: Promise<Base64File>[] = [];

            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                const reader = new FileReader();
                const promise = new Promise<Base64File>((resolve, reject) => {
                    reader.onload = () => {
                        if (reader.result) {
                            const base64String = reader.result.toString();
                            const base64File: Base64File = {
                                name: file.name,
                                base64: base64String
                            };
                            resolve(base64File);
                        } else {
                            reject(new Error('Failed to read file'));
                        }
                    };
                    reader.onerror = () => {
                        reject(reader.error);
                    };
                    reader.readAsDataURL(file);
                });
                promises.push(promise);
            }

            Promise.all(promises)
                .then(base64Files => {
                    setFiles(prevFiles => [...prevFiles, ...base64Files]);
                })
                .catch(error => {
                    console.error(error);
                });
        }

    }
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

                    <FileInput title='Upload files' onChange={(value) => handleFiletoBase64(value)}/>
                    <div className={styles.buttonContainer}>
                        
                        <Button title="submit" onClick={() => handleSubmit()}></Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddStudent
