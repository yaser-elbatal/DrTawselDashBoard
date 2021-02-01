import React from 'react'
import { Toast } from 'native-base'

const ToasterNative = (text, type, position) => {
    return (
        Toast.show({
            text: text,
            type: type,
            duration: 3000,
            position: position,
            textStyle: {
                color: "white",
                fontFamily: 'flatMedium',
                textAlign: 'center',
                alignSelf: 'center'
            }
        })
    )
}

export { ToasterNative }
