export const validateDni = (dni) => {
    const regex = /^\d{7,8}$/;
    return regex.test(dni);
};

export const validateClave = (clave) => {
    const regex = /^\d{4}$/;
    return regex.test(clave);
};