import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function CardAction({data, ...rest}) {
    const {media, links} = rest;
    let renderLinks = [];
    if (links) {
        links.map((v, k) => {
            renderLinks.push(<Link to={`/vision/${data._id}`} key={k} size="small" color="primary">
            {v}
            </Link>)
        });
    }
    return (
        <Card sx={{ maxWidth: 350 }}>
            <CardContent>
                <Typography  variant="h4" component="div">
                    {data.title}
                </Typography>
                <Paper elevation={0} sx={{height: 50}}>
                    <Typography variant="body2" color="text.secondary">
                        {data.description}
                    </Typography>
                </Paper>
            </CardContent>


            <CardActions>
                {renderLinks}
            </CardActions>
        </Card>
    );
}
