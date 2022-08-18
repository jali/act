import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actionSelectors from './slice';

const useAuth = () => {
    const dispatch = useDispatch();
    
    const loading = useSelector(actionSelectors.selectLoading);
    const error = useSelector(actionSelectors.selectError);
    const success = useSelector(actionSelectors.selectSuccess);
    const data = useSelector(actionSelectors.selectData);
    
    const handleLogout = useCallback(() => dispatch(actionSelectors.logout()), [dispatch]);
    
    const handleLogin = useCallback((values) => {
        dispatch(actionSelectors.login(values));
    }, [dispatch]);

    const handleSave = useCallback((values) => {
        dispatch(actionSelectors.save(values));
    }, [dispatch]);

    return {
        data,
        error,
        loading,
        success,
        handleLogin,
        handleLogout,
        handleSave
    };
};

export default useAuth;
