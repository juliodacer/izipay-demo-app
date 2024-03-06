import React, { useEffect } from 'react'
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

export const EmbebedScreenIzipay = ({
    amount,
    orderNumber,
    transactionId,
    modalVisible,
    setModalVisible,
    token,
    currentTimeUnix
}: Props) => {

    const amountDecimal = String(parseFloat(amount).toFixed(2))

    const HTML2 = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title></title>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="mobile-web-app-capable" content="yes" />
        <script src="https://testcheckout.izipay.pe/payments/v1/js/index.js"></script>
      </head>
      <body>
        <div id='your-iframe-payment'></div>
        <pre id="payment-message"></pre>
        <script>
        // alert(JSON.stringify("${token}"))
        const iziConfig = {
            // publicKey: "${PUBLIC_KEY}",
            config: {
                transactionId: "${transactionId}",
                action: 'pay',
                merchantCode: "${MERCHANT_CODE}",
                order: {
                    orderNumber: "${orderNumber}",
                    currency: "${ORDER_CURRENCY}",
                    amount: "${amountDecimal}",
                    processType: 'AT',
                    merchantBuyerId: 'mc1768x',
                    // dateTimeTransaction: '1670258741603000', //currentTimeUnix
                    dateTimeTransaction: "${currentTimeUnix}"
                },
                card: {
                    brand: '',
                    pan: '',
                },
                billing: {
                    firstName: 'Darwin',
                    lastName: 'Paniagua',
                    email: 'demo@izipay.pe',
                    phoneNumber: '989339999',
                    street: 'calle el demo',
                    city: 'lima',
                    state: 'lima',
                    country: 'PE',
                    postalCode: '00001',
                    document: '12345678',
                    documentType: 'DNI',
                },
                render: {
                    typeForm: 'pop-up',
                    container: '#your-iframe-payment',
                    showButtonProcessForm: true,
                    redirectUrls:{
                        onSuccess:"https://server.punto-web.com/comercio/creceivedemo.asp?p=h1",
                        onError:"https://127.0.0.1:5501/onError",
                        onCancel:"https://127.0.0.1:5501/public/index.html"
                    }
                },
                urlRedirect:'https://server.punto-web.com/comercio/creceivedemo.asp?p=h1',
                appearance: {
                    logo: 'https://demo-izipay.azureedge.net/test/img/millasb.svg',
                },
            },
        };

        // alert(JSON.stringify(iziConfig))
        // const callbackResponsePayment = response => document.querySelector('#payment-message').innerHTML = JSON.stringify(response, null, 2);
        // const callbackResponsePayment3 = response => window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'myCustomEvent', JSON.stringify(response, null, 2) }));
        const callbackResponsePayment = response => alert("HOLA")

        const handleLoadForm = () => {
            try {
                // alert(JSON.stringify(iziConfig))
                const izi = new Izipay({
                    publicKey: iziConfig?.publicKey,
                    config: iziConfig?.config,
                });

                // alert(JSON.stringify(izi))

                izi &&
                izi.LoadForm({
                    authorization: "${token}",
                    keyRSA: 'RSA',
                    // callbackResponse: callbackResponsePayment,
                    callbackResponse: function (params) {
                        window.ReactNativeWebView.postMessage("desde la web") 
                      }
                });

            } catch (error) {
                alert(JSON.stringify(error))
                console.log(error.message, error.Errors, error.date);
            }
        };

        setTimeout(() => {
            handleLoadForm()
          }, 500)

        </script>
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
                        style={{ flex: 1 }}
                        originWhitelist={['*']}
                        javaScriptEnabledAndroid={true}
                        javaScriptEnabled={true}
                        bounces={false}
                        automaticallyAdjustContentInsets={true}
                        onError={(syntheticEvent) => {
                            const { nativeEvent } = syntheticEvent;
                            console.warn('WebView error: ', nativeEvent);
                        }}
                        onMessage={(event) => {
                            console.log({ event })
                        }}
                    // injectedJavaScript={`
                    // alert("${String(currentTimeUnix).length}")
                    // const iziConfig = {
                    //     publicKey: "${PUBLIC_KEY}",
                    //     config: {
                    //         transactionId: "${transactionId}",
                    //         action: "pay",
                    //         merchantCode: "${MERCHANT_CODE}",
                    //         order: {
                    //             orderNumber:  "${orderNumber}",
                    //             currency: "${ORDER_CURRENCY}",
                    //             amount: "${amoutDecimal}",
                    //             processType: "AT",
                    //             merchantBuyerId: "mc1768",
                    //             dateTimeTransaction: "1670258741603000",
                    //             //dateTimeTransaction: "${currentTimeUnix}",
                    //         },
                    //         card: {
                    //             brand: "",
                    //             pan: "",
                    //         },
                    //         billing: {
                    //             firstName: "Darwin",
                    //             lastName: "Paniagua",
                    //             email: "demo@izipay.pe",
                    //             phoneNumber: "989339999",
                    //             street: "calle el demo",
                    //             city: "lima",
                    //             state: "lima",
                    //             country: "PE",
                    //             postalCode: "00001",
                    //             document: "12345678",
                    //             documentType: "DNI",
                    //         },
                    //         render: {
                    //             typeForm: "pop-up",
                    //             container: "#your-iframe-payment",
                    //             showButtonProcessForm: true
                    //         },
                    //         urlRedirect:"https://server.punto-web.com/comercio/creceivedemo.asp?p=h1",
                    //         appearance: {
                    //             logo: "https://demo-izipay.azureedge.net/test/img/millasb.svg",
                    //         },
                    //     },
                    // };

                    // const callbackResponsePayment = response => JSON.stringify(response, null, 2);

                    // function handleLoadForm() {
                    //     // alert(JSON.stringify(iziConfig?.config))
                    //     // alert(JSON.stringify(iziConfig?.publicKey))
                    //     try {
                    //         alert(JSON.stringify("${token}"))
                    //         const izi = new Izipay({
                    //             publicKey: iziConfig?.publicKey,
                    //             config: iziConfig?.config,
                    //         });
                    //         alert(JSON.stringify(izi))
                    //         izi &&
                    //         izi.LoadForm({
                    //             authorization: "Bearer ${token}",
                    //             keyRSA: "RSA",
                    //             callbackResponse: callbackResponsePayment,
                    //         });
                    //     } catch (error) {
                    //         alert(error.message)
                    //         console.log(error.message, error.Errors, error.date);
                    //     }
                    // };

                    // handleLoadForm();

                    // `}
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