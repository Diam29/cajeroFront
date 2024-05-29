import React, { useState, useEffect } from "react";
import { Typography, TextField, Box, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Container } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from "../Auth/useAuthStore";

const OtroMonto = () => {
    const navigate = useNavigate()
    const [monto, setMonto] = useState(0);
    const [isContinueDisabled, setIsContinueDisabled] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [saldoInsuficiente, setSaldoInsuficiente] = useState(false)
    const [mensajeSaldoInsuficiente, setMansajeSaldoInsuficiente] = useState('')
    const { userData, realizarExtraccion } = useAuthStore();


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            window.location.href = '/';
        }, 30000);

        return () => clearTimeout(timeoutId);
    }, []);


    const formatMonto = (monto) => {
        return `$${monto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    };

    const handleButtonClick = (value) => () => {
        const newValue = value === "." ? "" : value;
        const newMonto = parseInt(`${monto}${newValue}`);
        setMonto(newMonto);
        setIsContinueDisabled(newMonto === 0);
    };


    const handleClear = () => {
        setMonto(0);
        setIsContinueDisabled(true);
    };

    const handleCancel = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConsultaSaldo = () => {
        navigate('/consultaSaldo')
    }




    const handleContinuar = async () => {
        if (monto > 0) {
            try {
                const response = await realizarExtraccion(userData.user.id, monto);
                navigate(`/exito?mensaje=${response}`);
            } catch (error) {
                setSaldoInsuficiente(true)
                setMansajeSaldoInsuficiente(error.response.data.message)
                console.error('Error al realizar la extracción:', error.response.data.message);
            }
        }
    }

    const handleOtroMonto = () => {
        setSaldoInsuficiente(false);
        handleClear();
    }


    return (
        <Container maxWidth='md'>
            <Box sx={{
                display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', textAlign: 'center', gap: 5, mb: 6
            }}>

                <Typography variant="h4">Otro monto</Typography>
                <TextField
                    // label="Ingrese el monto"
                    type="text"
                    value={formatMonto(monto)}
                    InputProps={{
                        inputProps: { min: 0 },
                        readOnly: true,
                    }}
                />
            </Box>
            <Grid item xs={12} sm={6} md={4} display="flex" flexDirection="column" alignItems="center">
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 10 }}>
                    {[
                        [1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 9],
                    ].map((row, rowIndex) => (
                        <Box key={rowIndex} sx={{ display: 'flex', gap: 1 }}>
                            {row.map((num) => (
                                <Button
                                    key={num}
                                    variant="contained"
                                    onClick={handleButtonClick(num.toString())}
                                    sx={{
                                        backgroundColor: '#7469B6',
                                        color: '#E8E2E2',
                                        width: { xs: 60, sm: 80, md: 100 },
                                        '&:hover': {
                                            backgroundColor: '#5e55a6',
                                        },
                                    }}
                                >
                                    {num}
                                </Button>
                            ))}
                        </Box>
                    ))}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            variant="contained"
                            onClick={handleClear}
                            sx={{
                                flexGrow: 1,
                                fontSize: '10px',
                                backgroundColor: '#64D7D695',
                                width: { xs: 60, sm: 80, md: 100 },
                                '&:hover': {
                                    backgroundColor: '#57c7c2',
                                },
                            }}
                        >
                            Borrar
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleButtonClick('0')}
                            sx={{
                                flexGrow: 1,
                                backgroundColor: '#7469B6',
                                color: '#E8E2E2',
                                width: { xs: 60, sm: 80, md: 100 },
                                '&:hover': {
                                    backgroundColor: '#5e55a6',
                                },
                            }}
                        >
                            0
                        </Button>
                        <Button
                            variant="contained"
                            disabled={isContinueDisabled}
                            onClick={() => handleContinuar(monto)}
                            sx={{
                                flexGrow: 1,
                                fontSize: '10px',
                                backgroundColor: '#FA86BE95',
                                width: { xs: 60, sm: 80, md: 100 },
                                '&:hover': {
                                    backgroundColor: '#e472a6',
                                },
                            }}
                        >
                            Continuar
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Box sx={{ mt: 5 }}>
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

            {/* MODAL SALDO INSUFICIENTE */}
            <Dialog open={saldoInsuficiente} onClose={() => setSaldoInsuficiente(false)}>
                <DialogContent sx={{ backgroundColor: '#B4B4B8' }}>
                    <Typography variant="h6" sx={{ textAlign: 'center', color: '#434242', backgroundColor: '#B4B4B8' }}>
                        {mensajeSaldoInsuficiente}
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#B4B4B8' }}>
                    <Button onClick={handleCancel}
                        sx={{
                            backgroundColor: '#EE4E4E',
                            flexGrow: 1,
                            fontSize: '10px',
                            color: '#E8E2E2',
                            width: { xs: 60, sm: 80, md: 100 },
                            '&:hover': {
                                backgroundColor: '#A91D3A',
                            },
                        }}
                    >Cancelar</Button>
                    <Button onClick={handleConsultaSaldo} sx={{
                        flexGrow: 1,
                        fontSize: '10px',
                        backgroundColor: '#7469B6',
                        color: '#E8E2E2',
                        width: { xs: 60, sm: 80, md: 100 },
                        '&:hover': {
                            backgroundColor: '#5e55a6',
                        },
                    }}>Consultar Saldo</Button>

                    <Button onClick={handleOtroMonto} sx={{
                        flexGrow: 1,
                        fontSize: '10px',
                        backgroundColor: '#7469B6',
                        color: '#E8E2E2',
                        width: { xs: 60, sm: 80, md: 100 },
                        '&:hover': {
                            backgroundColor: '#5e55a6',
                        },
                    }}>Otro Monto</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default OtroMonto
