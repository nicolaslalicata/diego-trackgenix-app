import { useEffect, useState } from 'react';
import styles from './AddItem.module.css';

const AddItem = ({ addItem }) => {
    const { userInput, setUserInput } = useState({
        key: "",
        isActive: "",
        description: "",
        client: "",
        startDate: "",
        endDate: "",
        members: "",
    });

    const onChange = (e) => {
        setUserInput({ ...userInput, [e.target.key]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addItem(userInput);
        setUserInput({
            key: "",
            isActive: "",
            description: "",
            client: "",
            startDate: "",
            endDate: "",
            members: "",
        })
    }
}

export AddItem