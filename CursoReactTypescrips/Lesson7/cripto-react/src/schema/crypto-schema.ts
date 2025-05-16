// /src/schema/crypto-schema.ts
import { z } from 'zod';

export const CryptoCurrencyInfoSchema = z.object({
    Id: z.string(),
    Name: z.string(),
    Symbol: z.string().optional(),
    FullName: z.string(),
    Url: z.string().optional(),
    ImageUrl: z.string().optional(),
    Algorithm: z.string().optional(),
    ProofType: z.string().optional(),
    Rating: z.object({
        Weiss: z.object({
            Rating: z.string().optional(),
            TechnologyAdoptionRating: z.string().optional(),
            MarketPerformanceRating: z.string().optional(),
        }).optional(),
    }).optional(),
    NetHashesPerSecond: z.number().optional(),
    TotalCoinsMined: z.number().optional(),
    BlockNumber: z.number().optional(),
    BlockTime: z.number().optional(),
    BlockReward: z.number().optional(),
    Type: z.number().optional(),
});

export const CryptoCurrencyDataSchema = z.object({
    CoinInfo: CryptoCurrencyInfoSchema,
    DISPLAY: z.object({
        USD: z.object({
            FROMSYMBOL: z.string().optional(),
            TOSYMBOL: z.string().optional(),
            MARKET: z.string().optional(),
            PRICE: z.string().optional(),
            LASTUPDATE: z.string().optional(),
            MEDIAN: z.string().optional(),
            HIGH24HOUR: z.string().optional(),
            LOW24HOUR: z.string().optional(),
            CHANGE24HOUR: z.string().optional(),
            CHANGEPCT24HOUR: z.string().optional(),
            CHANGEDAY: z.string().optional(),
            CHANGEPCTDAY: z.string().optional(),
            SUPPLY: z.string().optional(),
            MKTCAP: z.string().optional(),
            TOTALVOLUME24H: z.string().optional(),
            TOTALVOLUME24HTO: z.string().optional(),
            VOLUME24HOUR: z.string().optional(),
            VOLUME24HOURTO: z.string().optional(),
            OPEN24HOUR: z.string().optional(),
            AVG24HOUR: z.string().optional(),
            LOWDAY: z.string().optional(),
            HIGHDAY: z.string().optional(),
            LASTMARKET: z.string().optional(),
            VOLUMEHOUR: z.string().optional(),
            VOLUMEHOURTO: z.string().optional(),
            OPENHOUR: z.string().optional(),
            HIGHHOUR: z.string().optional(),
            LOWHOUR: z.string().optional(),
            AVGHOUR: z.string().optional(),
            LASTTRADEID: z.string().optional(),
            LASTVOLUME: z.string().optional(),
            LASTVOLUMETO: z.string().optional(),
            LASTTRADE: z.string().optional(),
        }).optional(),
    }).optional(),
});

export const CryptoCurrencyApiResponseSchema = z.object({
    Data: z.array(CryptoCurrencyDataSchema),
});

export type CryptoCurrencyResponse = z.infer<typeof CryptoCurrencyApiResponseSchema>['Data'];

export const PairSchema = z.object({
    currency: z.string(),
    criptocurrency: z.string(),
});

export const CryptoPriceSchema = z.object({
    IMAGEURL: z.string(),
    PRICE: z.string(),
    HIGHDAY: z.string(),
    LOWDAY: z.string(),
    CHANGEPCT24HOUR: z.string(),
    LASTUPDATE: z.string(),
});

export type Pair = z.infer<typeof PairSchema>;
export type CryptoPrice = z.infer<typeof CryptoPriceSchema>;