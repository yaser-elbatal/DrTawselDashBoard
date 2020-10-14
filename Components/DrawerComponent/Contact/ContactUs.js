import React, { useState } from 'react'
import { View, Text, Image, Dimensions, StyleSheet, FlatList, ScrollView, } from 'react-native';
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors';
import Card from '../../../common/Card';
import BTN from '../../../common/BTN';
import { InputIcon } from '../../../common/InputText';
import { validateUserName, validateEmail } from '../../../common/Validation';
import Container from '../../../common/Container';
import { SendComplaiment } from '../../../store/action/CommentsAction';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from '../../../common/Toaster';

const { width } = Dimensions.get('window')


function ContactUs({ navigation }) {
    const [name, setName] = useState('');
    const [email, setemail] = useState('');
    const [Message, setMessage] = useState('');
    const token = useSelector(state => state.auth.user.data.token)
    const [spinner, setSpinner] = useState(true);

    const dispatch = useDispatch();

    const _validate = () => {


        let nameA = validateUserName(name)
        let emailErr = validateEmail(email);
        let MessageErr = Message == '' ? 'Enter Detailes' : null
        return nameA || emailErr || MessageErr
    }

    const SendComplaimentation = () => {
        let val = _validate()
        if (!val) {
            setSpinner(true)
            dispatch(SendComplaiment(token, name, email, Message, navigation))
            setName('')
            setMessage('')
            setemail('')
            setSpinner(false)
        }
        else {
            setSpinner(false)
            Toaster(_validate());

        }
    }

    return (
        <Container loading={spinner}>
            <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }}>
                <Header navigation={navigation} label={i18n.t('contactus')} />
                <Card />
                <InputIcon
                    label={i18n.t('username')}
                    placeholder={i18n.t('username')}
                    onChangeText={(e) => setName(e)}
                    value={name}
                    styleCont={{ marginTop: 20 }}
                />
                <InputIcon
                    label={i18n.t('email')}
                    placeholder={i18n.t('email')}
                    onChangeText={(e) => setemail(e)}
                    value={email}
                    keyboardType='email-address'
                    styleCont={{ marginTop: 0 }}
                />
                <InputIcon
                    placeholder={i18n.t('message')}
                    styleCont={{ height: width * .32, marginHorizontal: '5%', marginTop: 20 }}
                    placeholder={i18n.t('prodDetAr')}
                    onChangeText={(e) => setMessage(e)}
                    value={Message}
                    LabelStyle={{ bottom: width * .35 }}

                />


                <BTN title={i18n.t('send')} ContainerStyle={styles.LoginBtn} onPress={SendComplaimentation} />

            </ScrollView>
        </Container>

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
