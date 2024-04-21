import { useSelector } from 'react-redux';
import { useAppDispatch } from '@store/hooks';
import {
    auth
} from '@store/auth/authSlice'
import { useNavigate, useParams } from 'react-router-dom';
import Select, { ActionMeta, OnChangeValue, SingleValue } from 'react-select'
import Button from '@components/Button/Button'
import { useEffect, useState } from 'react';
import { API } from '@lib/APi';
import styles from '@views/AddBadge/AddBadge.module.scss'
import FileInput from '@components/Inputs/FileInput/FileInput';
import RoutesChoice from '@enums/Routes';
import TextInput from '@components/Inputs/TextInput/TextInput';

function AddBadge() {
    const dispatch = useAppDispatch();
    const state = useSelector(auth);
    const navigate = useNavigate();
    const [options, setOptions] = useState<Option[]>([])

    const params = useParams();
    const [moduleId, setModuleId] = useState('');
    const [file, setFile] = useState<Base64File | null>(null);
    const [name, setName] = useState<string>("");
    const [user_id, setUserId] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [error, setError] = useState<string>("");

    const addUsersToOptions = (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {

        if (actionMeta.action === "remove-value" || actionMeta.action === "pop-value") {
            const removedUserId = actionMeta.removedValue?.value;
            if (removedUserId) {
                setUserId("");

            }
        } else if (actionMeta.action === "select-option") {
            if (newValue && newValue.value) {
                setUserId(newValue.value)
            }

        }

    };

    const handleFiletoBase64 = (file: File | null) => {
        const reader = new FileReader();
        var uploaded_file: Base64File;
        var fileError = "";
        console.log("file is ",file)
        if (file) {
            reader.readAsDataURL(file);

            reader.onload = () => {
                if (reader.result) {
                    const base64String = reader.result.toString().split(',')[1];
                    uploaded_file = {
                        name: file.name,
                        file_type: file.type,
                        base64: base64String
                    };
                    console.log("uploaded_file is ",uploaded_file);
                    setFile(uploaded_file);
                }
            };

            reader.onerror = () => {
                fileError = "Error reading file";
                console.error('Error reading file:', reader.error);
            };
        }

    };

    const handleSubmit = () => {
        if (name === "") {
            setError("Please enter a name");
        } else if (description === "") {
            setError("Please enter a description");
        } else {
            if (file) {
                console.log("the BadgeRequest sent is ");

                const badge: BadgeRequest = {
                    user_id: user_id,
                    name: name,
                    description: description,
                    file: file
                };
                console.log("the BadgeRequest sent is ", badge);
                API.postBadge(badge)
                    .then((res) => {
                        navigate(RoutesChoice.TeacherPortal);
                    })
                    .catch((res) => {
                        console.log(res)
                        setError("Error uploading file");
                    });
            }
        }
    };


    const getAllUsers = () => {
        API.getAllUsers()
            .then((res) => {
                const newOptions = res.users.map(user => ({
                    value: user.id!,
                    label: user.name
                }));
                console.log(newOptions)
                setOptions((prevOptions) => [...prevOptions, ...newOptions]);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    };


    useEffect(() => {
        getAllUsers()
    }, []);

    return (
        <>
            <div className={styles.container}>
                <h1>Create a badge</h1>
                <div className={styles.inputContainer}>

                    <TextInput title='Name' onChange={(value) => setName(value)} ></TextInput>
                    <TextInput title='description' onChange={(value) => setDescription(value)} ></TextInput>
                    <br />
                    <label>Student</label>
                    <Select
                        isClearable={true}
                        isMulti={false}
                        options={options}
                        onChange={addUsersToOptions}

                    />

                    <FileInput multiple={false} title='Upload files' onChange={(value) => handleFiletoBase64(value)} />

                    <div className={styles.buttonContainer}>
                        <Button title="Submit" onClick={() => handleSubmit()} />
                    </div>
                </div>
                {error && <p>{error}</p>}
            </div>
        </>
    );
};

export default AddBadge;
