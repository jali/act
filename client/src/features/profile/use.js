import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actionSelectors from './slice';

const useProfile = () => {
    const dispatch = useDispatch();
    
    const loading = useSelector(actionSelectors.selectLoading);
    const error = useSelector(actionSelectors.selectError);
    const success = useSelector(actionSelectors.selectSuccess);
    const data = useSelector(actionSelectors.selectData);
    
    const handleSave = useCallback((values) => {
        dispatch(actionSelectors.save(values));
    }, [dispatch]);

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
