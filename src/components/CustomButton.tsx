import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface Props {
    onPress: () => void,
    title: string
}

export const CustomButton = ({ onPress, title = '' }: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={{
                ...styles.buttonContainer,
                borderRadius: 8,
                backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onPress={onPress}
        >
            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 52,
        padding: 15,
        marginBottom: 10
    }
})