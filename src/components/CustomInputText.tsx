import React from 'react'
import { TextInput, StyleSheet, KeyboardType } from 'react-native'

interface Props {
    icon?: string,
    placeholder: string,
    value: string,
    keyboardType?: KeyboardType,
    secureTextEntry?: boolean,
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
        <TextInput
            style={styles.formTextInput}
            placeholder={placeholder}
            keyboardType={keyboardType}
            value={value}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
            editable={editable}
        />
    )
}

const styles = StyleSheet.create({
    formInput: {
        width: "90%",
        alignItems: 'center',
    },
    formTextInput: {
        borderWidth: 1,
        borderColor: '#AAAAAA',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
})
