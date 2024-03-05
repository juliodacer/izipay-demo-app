import { useState } from 'react'

export const useInputText = () => {
    const [value, setValue] = useState("");

    const onChange = (text: string) => {
        setValue(text)
    };

    return {
        value,
        onChange,
    }
}