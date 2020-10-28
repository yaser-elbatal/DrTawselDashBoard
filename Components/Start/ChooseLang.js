import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import { Content } from 'native-base';
import i18n from '../../locale/i18n'
import { width } from '../../consts/HeightWidth';
import Colors from '../../consts/Colors';
import { useDispatch } from 'react-redux';
import { changeLanguage } from '../../store/action/LangAction';
import Lang from '../DrawerComponent/Settings/Lang';

function ChooseLang({ navigation }) {

    const [lan, setLang] = useState('')

    const dispatch = useDispatch();

    const changeLang = async (lang, direction) => {
        await dispatch(changeLanguage(lang, direction,));


    };

    AsyncStorage.getItem("lang").then((value) => {
        setLang(value);
    })

    useEffect(() => {
        const direction = AsyncStorage.getItem("direction");
        if (direction) {
            navigation.navigate("Home");
        }

    }, [])

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }} >
                <Image source={require('../../assets/Images/DrTawsell.png')} style={{ height: 150, width: 150 }} resizeMode='contain' />
                <Text style={{ fontFamily: 'flatMedium', }}>{i18n.t('chooseLang')}</Text>

                <TouchableOpacity onPress={() => { changeLang("ar", "RTL") }} style={{ backgroundColor: lan === 'ar' ? Colors.sky : '#F7F7F7', width: 200, height: 150, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 20, flexDirection: 'column' }}>
                    <Image source={require('../../assets/Images/saudi_arabia.png')} style={{ height: 100, width: 100 }} resizeMode='contain' />
                    <Text style={{ fontFamily: 'flatMedium', }}>{i18n.t('Arabic')}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { changeLang("en", "LTR") }} style={{ backgroundColor: lan === 'en' ? Colors.sky : '#F7F7F7', width: 200, height: 150, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 20, flexDirection: 'column' }}>
                    <Image source={require('../../assets/Images/english_language.png')} style={{ height: 100, width: 100 }} resizeMode='contain' />
                    <Text style={{ fontFamily: 'flatMedium', }}>{i18n.t('English')}</Text>
                </TouchableOpacity>

            </View>
        </View>

    )
}

export default ChooseLang
