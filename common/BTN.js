import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'
import Colors from '../consts/Colors'
const { width } = Dimensions.get('window')

function BTN({
    title,
    onPress,
    TextStyle,
    ContainerStyle,
    disabled
}) {
    return (
        <TouchableOpacity style={[styles.container, ContainerStyle]} onPress={onPress} disabled={disabled}>
            <Text style={[styles.sText, TextStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.sky,
        width: '85%',
        marginHorizontal: 30,
        height: 45,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sText: {
        fontFamily: 'flatMedium',
        color: Colors.bg,
        fontSize: 16,
        textAlign: 'center',
    }
})
export default BTN
