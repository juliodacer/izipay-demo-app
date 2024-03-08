import axios from "axios";

const ApiIzipay = axios.create({
    baseURL: 'https://sandbox-api-pw.izipay.pe:443'
})

export {
    ApiIzipay
}