import React, { useState } from 'react'
import { View, Text, Image, Dimensions, StyleSheet, FlatList, ScrollView, } from 'react-native';
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors';
import Card from '../../../common/Card';
import BTN from '../../../common/BTN';
import { InputIcon } from '../../../common/InputText';

const { width } = Dimensions.get('window')


function ContactUs({ navigation }) {
    const [nameAR, setNameAr] = useState('');
    const [email, setemail] = useState('')

    const Orderdata = [{
        id: 'K0',
        title: `${i18n.t('IncomingRequests')}`,
        number: `100 ${i18n.t('order')}`,
        color: [Colors.GradianYellow, Colors.GradianYellow2]
    },
    {
        id: 'K1',
        title: `${i18n.t('ActiveRequests')}`,
        number: `100 ${i18n.t('order')}`,
        color: [Colors.GradianGreen, Colors.GradianGreen2]
    },
    {
        id: 'K2',
        title: `${i18n.t('Completedrequests')}`,
        number: `100 ${i18n.t('order')}`,
        color: [Colors.GradianRed, Colors.GradianRed2]
    }


        ,
    ]

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bg }}>
            <Header navigation={navigation} label={i18n.t('contactus')} />
            <Card />
            <ScrollView style={{ flex: 1 }}>
                <InputIcon
                    label={i18n.t('username')}
                    placeholder={i18n.t('username')}
                    inputStyle={{ borderColor: Colors.sky }}
                    onChangeText={(e) => setNameAr(e)}
                    value={nameAR}
                    LabelStyle={{ paddingHorizontal: 10, color: Colors.sky, fontSize: 14 }}
                />
                <InputIcon
                    placeholder={i18n.t('email')}
                    onChangeText={(e) => setemail(e)}
                    value={email}
                    keyboardType='email-address'
                    styleCont={{ marginTop: 0 }}
                />
                <InputIcon
                    placeholder={i18n.t('writeMsg')}
                    inputStyle={{ borderColor: '#eaeaea', textAlignVertical: 'top', paddingTop: 10, borderRadius: 5 }}
                    styleCont={{ height: width * .49, marginHorizontal: '5%', marginTop: 0 }}
                />
                <BTN title={i18n.t('send')} ContainerStyle={styles.LoginBtn} onPress={() => { }} />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    Linear: {
        borderTopStartRadius: 0,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        marginStart: 5,
        marginTop: 10,
        marginEnd: 5,
        height: 110,
        width: width * .3,
        flex: 1

    },
    Text: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.bg,
        textAlign: 'center'
    },
    CardText: {
        fontFamily: 'flatMedium',
        fontSize: 13,
        color: Colors.IconBlack,
        marginVertical: 5
    },
    LoginBtn: {
        marginVertical: 10,
        borderRadius: 5,
        width: '90%',
        marginHorizontal: '5%',
        marginTop: 0

    },
    Card: {
        height: 140,
        shadowColor: Colors.bg,
        margin: 10,
        borderRadius: 10,
        backgroundColor: Colors.bg,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        overflow: 'hidden',
    },

})

export default ContactUs
