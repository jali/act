import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionCard({data, ...rest}) {
    const {media, links} = rest;
    let renderLinks = [];
    if (links) {
        links.map((v, k) => {
            renderLinks.push(<Button key={k} size="small" color="primary">
            {v}
            </Button>)
        });
    }
    return (
        <Card sx={{ maxWidth: 350 }}>
            
            <CardActionArea>
                {media && <CardMedia
                component="img"
                height="140"
                image={media}
                alt="green iguana"
                />}
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
            </CardActionArea>

            <CardActions>
                {renderLinks}
            </CardActions>
        </Card>
    );
}
