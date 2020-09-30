import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, I18nManager, Platform, AsyncStorage, ActivityIndicator } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Colors from '../../consts/Colors';
import i18n from '../../locale/i18n';
import I18n from "i18n-js";

import { useSelector, useDispatch } from 'react-redux';
import { IntroService } from '../../store/action/IntroAction';
// import Container from '../../common/Container';


const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')

const Slider = ({ navigation }) => {

    const Intro = useSelector(state => state.intro.intro)
    const lang = useSelector(state => state.lang.language);
    const [spinner, setSpinner] = useState(true);
    const dispatch = useDispatch()


    useEffect(() => {

        dispatch(IntroService(lang)).then(() => setSpinner(false))

        const direction = AsyncStorage.getItem("direction");
        if (direction) {
            navigation.navigate("Login");
        }


    }, []);



    const slides = Intro.map(int => ({ key: int.title, title: int.title, text: int.details, image: { uri: int.image }, backgroundColor: 'red', }))

    // const slides = [
    //     {
    //         key: 'one',
    //         title: 'عنوان النص',
    //         text: 'هذا النص يمكن ان يستبدا في نفس المساحه ويمكن توليد هذا النص في نفس المساحه',
    //         image: require('../../assets/Images/stawseel.png'),
    //     },
    //     {
    //         key: 'two',
    //         title: 'عنوان النص',
    //         text: 'هذا النص يمكن ان يستبدا في نفس المساحه ويمكن توليد هذا النص في نفس المساحه',
    //         image: require('../../assets/Images/ftawseel.png'),
    //     },
    //     {
    //         key: 'three',
    //         title: 'عنوان النص',
    //         text: 'هذا النص يمكن ان يستبدا في نفس المساحه ويمكن توليد هذا النص في نفس المساحه',
    //         image: require('../../assets/Images/ttawseel.png'),

    //     }
    // ];


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
        <View style={{ flex: 1 }}>

            <AppIntroSlider
                renderItem={renderItem}
                data={slides}
                dotClickEnabled={true}
                dotStyle={styles.Dotted}
                activeDotStyle={styles.activeDoted}
                doneLabel={i18n.t('start')}
                renderDoneButton={renderDoneButton}

            />
        </View>
    )
}


const styles = StyleSheet.create({
    slide:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.BgBlue
    },
    container: {
        position: 'absolute',
        bottom: height * .22
    },
    ImgsSlide: {
        width,
        height
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
        fontSize: width * .026,
        alignSelf: I18nManager.isRTL ? 'flex-start' : 'flex-end',
        textAlign: I18nManager.isRTL ? 'right' : 'left'
    },
    activeDoted: {
        backgroundColor: Colors.sky,
        height: 10,
        width: 20,
        bottom: 40
    },
    Button: {
        bottom: Platform.OS === 'ios' ? -25 : -20,
        width,
        backgroundColor: Colors.sky,
        flex: 1,
        marginHorizontal: -16,
        alignItems: 'center'

    },
    textBtn: {
        color: Colors.bg,
        fontFamily: 'flatMedium',
        textAlign: 'center',
        padding: 15,
        fontWeight: '200',
        fontSize: 18
    }
})
export default Slider