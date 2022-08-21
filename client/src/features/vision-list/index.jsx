import React from 'react';
import { Link } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import useVisionList from 'features/vision-list/use';

const VisionList = () => {
    const { data, loading, success } = useVisionList();

    return (
        <>
        {loading && <LinearProgress />}
        {success && data && <SimplePaper data={data}/>}
        </>
    )
    
};

export default VisionList;



export function SimplePaper({success, data}) {
    let visionList = [];
    data.map((item, k) => {
        visionList.push(
        <Paper key={k} elevation={3}>
            <div >
                <Typography>Title: {item.title}</Typography>
            </div>
            <div>
                <Typography>Created on: {item.created}</Typography>
            </div>
        </Paper>);
    });
    return (
        <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
            m: 2,
            p: 4,
            width: 200,
            height: 200,
            },
        }}
        >
            {visionList}
        </Box>
    );
    }

    export function BasicCard() {
    return (
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
            benevolent
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
            </Typography>
            <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
        </Card>
    );
}
