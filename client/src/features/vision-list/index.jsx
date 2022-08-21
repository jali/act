import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import CardAction from 'components/ui/card-action';
import useVisionList from 'features/vision-list/use';

const VisionList = () => {
    const { data, loading, success } = useVisionList();
    return (
        <>
        {loading && <LinearProgress />}
        {success && data && <ListOfCards data={data}/>}
        </>
    )
};

export default VisionList;


export function ListOfCards({success, data}) {
    const links=['SHARE', 'VISIT'];
    let visionList = [];
    data.map((item, k) => {
        visionList.push(<CardAction key={k} data={item} links={links} /> 
        );
    });
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'none',
                '& > :not(style)': {
                m: 1,
                width: 300,
                },
            }}
        >
            {visionList}
        </Box>
    );
}
