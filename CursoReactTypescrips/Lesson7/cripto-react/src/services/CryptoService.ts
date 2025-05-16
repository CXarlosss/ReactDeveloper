// CryptoService.ts
import axios from 'axios';
import { CryptoCurrencyApiResponseSchema, CryptoPriceSchema } from '../schema/crypto-schema';
import type { Pair } from '../types';

export async function getCryptos() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';
    const response = await axios(url); // Obtén la respuesta completa
    const result = CryptoCurrencyApiResponseSchema.safeParse(response.data); // Parsea la respuesta completa
    if (result.success) {
        return result.data.Data; // Devuelve el array dentro de la propiedad Data
    } else {
        console.error('Error al parsear la respuesta de criptomonedas:', result.error);
        return [];
    }
}

export async function fetchCurrentCryptoPrice(pair: Pair) {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.criptocurrency}&tsyms=${pair.currency}`;
    const { data: { DISPLAY } } = await axios(url);
    const result = CryptoPriceSchema.safeParse(DISPLAY[pair.criptocurrency][pair.currency]);
    if (result.success) {
        return result.data;
    } else {
        console.error('Error al parsear el precio de la criptomoneda:', result.error);
        return {
            IMAGEURL: '',
            PRICE: '',
            HIGHDAY: '',
            LOWDAY: '',
            CHANGEPCT24HOUR: '',
            LASTUPDATE: '',
        }; // Devuelve un objeto vacío o un valor por defecto
    }
}