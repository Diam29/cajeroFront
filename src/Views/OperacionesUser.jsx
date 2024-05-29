import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import useAuthStore from '../Auth/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';

const OperacionesUser = () => {
    const navigate = useNavigate()
    const userData = useAuthStore((state) => state.userData);
    const userName = userData?.user?.name

    const [openDialog, setOpenDialog] = useState(false);


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate('/')
        }, 30000);

        return () => clearTimeout(timeoutId);
    }, []);

    // Funcion para consulta de saldo
    const handleConsultaSaldo = () => {
        navigate('/consultaSaldo')
    }

    const handleCancel = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleExtraccion = () => {
        navigate('/extraccion')
    }

    const handleDeposito = () => {
        navigate('/deposito')
    }

    return (
        <Container maxWidth="md">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant='h4' color='#434242' fontWeight={600} paddingTop={12} textAlign="center" mb={1}>
                    Bienvenido, {userName}
                </Typography>
                <Typography variant='h6' color='#434242' textAlign="center" marginTop={1} pb={8}>
                    Que operacion deseas realizar??
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'center', pb: 2
            }}>
                <Button
                    onClick={handleExtraccion}
                    sx={{
                        backgroundColor: '#7469B6',
                        color: '#E8E2E2',
                        width: { xs: 100, sm: 180, md: 250 },
                        '&:hover': {
                            backgroundColor: '#5e55a6',
                        },
                    }}>Extracción</Button>

                <Button
                    onClick={handleDeposito}
                    sx={{
                        backgroundColor: '#7469B6',
                        color: '#E8E2E2',
                        width: { xs: 100, sm: 180, md: 250 },
                        '&:hover': {
                            backgroundColor: '#5e55a6',
                        },
                    }}>Depósito</Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 4 }}>
                <Button
                    onClick={handleConsultaSaldo}
                    sx={{
                        backgroundColor: '#7469B6',
                        color: '#E8E2E2',
                        width: { xs: 250, sm: 300, md: 400 },
                        '&:hover': {
                            backgroundColor: '#5e55a6',
                        },
                    }}>Consulta de Saldo</Button>
            </Box>


            <Box sx={{ mt: 15 }}>
                <Button
                    onClick={handleCancel}
                    sx={{
                        backgroundColor: '#EE4E4E',
                        color: '#E8E2E2',
                        width: { xs: 100, sm: 180, md: 250 },
                        '&:hover': {
                            backgroundColor: '#ECB176',
                        },
                    }}>Cancelar</Button>
            </Box>
            {/* MODAL CANCELACION */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle variant="h5" sx={{ textAlign: 'start', color: '#434242', backgroundColor: '#B4B4B8' }}>Confirmar cancelación</DialogTitle>
                <DialogContent sx={{ backgroundColor: '#B4B4B8' }}>
                    <Typography variant="h6" sx={{ textAlign: 'center', color: '#434242', backgroundColor: '#B4B4B8' }}>
                        ¿Estás seguro de que deseas cancelar?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#B4B4B8' }}>
                    <Button onClick={handleCloseDialog}
                        color="error" >Cancelar</Button>
                    <Button component={Link} to="/cancelacion" onClick={handleCloseDialog} color="success">Confirmar</Button>
                </DialogActions>
            </Dialog>
        </Container>

    );
};

export default OperacionesUser;
