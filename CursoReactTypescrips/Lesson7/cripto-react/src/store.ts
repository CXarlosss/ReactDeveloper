import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import  type{ CryptoPrice, Cryptocurrency, Pair } from './types'
import { getCryptos, fetchCurrentCryptoPrice } from './services/CryptoService'

type CryptoStore = {
    cryptocurrencies: Cryptocurrency[]
    result: CryptoPrice
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    result: {
        IMAGEURL : '',
        PRICE: '',
        HIGHDAY: '',
        LOWDAY: '',
        CHANGEPCT24HOUR: '',
        LASTUPDATE: ''
    },
    loading: false,
    // En tu archivo del store
fetchCryptos: async () => {
    console.log('fetchCryptos llamado');
    set({ loading: true });
    const cryptocurrencies = await getCryptos();
    console.log('Resultado de getCryptos:', cryptocurrencies);
    set({ cryptocurrencies, loading: false });
},
    fetchData: async (pair) => {
        set(() => ({
            loading: true
        }))
        const result = await fetchCurrentCryptoPrice(pair)
        set(() => ({
            result,
            loading: false
        }))
    }
})))