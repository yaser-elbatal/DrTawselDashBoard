import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { width, height } from '../consts/HeightWidth'

function BackBtn({ navigation }) {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/Images/bluBack.png')} style={styles.BGImage} resizeMode='contain' />
            <TouchableOpacity style={styles.Btn} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/Images/left.png')} style={styles.arrow} resizeMode='contain' />
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: -45,
        alignItems: 'flex-end',
        marginRight: -5

    },
    BGImage: {
        width: width * .25,
        height: width * .5,
    },
    Btn: {
        position: 'absolute',
        marginTop: width * .22,
    },
    arrow: {
        width: width * .08,
        height: height * .05,
        marginHorizontal: 30
    }

})
export default BackBtn
