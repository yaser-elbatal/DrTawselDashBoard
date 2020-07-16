import React, { useState } from 'react'
import { View, Image, Text, ScrollView } from 'react-native'
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors'
import { height, width } from '../../../consts/HeightWidth'
import { validateUserName, validateAccountNum, valdiateMoney } from '../../../common/Validation'
import { Toaster } from '../../../common/Toaster'
import { InputIcon } from '../../../common/InputText'
import BTN from '../../../common/BTN'

function Banktransfer({ navigation }) {

    const [Bankname, setName] = useState('');
    const [accountNAme, setAcoountname] = useState("");
    const [accountnum, setAccountnum] = useState('');
    const [money, setMoney] = useState('')


    const _validate = () => {
        let BanknameErr = validateUserName(Bankname)
        let AccountnameErr = validateUserName(Bankname)
        let accountnumErr = validateAccountNum(accountnum)
        let moneyErr = valdiateMoney(money)


        return BanknameErr || AccountnameErr || accountnumErr || moneyErr
    };

    const SubmitHandler = () => {
        const isVal = _validate();
        if (!isVal) {
            navigation.navigate('Wallet')
        }
        else {
            Toaster(_validate());
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bg }}>
            <Header navigation={navigation} label={i18n.t('Banktransfer')} />
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                <View style={{ height: height * .15, width: '90%', marginHorizontal: '5%', backgroundColor: '#F8F8F8', marginTop: 20, borderRadius: 25 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20, alignItems: 'center' }}>

                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../../../assets/Images/DrTawsell.png')} style={{ width: 30, height: 30 }} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 8, color: 'blue', fontFamily: 'flatMedium' }}>مصرف الدكتور</Text>
                                <Text style={{ fontSize: 8, color: 'blue', fontFamily: 'flatMedium' }}>Doctor Bank</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1, marginHorizontal: 20 }}>
                            <Text style={{ fontSize: width * .025, color: Colors.RedColor, fontFamily: 'flatMedium' }}>مصرف الدكتور</Text>
                            <Text style={{ fontSize: width * .025, color: Colors.IconBlack, fontFamily: 'flatMedium' }}>الدكتور</Text>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ fontSize: width * .025, color: Colors.IconBlack, fontFamily: 'flatMedium' }}>  {i18n.t('Accnum')} :  </Text>
                                <Text style={{ fontSize: width * .025, color: Colors.IconBlack, fontFamily: 'flatMedium' }}>11111111111111</Text>


                            </View>
                        </View>
                    </View>
                </View>



                <View style={{ height: 50, width: '90%', justifyContent: 'center', marginHorizontal: '5%', borderWidth: 1, borderColor: Colors.InputColor, borderRadius: 25, marginTop: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../../assets/Images/money_icon_bank.png')} style={{ width: 25, height: 25 }} resizeMode='contain' />
                        <Text style={{ fontSize: 14, color: Colors.IconBlack, fontFamily: 'flatMedium' }}>{i18n.t('Repaymentprice')}</Text>
                        <Text style={{ fontSize: 14, color: Colors.IconBlack, fontFamily: 'flatMedium' }}>100{i18n.t('Rial')}</Text>
                    </View>
                </View>

                <Image source={require('../../../assets/Images/add_photo.png')} style={{ width: 80, height: 80, alignSelf: 'center', marginTop: 20 }} resizeMode='contain' />
                <Text style={{ fontSize: 14, color: Colors.IconBlack, fontFamily: 'flatMedium', textAlign: 'center' }}> {i18n.t('Bankpicture')}</Text>
                <InputIcon
                    label={i18n.t("bankname")}
                    placeholder='اوامر الشبكه'
                    value={Bankname}
                    onChangeText={(e) => setName(e)}
                    inputStyle={{ borderRadius: 20, backgroundColor: '#F8F8F8', borderColor: '#eaeaea' }}
                    styleCont={{ height: width * .18, marginHorizontal: 10 }}
                    LabelStyle={{ bottom: width * .2, }}
                />
                <InputIcon
                    label={i18n.t("AccountUser")}
                    placeholder='اوامر الشبكه'
                    value={accountNAme}
                    onChangeText={(e) => setAcoountname(e)}
                    inputStyle={{ borderRadius: 20, backgroundColor: '#F8F8F8', borderColor: '#eaeaea' }}
                    styleCont={{ height: width * .18, marginHorizontal: 10 }}
                    LabelStyle={{ bottom: width * .2, }}
                />
                <InputIcon
                    label={i18n.t("Accnum")}
                    placeholder='اوامر الشبكه'
                    value={accountnum}
                    onChangeText={(e) => setAccountnum(e)}
                    inputStyle={{ borderRadius: 20, backgroundColor: '#F8F8F8', borderColor: '#eaeaea' }}
                    styleCont={{ height: width * .18, marginHorizontal: 10 }}
                    LabelStyle={{ bottom: width * .2, }}
                />
                <InputIcon
                    label={i18n.t("moneyPaied")}
                    placeholder='اوامر الشبكه'
                    value={money}
                    onChangeText={(e) => setMoney(e)}
                    inputStyle={{ borderRadius: 20, backgroundColor: '#F8F8F8', borderColor: '#eaeaea' }}
                    styleCont={{ height: width * .18, marginHorizontal: 10 }}
                    LabelStyle={{ bottom: width * .2, }}
                />
                <BTN title={i18n.t("send")} onPress={SubmitHandler} ContainerStyle={{ marginVertical: width * .1, borderRadius: 10 }} TextStyle={{ fontSize: width * .04, }} />

            </ScrollView>
        </View>
    )
}

export default Banktransfer
