import React, { useState } from 'react'
import { View, TouchableOpacity, Image, Text, ScrollView, StyleSheet } from 'react-native'

import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import { InputIcon } from '../../../common/InputText'
import Colors from '../../../consts/Colors'
import BTN from '../../../common/BTN'

function RestaurantInfo({ navigation }) {
    const [nameAR, setNameAr] = useState('');
    const [nameEN, setNameEN] = useState('')
    const [password, setPassword] = useState('');
    const [Select, setSelect] = useState(false)

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bg }}>
            <Header navigation={navigation} label={i18n.t('RestInfo')} />
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <TouchableOpacity>
                    <Image source={require('../../../assets/Images/add_photo.png')} style={{ width: 100, height: 100, marginTop: 30, alignSelf: 'center' }} />
                </TouchableOpacity>

                <InputIcon
                    label={i18n.t('ResNameAr')}
                    placeholder={i18n.t('ResNameAr')}
                    inputStyle={{ borderColor: Colors.sky }}
                    onChangeText={(e) => setNameAr(e)}
                    value={nameAR}
                    LabelStyle={{ paddingHorizontal: 10, color: Colors.sky, fontSize: 14 }}
                />
                <InputIcon
                    placeholder={i18n.t('ResNameEn')}
                    onChangeText={(e) => setNameEN(e)}
                    value={nameEN}
                    styleCont={{ marginTop: 0 }}
                />
                <InputIcon
                    placeholder={i18n.t('ResSite')}
                    styleCont={{ marginTop: 0 }}
                    image={require('../../../assets/Images/location_gray.png')}
                />

                <Text style={{ fontFamily: 'flatMedium', color: Colors.IconBlack, marginHorizontal: '5%' }}>{i18n.t('preparationTime')}</Text>

                <View style={{ flexDirection: 'row', }}>
                    <InputIcon
                        placeholder={i18n.t('from')}
                        styleCont={{ marginTop: 20, width: '40%' }}
                    />
                    <InputIcon
                        placeholder={i18n.t('to')}
                        styleCont={{ marginTop: 20, width: '40%', }}
                    />
                </View>
                <InputIcon
                    placeholder={i18n.t('password')}
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                    styleCont={{ marginTop: 0 }}

                />
                <View style={styles.Container}>
                    <Text style={styles.text}>{i18n.t('ResState')}</Text>
                    <TouchableOpacity onPress={() => setSelect(!Select)}>
                        {
                            Select ?
                                <Image source={require('../../../assets/Images/on_notifcatiom.png')} style={styles.BImg} resizeMode='contain' />
                                :
                                <Image source={require('../../../assets/Images/off_notifcatiom.png')} style={styles.BImg} resizeMode='contain' />

                        }
                    </TouchableOpacity>
                </View>
                <BTN title={i18n.t('save')} ContainerStyle={styles.LoginBtn} onPress={() => navigation.navigate('HomePage')} />

            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        padding: 10,
        alignItems: 'center',
    },

    BImg: {
        height: 50,
        width: 50,
    },

    text: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.fontNormal
    },
    LoginBtn: {
        borderRadius: 5,
        marginHorizontal: '6%',
        marginVertical: 25
    }
})
export default RestaurantInfo
