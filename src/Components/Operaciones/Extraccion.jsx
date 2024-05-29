import React, { useState } from 'react';
import { Container, Typography, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, RadioGroup, FormControlLabel, Radio, FormControl, Grid } from '@mui/material';
import useAuthStore from '../../Auth/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';

const Extraccion = () => {
    const navigate = useNavigate()
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedMonto, setSelectedMonto] = useState('');
    const { userData, realizarExtraccion } = useAuthStore();

    const handleCancel = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleMontoSeleccionado = (event) => {
        const monto = event.target.value === 'otro monto' ? 'otro monto' : parseFloat(event.target.value);
        setSelectedMonto(monto);
    };


    const handleContinuar = async () => {
        if (selectedMonto === '') {
            return;
        }
        try {
            if (selectedMonto === 'otro monto') {
                navigate('/otroMonto')
                return;
            }

            const monto = Number(selectedMonto);
            const response = await realizarExtraccion(userData.user.id, monto);
            navigate(`/exito?mensaje=${response}`);
        } catch (error) {
            navigate(`/saldoInsuficiente?mensaje=${error.message}`)
            console.error('Error al realizar la extracción desde Extraccion: ', error.message);
        }
    };




    return (
        <Container maxWidth="md">
            <Typography variant="h4" color="#434242" fontWeight={600} paddingTop={12} textAlign="center" mb={4}>
                Extracción
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup value={selectedMonto} onChange={handleMontoSeleccionado}>
                    <Grid container spacing={2}>
                        {['500', '2000', '3000', '5000', '6000', 'otro monto'].map((monto, index) => (
                            <Grid item xs={6} key={index}>
                                <FormControlLabel
                                    value={monto}
                                    control={<Radio />}
                                    label={monto === 'otro monto' ? 'otro monto' : `$${monto}`}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </RadioGroup>
            </FormControl>
            <Box display="flex" justifyContent="space-between" marginTop={2}>
                <Button variant="contained" onClick={handleCancel} sx={{ backgroundColor: '#EE4E4E', color: '#E8E2E2', width: { xs: 100, sm: 180, md: 250 }, '&:hover': { backgroundColor: '#ECB176' } }}>
                    Cancelar
                </Button>
                <Button variant="contained" onClick={handleContinuar} disabled={selectedMonto === ''} sx={{ backgroundColor: '#006769', color: '#E8E2E2', width: { xs: 100, sm: 180, md: 250 }, '&:hover': { backgroundColor: '#40A578' } }}>
                    Continuar
                </Button>
            </Box>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirmar cancelación</DialogTitle>
                <DialogContent>
                    <Typography>
                        ¿Estás seguro de que deseas cancelar?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button component={Link} to="/cancelacion" onClick={handleCloseDialog} color="error">Confirmar</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Extraccion;
