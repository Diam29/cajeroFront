import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Container, Box, Typography, Grid } from '@mui/material';
import { validateDni, validateClave } from './validation';
import useAuthStore from '../../Auth/useAuthStore';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [dni, setDni] = useState('');
    const [clave, setClave] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [focusedField, setFocusedField] = useState(null);
    const navigate = useNavigate()
    const timeoutRef = useRef(null);

    // Estado de Login de usuario
    const login = useAuthStore((state) => state.login);

    // Funcion para poner foco en el campo que se esta usando, y actualizar el timeout.
    const handleFocus = (field) => () => {
        setFocusedField(field);
        resetTimeout();
    };

    // Funcion para validar dni y clave, 
    const handleButtonClick = (value) => () => {
        if (focusedField === 'dni' && dni.length < 8) {
            const newDni = dni + value;
            if (!validateDni(newDni)) {
                setErrorMessage('El dni debe tener entre 7 y 8 caracteres')
            } else {
                setErrorMessage('')
            }
            setDni(newDni)

        } else if (focusedField === 'clave' && clave.length < 4) {
            const newClave = clave + value;
            if (!validateClave(newClave)) {
                setErrorMessage('La clave debe tener 4 caracteres numéricos.');
            } else {
                setErrorMessage('');
            }
            setClave(newClave)
        }
        resetTimeout();
    };

    // Funcion para resetear todo los estados
    const handleClear = () => {
        setDni('');
        setClave('');
        setErrorMessage('');
        resetTimeout();
    };

    // Funcion para resetar el timeOut
    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(handleClear, 20000);
    };

    const handleLogin = async () => {
        try {
            const userName = await login(dni, clave);
            if (userName) {
                navigate('/operacionesUser');
            }
        } catch (error) {
            alert(error.response.data.message) || 'Error en el Login';
        }
    }


    useEffect(() => {
        resetTimeout();
        return () => clearTimeout(timeoutRef.current);
    }, [dni, clave]);

    const isContinueDisabled = !(validateDni(dni) && validateClave(clave));

    return (
        <Container maxWidth="md">
            <Typography variant='h4' color='#434242' fontWeight={600} paddingTop={12} textAlign="left">
                Cajero Automático TASI
            </Typography>
            <Grid container spacing={10} justifyContent="space-evenly" alignItems="center" style={{ marginTop: '2px' }}>
                <Grid item xs={12} sm={6} md={4} display="flex" flexDirection="column" alignItems="center">
                    <Typography pb={2} color={'#434242'} textAlign={'left'} variant='h6' width={'300px'}>Ingrese DNI y Clave</Typography>
                    <TextField
                        label="DNI"
                        value={dni}
                        onFocus={handleFocus('dni')}
                        inputProps={{ maxLength: 8 }}
                        fullWidth
                        variant="outlined"
                        sx={{
                            marginBottom: 2,
                            width: { xs: 250, sm: 280, md: 300 }
                        }}
                    />

                    <TextField
                        label="Clave"
                        value={clave}
                        onFocus={handleFocus('clave')}
                        type="password"
                        inputProps={{ maxLength: 4 }}
                        fullWidth
                        variant="outlined"
                        sx={{
                            width: { xs: 250, sm: 280, md: 300 }
                        }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '20vh' }}>
                        {errorMessage && focusedField === 'dni' && (
                            <Typography color="#913175">{errorMessage}</Typography>
                        )}
                        {errorMessage && focusedField === 'clave' && (
                            <Typography color="#913175">{errorMessage}</Typography>
                        )}
                    </Box>

                </Grid>
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
                                onClick={handleLogin}
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
        </Container >
    );
};

export default LoginForm;
