import { useState } from 'react'
import { ApiIzipay } from '../api/apiIzipay';
import { MERCHANT_CODE, PUBLIC_KEY, REQUEST_SOURCE } from '../constants';
import { ResponseToken } from '../interfaces/ResponseToken';

export const usePayment = () => {

    const [responseToken, setResponseToken] = useState<ResponseToken>()

    // {
    //     "amount": "1.99",
    //     "merchantCode": "4004345",
    //     "orderNumber": "1709563217",
    //     "publicKey": "VErethUtraQuxas57wuMuquprADrAHAb",
    //     "requestSource": "ECOMMERCE"
    //   }

    const GetTokenSession = async (transactionId: string, orderNumber: string, amount: string = '') => {

        const amoutDecimal = String(parseFloat(amount).toFixed(2))
        const headers = { 'Content-Type': 'application/json', 'transactionId': transactionId }

        const data = {
            requestSource: REQUEST_SOURCE,
            merchantCode: MERCHANT_CODE,
            orderNumber,
            publicKey: PUBLIC_KEY,
            amount: amoutDecimal,
        }

        try {
            const response = await ApiIzipay.post<ResponseToken>('/security/v1/Token/Generate', data, {
                headers
            })
            setResponseToken(response.data)
            // return response.data
        } catch (error) {
            console.log({ error })
        }
    }

    return {
        GetTokenSession,
        responseToken
    }
}

