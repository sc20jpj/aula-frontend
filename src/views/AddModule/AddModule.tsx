import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { API } from '@lib/APi';
import TextInput from '@components/Inputs/TextInput/TextInput';
import Button from '@components/Button/Button';
import RoutesChoice from '@enums/Routes';
import styles from "@views/AddModule/AddModule.module.scss"

function AddModule() {

    const [modules, setModules] = useState<ModuleRequest[]>();
    const navigate = useNavigate()
    const [name, setName] = useState<string>("")
    const [code, setCode] = useState<string>("")
    const [error, setError] = useState<string>("")



    const handleSubmit = () => {
        if (name === "") {
            setError("Please enter a name")
        }
        if (code === "") {
            setError("Please enter a code")
        }
        else {
            const module: ModuleRequest = {
                name: name,
                code: code
            }

            API.postModule(module)
                .then((res) => {
                    navigate(RoutesChoice.TeacherPortal)
                }).catch((res) => {
                    console.log(res)
                    setError(res)
                })
        }

    }

    return (
        <>


            <div className={styles.container}>
                <h1>Add module</h1>

                <div className={styles.inputContainer}>
                    <TextInput title='Name' onChange={(value) => setName(value)} ></TextInput>
                    <TextInput title='Code' onChange={(value) => setCode(value)} ></TextInput>

                    {error && (
                        <p>{error}</p>
                    )}
                    <div className={styles.buttonContainer}>
                        <Button title="submit" onClick={() => handleSubmit()}></Button>
                    </div>
                </div>
            </div>

        </>

    )
}

export default AddModule;
