import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchDogBreeds } from '../services/api';
import { TextField, Grid, Card, CardContent, CardMedia, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const List = () => {
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const breeds = await fetchDogBreeds();
            setDogs(breeds);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filteredDogs = dogs.filter((dog) =>
        dog.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <Grid container justifyContent="center">
                <CircularProgress size={80} />
            </Grid>
        );
    }

    return (
        <div>
            <TextField
                label="Search for a breed"
                variant="outlined"
                fullWidth
                margin="normal"
                value={search}
                onChange={handleSearch}
            />
            <Grid container spacing={3}>
                {filteredDogs.map((dog, index) => (
                    <Grid item xs={12} sm={6} md={4} key={dog.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Link to={`/breed/${dog.name}`} style={{ textDecoration: 'none' }}>
                                <Card
                                    component={motion.div}
                                    whileHover={{ scale: 1.05 }}
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={dog.image?.url || 'https://via.placeholder.com/200'}
                                        alt={dog.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom align="center">
                                            {dog.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" align="center">
                                            {dog.temperament}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default List;
