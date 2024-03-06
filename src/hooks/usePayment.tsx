import { useState } from 'react'
import { ApiIzipay } from '../api/apiIzipay';
import { MERCHANT_CODE, PUBLIC_KEY, REQUEST_SOURCE } from '../constants';
import { ResponseToken } from '../interfaces/ResponseToken';

export const usePayment = () => {

    const [responseToken, setResponseToken] = useState<ResponseToken>()

    const getTokenSession = async (transactionId: string, orderNumber: string, amount: string) => {

        const amountDecimal = String(parseFloat(amount).toFixed(2))
        const headers = { 'Content-Type': 'application/json', 'transactionId': transactionId }

        const data = {
            requestSource: REQUEST_SOURCE,
            merchantCode: MERCHANT_CODE,
            orderNumber,
            publicKey: PUBLIC_KEY,
            amount: amountDecimal
        }

        try {
            const response = await ApiIzipay
                .post<ResponseToken>('/security/v1/Token/Generate', data, {
                    headers
                })
            console.log("RESPONSE", JSON.stringify(response.data, null, 2))
            setResponseToken(response.data)
            // return response.data
        } catch (error) {
            console.log({ error })
        }
    }

    return {
        getTokenSession,
        responseToken
    }
}

