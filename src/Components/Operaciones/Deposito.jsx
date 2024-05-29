import { Box, Container, Typography, DialogActions, DialogContent, Grid, Dialog, DialogTitle, List, ListItem, ListItemText, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../Auth/useAuthStore";

const Deposito = () => {
    const navigate = useNavigate();
    const [monto, setMonto] = useState(0);
    const [cantidades, setCantidades] = useState([0, 0, 0, 0]);
    const [selectedInput, setSelectedInput] = useState(null);
    const [isContinueDisabled, setIsContinueDisabled] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const { userData, realizarDeposito } = useAuthStore();

    const precios = [100, 200, 500, 1000];


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            window.location.href = '/';
        }, 30000);

        return () => clearTimeout(timeoutId);
    }, []);

    const handleButtonClick = (value) => {
        if (selectedInput === null) return;
        const newValue = value === '.' ? '' : value;
        const newCantidad = parseInt(`${cantidades[selectedInput]}${newValue}`);
        const newCantidades = [...cantidades];
        newCantidades[selectedInput] = newCantidad;
        setCantidades(newCantidades);
        const newMonto = newCantidades.reduce((acc, val, idx) => acc + (val * precios[idx]), 0);
        setMonto(newMonto);
        setIsContinueDisabled(newMonto === 0);
    };

    const handleClear = () => {
        const newCantidades = [0, 0, 0, 0];
        setCantidades(newCantidades);
        setMonto(0);
        setIsContinueDisabled(true);
    };

    const handleInputFocus = (index) => () => {
        setSelectedInput(index);
    };

    const handleInputChange = (index) => (event) => {
        const newCantidad = parseInt(event.target.value) || 0;
        const newCantidades = [...cantidades];
        newCantidades[index] = newCantidad;
        setCantidades(newCantidades);
        const newMonto = newCantidades.reduce((acc, val, idx) => acc + (val * precios[idx]), 0);
        setMonto(newMonto);
        setIsContinueDisabled(newMonto === 0);
    };

    const handleCancel = () => {
        setOpenDialog(true);
    };

    const handleContinuar = async () => {
        if (monto > 0) {
            try {
                const response = await realizarDeposito(userData.user.id, monto);
                navigate(`/exito?mensaje=${response}`);
            } catch (error) {
                console.error('Error al realizar el depósito:', error.response.data.message);
            }
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
            <Typography variant="h4" color="#434242" fontWeight={600}
                mt={10}
                textAlign="center">
                Depósito
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', textAlign: 'center', minHeight: '70vh' }}>
                <Grid container spacing={2} sx={{ maxWidth: 800 }}>
                    <Grid item xs={12} sm={4}
                    // sx={{ paddingRight: { sm: 1 } }}
                    >
                        {/* LISTA DE PRECIOS */}
                        <List>
                            <Typography variant="h6" color={'#434242'} fontWeight={600}>Pesos</Typography>
                            {precios.map((value) => (
                                <ListItem key={value} disableGutters>
                                    <ListItemText primaryTypographyProps={{ style: { color: '#434242', fontWeight: 600, textAlign: 'center' } }} primary={`$ ${value}`} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    {/* LISTA DE CANTIDAD */}
                    <Grid item xs={12} sm={4} sx={{
                        paddingRight: { sm: 5 }
                    }}>
                        <List>
                            <Typography variant="h6" color={'#434242'} fontWeight={600} >Cantidad</Typography>
                            {cantidades.map((cantidad, index) => (
                                <ListItem key={index}

                                    disableGutters>
                                    <Box
                                        component='input'
                                        type="text"
                                        value={cantidad}
                                        placeholder="0"
                                        sx={{
                                            width: '35%',
                                            mx: 'auto',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: '#E8E2E2',
                                            backgroundColor: '#7469B6',
                                            borderRadius: '8px',
                                            fontSize: '20px',
                                            outline: 'none',
                                            border: 'none',
                                            textAlign: 'center',
                                            padding: '3px'
                                        }}
                                        onFocus={handleInputFocus(index)}
                                        onChange={handleInputChange(index)}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography sx={{ mx: 'auto', width: '80%', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'solid 1px black', borderRadius: '10px' }} variant="h6">
                            Total: ${monto}
                        </Typography>
                        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
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
                                            value={num}
                                            onClick={() => handleButtonClick(num.toString())}
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
                                    onClick={() => handleButtonClick('0')}
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
                </Grid>
            </Box>
            {/* BOTON DE CANCELACION */}
            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                <Button
                    onClick={handleCancel}
                    sx={{
                        backgroundColor: '#EE4E4E',
                        color: '#E8E2E2',
                        mt: '15px',
                        width: { xs: 100, sm: 180, md: 250 },
                        '&:hover': {
                            backgroundColor: '#ECB176',
                        },
                    }}
                >
                    Cancelar
                </Button>
            </Box>
            {/* MODAL CANCELACION */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle variant="h5" sx={{ textAlign: 'start', color: '#434242', backgroundColor: '#B4B4B8' }}>
                    Confirmar cancelación
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: '#B4B4B8' }}>
                    <Typography variant="h6" sx={{ textAlign: 'center', color: '#434242', backgroundColor: '#B4B4B8' }}>
                        ¿Estás seguro de que deseas cancelar?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#B4B4B8' }}>
                    <Button onClick={handleCloseDialog} color="error">
                        Cancelar
                    </Button>
                    <Button component={Link} to="/cancelacion" onClick={handleCloseDialog} color="success">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container >
    );
};

export default Deposito;
