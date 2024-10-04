import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDogBreedDetail } from '../services/api';
import { CircularProgress, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const Detail = () => {
    const { breed } = useParams();
    const [dog, setDog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const breedDetail = await fetchDogBreedDetail(breed);
            setDog(breedDetail);
            setLoading(false);
        };
        fetchData();
    }, [breed]);

    if (loading) {
        return (
            <Grid container justifyContent="center">
                <CircularProgress size={80} />
            </Grid>
        );
    }

    if (!dog) {
        return <Typography variant="h5">Breed not found</Typography>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Card style={{ maxWidth: 600, margin: '0 auto', marginTop: 20 }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={dog.image?.url || 'https://via.placeholder.com/300'}
                    alt={dog.name}
                />
                <CardContent>
                    <Typography variant="h4" gutterBottom align="center">
                        {dog.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom align="center">
                        {dog.bred_for ? `Bred for: ${dog.bred_for}` : 'No specific information'}
                    </Typography>
                    <Typography variant="body1" align="center">
                        {dog.temperament ? `Temperament: ${dog.temperament}` : 'No temperament data'}
                    </Typography>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default Detail;
