import React from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import WebView from 'react-native-webview'
import { MERCHANT_CODE, ORDER_CURRENCY, PUBLIC_KEY } from '../constants';

interface Props {
    modalVisible: boolean
    setModalVisible: (value: boolean) => void
    url?: string,
    transactionId?: string,
    orderNumber?: string,
    amount: string,
    token?: string,
    currentTimeUnix?: number
}

export const EmbebedScreenIzipay = ({ amount, orderNumber, transactionId, modalVisible, setModalVisible, url, token, currentTimeUnix }: Props) => {

    console.log('EMBEBIDED', {
        amount, orderNumber, transactionId, modalVisible, url, token, currentTimeUnix
    })

    const amoutDecimal = String(parseFloat(amount).toFixed(2))

    const HTML2 = `
    <html>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>Example Checkout izipay</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script src="https://sandbox-checkout.izipay.pe/payments/v1/js/index.js"></script>
      <script src="https://testcheckout.izipay.pe/payments/v1/js/index.js"></script>
    </head>
    <body id="root">
      <div id="your-iframe-payment"></div>
    </body>
  </html>
    `
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '100%', height: '100%' }}>
                    <WebView
                        source={{ html: HTML2 }}
                        injectedJavaScript={`
                        // alert("${String(currentTimeUnix).length}")
                        var iziConfig = {
                            publicKey: "${PUBLIC_KEY}",
                            config: {
                                transactionId: "${transactionId}",
                                action: "pay",
                                merchantCode: "${MERCHANT_CODE}",
                                order: {
                                    orderNumber:  "${orderNumber}",
                                    currency: "${ORDER_CURRENCY}",
                                    amount: "${amoutDecimal}",
                                    processType: "AT",
                                    merchantBuyerId: "mc1768",
                                    dateTimeTransaction: "1670258741603000",
                                    //dateTimeTransaction: "${currentTimeUnix}",
                                },
                                card: {
                                    brand: "",
                                    pan: "",
                                },
                                billing: {
                                    firstName: "Darwin",
                                    lastName: "Paniagua",
                                    email: "demo@izipay.pe",
                                    phoneNumber: "989339999",
                                    street: "calle el demo",
                                    city: "lima",
                                    state: "lima",
                                    country: "PE",
                                    postalCode: "00001",
                                    document: "12345678",
                                    documentType: "DNI",
                                },
                                render: {
                                    typeForm: "pop-up",
                                    container: "#your-iframe-payment",
                                    showButtonProcessForm: true
                                },
                                urlRedirect:"https://server.punto-web.com/comercio/creceivedemo.asp?p=h1",
                                appearance: {
                                    logo: "https://demo-izipay.azureedge.net/test/img/millasb.svg",
                                },
                            },
                        };

                        const callbackResponsePayment = response => JSON.stringify(response, null, 2);
                
                        function handleLoadForm() {
                            // alert(JSON.stringify(iziConfig?.config))
                            // alert(JSON.stringify(iziConfig?.publicKey))
                            try {
                                // alert(JSON.stringify("${token}"))
                                const izi = new Izipay({
                                    publicKey: iziConfig?.publicKey,
                                    config: iziConfig?.config,
                                });
                                alert(JSON.stringify(izi))
                                izi &&
                                izi.LoadForm({
                                    authorization: "Bearer ${token}",
                                    keyRSA: "RSA",
                                    callbackResponse: callbackResponsePayment,
                                });
                            } catch (error) {
                                alert(error.message)
                                console.log(error.message, error.Errors, error.date);
                            }
                        };
        
                        handleLoadForm();
        
                        `}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Text style={{ textAlign: 'center', marginTop: 10, color: 'blue' }}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({

});