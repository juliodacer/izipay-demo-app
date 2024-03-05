import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CustomTextInput } from '../components/CustomInputText';
import { ApiIzipay } from '../api/apiIzipay';
import { useInputText } from '../hooks/useInputText';
import { CustomButton } from '../components/CustomButton';
import { usePayment } from '../hooks/usePayment';
import { EmbebedScreenIzipay } from './EmbebedScreenIzipay';
import { useDataOrderDynamic } from '../hooks/useDataOrderDynamic';

export const MainScreenIzipay = () => {

    const { onChange, value } = useInputText()
    const { GetTokenSession, responseToken } = usePayment()
    const [modalVisible, setModalVisible] = useState(false);
    const { getDataOrderDynamic, dataOrderDynamic } = useDataOrderDynamic()

    useEffect(() => {
        if (dataOrderDynamic !== null && dataOrderDynamic !== undefined) {
            GetTokenSession(dataOrderDynamic.transactionId, dataOrderDynamic.orderNumber, value)
        }
    }, [dataOrderDynamic])

    const paySubmit = () => {
        getDataOrderDynamic()
    }

    useEffect(() => {
        if (responseToken !== undefined && responseToken !== null) {
            console.log("TOKEN", JSON.stringify(responseToken.response.token))
            setModalVisible(true)
        }
    }, [responseToken])

    return (
        <View style={styles.container}>
            <View style={styles.containerInputText}>
                <CustomTextInput
                    placeholder='Ingresa Monto a pagar 00.00'
                    onChange={onChange}
                    value={value}
                />
            </View>
            <View style={styles.containerButton}>
                <CustomButton
                    onPress={paySubmit}
                    title='Pagar'
                />
            </View>
            {
                <EmbebedScreenIzipay
                    modalVisible={modalVisible}
                    amount={value}
                    orderNumber={dataOrderDynamic?.orderNumber}
                    transactionId={dataOrderDynamic?.transactionId}
                    setModalVisible={setModalVisible}
                    token={responseToken?.response.token}
                    currentTimeUnix={dataOrderDynamic?.currentTimeUnix}
                // url={hr}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    containerInputText: {
        marginHorizontal: 10
    },
    containerButton: {
        marginVertical: 20,
        width: "80%"
    }
});