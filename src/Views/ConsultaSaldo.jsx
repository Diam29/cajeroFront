import { Container, Typography, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useState, useEffect } from 'react'
import useAuthStore from '../Auth/useAuthStore'
import { useNavigate, Link } from 'react-router-dom'


const ConsultaSaldo = () => {
    const navigate = useNavigate()
    const [openDialog, setOpenDialog] = useState(false);

    const { userData } = useAuthStore()


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate('/')
        }, 15000);

        return () => clearTimeout(timeoutId);
    }, []);

    const handleOperaciones = () => {
        navigate('/operacionesUser')
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleCancel = () => {
        setOpenDialog(true);
    };


    return (
        <Container maxWidth='md'>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', textAlign: 'center', height: '50vh', flexDirection: 'column', gap: 3 }}>
                <Typography variant='h4'>
                    Su saldo es
                </Typography>
                <Typography variant='h4'>
                    $ {userData.user.saldoTotal}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant='h6'>
                    Desea realizar otra operación?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: 8, mt: 4 }}>
                    <Button
                        onClick={handleOperaciones}
                        sx={{
                            backgroundColor: '#7469B6',
                            color: '#E8E2E2',
                            width: { xs: 60, sm: 80, md: 100 },
                            '&:hover': {
                                backgroundColor: '#5e55a6',
                            },
                        }}>Si</Button>
                    <Button
                        onClick={handleCancel}
                        sx={{
                            backgroundColor: '#7469B6',
                            color: '#E8E2E2',
                            width: { xs: 60, sm: 80, md: 100 },
                            '&:hover': {
                                backgroundColor: '#5e55a6',
                            },
                        }}>No</Button>
                </Box>
            </Box>
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
    )
}



export default ConsultaSaldo