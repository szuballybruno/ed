
import React from 'react';
import { useParams } from 'react-router-dom';
import { useEditUserData } from '../services/dataService';
import { EditUserControl } from './EditUserControl';

const EditUser = () => {

    const params = useParams<{ userId: string }>();
    const editedUserId = parseInt(params.userId);
    const { userEditData } = useEditUserData(editedUserId);

    const handleSaveUserAsync = async () => {


    }

    return <EditUserControl
        editDTO={userEditData}
        saveUserAsync={handleSaveUserAsync}></EditUserControl>
};

export default EditUser;
