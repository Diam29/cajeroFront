import { create } from 'zustand';
import axios from 'axios';

// const URL = 'http://localhost:3000';
const URLRender = 'https://cajero-nestjs.onrender.com'

const useAuthStore = create((set, get) => ({
  userData: null,
  saldo: null,
  saldoInsuficiente: false,

  login: async (dni, key) => {
    try {
      const response = await axios.post(`${URLRender}/auth/login`, {
        dni: Number(dni),
        key: Number(key),
      });
      set({ userData: response.data });
      return response.data.user.name;
    } catch (error) {
      console.error('Error al iniciar sesión: ', error.response.data.message);
      throw error;
    }
  },

  realizarExtraccion: async (id, monto) => {
    try {
      const { userData } = get();
      const response = await axios.patch(`${URLRender}/user/extraccion/${id}`, { extraccion: monto }, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al realizar la extracción:', error.response.data.message);
      throw error;
    }
  },

  consultaSaldo: async (id) => {
    console.log('entre al consulta saldo auth')
    try {
      const { userData } = get()
      const response = await axios.get(`${URLRender}/user/saldo/${id}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      // set({ saldo: response.data })
      return response.data
    } catch (error) {
      console.log('Error al consultar el saldo', error.response.data.message)
      throw error
    }
  },

  realizarDeposito: async (id, monto) => {
    try {
      const { userData } = get();
      const response = await axios.patch(`${URLRender}/user/deposito/${id}`, { deposito: monto }, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al realizar la extracción:', error.response.data.message);
      throw error;
    }
  }

}));



export default useAuthStore;
