import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, Platform } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Colors from '../../consts/Colors';
import i18n from '../../locale/i18n';


const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')

const Slider = ({ navigation }) => {
    const [showRealApp, setshowRealApp] = useState(false)
    const slides = [
        {
            key: 'one',
            title: 'عنوان النص',
            text: 'هذا النص يمكن ان يستبدا في نفس المساحه ويمكن توليد هذا النص في نفس المساحه',
            image: require('../../assets/Images/stawseel.png'),
            backgroundColor: Colors.bg,
        },
        {
            key: 'two',
            title: 'عنوان النص',
            text: 'هذا النص يمكن ان يستبدا في نفس المساحه ويمكن توليد هذا النص في نفس المساحه',
            image: require('../../assets/Images/ftawseel.png'),
            backgroundColor: Colors.bg,
        },
        {
            key: 'three',
            title: 'عنوان النص',
            text: 'هذا النص يمكن ان يستبدا في نفس المساحه ويمكن توليد هذا النص في نفس المساحه',
            image: require('../../assets/Images/ttawseel.png'),
            backgroundColor: Colors.bg,

        }
    ];

    const renderItem = ({ item }) => {
        return (

            <View style={styles.slide}>
                <Image source={item.image} style={styles.ImgsSlide} />
                <View style={styles.container}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.text}>{item.text}</Text>
                </View>

            </View>
        );
    }
    const renderDoneButton = () => {
        return (
            <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textBtn}>
                    {i18n.t('start')}
                </Text>
            </TouchableOpacity>
        );
    };
    return (
        <AppIntroSlider
            renderItem={renderItem}
            data={slides} dotClickEnabled={true}
            dotStyle={styles.Dotted}
            activeDotStyle={styles.activeDoted}
            doneLabel={i18n.t('start')}
            renderDoneButton={renderDoneButton}

        />
    )
}

const styles = StyleSheet.create({
    slide:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.bg
    },
    container: {
        position: 'absolute',
        bottom: height * .22
    },
    ImgsSlide: {
        width,
        height: '100%'
    },
    title: {
        textAlign: 'center',
        fontSize: width * .06,
        fontFamily: 'flatMedium',
        color: Colors.fontBold
    },
    Dotted: {
        backgroundColor: Colors.IconBlack,
        width: 8,
        height: 8,
        bottom: 40


    },
    text: {
        paddingHorizontal: 20,
        fontFamily: 'flatMedium',
        lineHeight: 20,
        color: Colors.fontBold,
        paddingVertical: 5,
        fontSize: width * .026
    },
    activeDoted: {
        backgroundColor: Colors.sky,
        height: 10,
        width: 20,
        bottom: 40
    },
    Button: {
        bottom:-25,        
        width,
        backgroundColor: Colors.sky,
        flex: 1,
        marginHorizontal: -16,

    },
    textBtn: {
        color: Colors.bg,
        fontFamily: 'flatMedium',
        textAlign: 'center',
        padding: 10,
        fontWeight: '200',
        fontSize: 18
    }
})
export default Slider