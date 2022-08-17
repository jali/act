import React, { memo } from 'react';
import LoadingPageStyle from './loading-page.style';
import PageCenterStyle from './page-centre.style';

const LoadingPage = () => (
    <PageCenterStyle data-testid='LoadingPage'>
        <LoadingPageStyle>
            <div className='loader' data-testid='LoadingLoader'/>
        </LoadingPageStyle>
    </PageCenterStyle>
);

export default memo(LoadingPage);
