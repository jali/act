import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as actionSelectors from './slice';

const useProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(actionSelectors.selectLoading);
    const error = useSelector(actionSelectors.selectError);
    const success = useSelector(actionSelectors.selectSuccess);
    const data = useSelector(actionSelectors.selectData);
    const saved = useSelector(actionSelectors.selectSaved);
    
    const handleSave = useCallback((values) => {
        dispatch(actionSelectors.save(values));
    }, [dispatch]);

    React.useEffect(() => {
        if (saved) {
            dispatch(actionSelectors.load());
            navigate("/profile");
        }
    }, [success, saved, navigate, dispatch]);
    

    return {
        data,
        error,
        loading,
        success,
        handleSave
    };
};

export default useProfile;
