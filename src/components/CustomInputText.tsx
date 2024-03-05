import React, { useState } from 'react'
import { View, Image, TextInput, StyleSheet, KeyboardType } from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons'

interface Props {
    icon?: string,
    placeholder: string,
    value: string,
    keyboardType?: KeyboardType,
    secureTextEntry?: boolean,
    // property: string,
    editable?: boolean,
    onChange: (value: string) => void
}

export const CustomTextInput = ({
    icon,
    placeholder,
    value,
    keyboardType = 'default',
    secureTextEntry = false,
    editable = true,
    onChange

}: Props) => {

    return (
        <View style={styles.formInput}>
            <TextInput
                style={styles.formTextInput}
                placeholder={placeholder}
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChange}
                secureTextEntry={secureTextEntry}
                editable={editable}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    formInput: {
        flexDirection: 'row',
        // marginTop: 30,
        alignItems: 'center'
    },
    formTextInput: {
        width: "90%",
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA',
        marginLeft: 15
    },
})
