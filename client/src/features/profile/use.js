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
    
    const handleSave = useCallback((values) => {
        dispatch(actionSelectors.save(values));
    }, [dispatch]);

    React.useEffect(() => {
        if (success && data) {
            console.log('attempt to navigate')
            navigate("/");
        }
    }, [success, data, navigate]);
    
    // React.useEffect(() => {
    //     dispatch(actionSelectors.load());
    //     return () => dispatch(actionSelectors.init());
    // }, [dispatch]);

    return {
        data,
        error,
        loading,
        success,
        handleSave
    };
};

export default useProfile;
