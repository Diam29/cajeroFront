import { Container, Typography, Box } from "@mui/material";
import React, { useEffect } from "react";

const Cancelacion = () => {

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            window.location.href = '/'
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <Container maxWidth='md'>
            <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center', height: '100vh' }} >
                <Typography variant="h4" color='#434242'>
                    La operación ha sido cancelada!
                </Typography>
            </Box>

        </Container>
    )
}

export default Cancelacion;
