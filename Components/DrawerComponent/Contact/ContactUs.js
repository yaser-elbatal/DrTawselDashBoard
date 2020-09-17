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
    const [email, setemail] = useState('');
    const [Message, setMessage] = useState(false);

    const [nameARStatus, setnameARStatus] = useState(0);
    const [emailStatues, setemailStatues] = useState('');
    const [MessageStatus, setMessageStatus] = useState(0);

    function activeInput(type) {
        if (type === 'nameAR' || nameAR !== '') setnameARStatus(1);
        if (type === 'email' || email !== '') setemailStatues(1);
        if (type === 'Message' || Message !== '') setMessageStatus(1);
    }



    function unActiveInput(type) {
        if (type === 'nameAR' && nameAR == '') setnameARStatus(0);
        if (type === 'email' && email == '') setemailStatues(0);
        if (type === 'Message' && Message == '') setMessageStatus(0);


    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bg }}>
            <Header navigation={navigation} label={i18n.t('contactus')} />
            <Card />
            <ScrollView style={{ flex: 1 }}>
                <InputIcon
                    label={nameARStatus === 1 ? i18n.t('username') : null}
                    placeholder={nameARStatus === 1 ? null : i18n.t('username')}
                    onBlur={() => unActiveInput('nameAR')}
                    onFocus={() => activeInput('nameAR')}
                    inputStyle={{ borderColor: nameARStatus === 1 ? Colors.sky : Colors.InputColor }}
                    onChangeText={(e) => setNameAr(e)}
                    value={nameAR}
                    styleCont={{ marginTop: 0 }}
                    LabelStyle={{ paddingHorizontal: nameARStatus === 1 ? 10 : 0, color: nameARStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                />
                <InputIcon
                    label={emailStatues === 1 ? i18n.t('email') : null}
                    placeholder={emailStatues === 1 ? null : i18n.t('email')}
                    onChangeText={(e) => setemail(e)}
                    value={email}
                    inputStyle={{ borderColor: emailStatues === 1 ? Colors.sky : Colors.InputColor }}
                    LabelStyle={{ paddingHorizontal: emailStatues === 1 ? 10 : 0, color: emailStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                    onBlur={() => unActiveInput('email')}
                    onFocus={() => activeInput('email')}
                    keyboardType='email-address'
                    styleCont={{ marginTop: 0 }}
                />
                <InputIcon
                    label={MessageStatus === 1 ? i18n.t('email') : null}
                    placeholder={MessageStatus === 1 ? null : i18n.t('email')}
                    onChangeText={(e) => setMessage(e)}
                    value={Message}
                    inputStyle={{ borderColor: MessageStatus === 1 ? Colors.sky : Colors.InputColor }}
                    LabelStyle={{ paddingHorizontal: MessageStatus === 1 ? 10 : 0, color: MessageStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                    onBlur={() => unActiveInput('Message')}
                    onFocus={() => activeInput('Message')}
                    styleCont={{ marginTop: 0 }}
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
