import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionSelectors from './slice';

const useVisionList = () => {
    const dispatch = useDispatch();
    const loading = useSelector(actionSelectors.selectLoading);
    const error = useSelector(actionSelectors.selectError);
    const success = useSelector(actionSelectors.selectSuccess);
    const data = useSelector(actionSelectors.selectData);

    React.useEffect(() => {
        dispatch(actionSelectors.load());
    }, [dispatch]);

    return {
        data,
        error,
        loading,
        success
    };
};

export default useVisionList;
