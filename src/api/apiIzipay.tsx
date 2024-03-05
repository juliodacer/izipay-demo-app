import axios from "axios";

const ApiIzipay = axios.create({
    baseURL: 'https://testapi-pw.izipay.pe:443'
})

export {
    ApiIzipay
}