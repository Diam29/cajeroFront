import { Container, Typography, Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Exito = () => {
    const navigate = useNavigate();
    const mensaje = new URLSearchParams(location.search).get('mensaje');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate('/')
        }, 10000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <Container maxWidth='md'>
            <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center', height: '100vh' }} >
                <Typography variant="h4" color='#434242'>
                    {mensaje}
                </Typography>
            </Box>
        </Container>
    )
}

export default Exito;
