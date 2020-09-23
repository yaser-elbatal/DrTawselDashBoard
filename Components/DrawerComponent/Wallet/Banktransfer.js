import React, { useState, useEffect } from 'react'
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native'
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors'
import { height, width } from '../../../consts/HeightWidth'
import { validateUserName, validateAccountNum, valdiateMoney } from '../../../common/Validation'
import { Toaster } from '../../../common/Toaster'
import { InputIcon } from '../../../common/InputText'
import BTN from '../../../common/BTN'
import { GetAccountBanks } from '../../../store/action/CommentsAction'
import { useSelector, useDispatch } from 'react-redux'
import Container from '../../../common/Container'

function Banktransfer({ navigation }) {


    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const MyAcoount = useSelector(state => state.Comments.Banks === undefined ? [] : state.Comments.Banks)
    console.log(MyAcoount);


    const [spinner, setSpinner] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(true)
            dispatch(GetAccountBanks(token, lang)).then(() => setSpinner(false))
        });

        return unsubscribe;
    }, [navigation])




    return (
        <Container loading={spinner}>

            <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }} showsVerticalScrollIndicator={false}>
                <Header navigation={navigation} label={i18n.t('Banktransfer')} />
                {
                    MyAcoount.map(acc => (
                        <TouchableOpacity onPress={() => navigation.navigate('TransferMony', { AccountId: acc.id })}>
                            <View style={{ marginHorizontal: '5%', backgroundColor: '#F8F8F8', borderRadius: 25, padding: 20 }} key={acc.id}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={{ uri: acc.image }} style={{ width: 30, height: 30 }} />
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={{ fontSize: 8, color: 'blue', fontFamily: 'flatMedium' }}> {acc.bank_name}</Text>
                                            <Text style={{ fontSize: 8, color: 'blue', fontFamily: 'flatMedium' }}>{acc.bank_name}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'column', flex: 1, marginHorizontal: 20 }}>
                                        <Text style={{ fontSize: width * .025, color: Colors.RedColor, fontFamily: 'flatMedium' }}>{acc.bank_name}</Text>
                                        <Text style={{ fontSize: width * .025, color: Colors.IconBlack, fontFamily: 'flatMedium' }}>{acc.account_name}</Text>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: width * .025, color: Colors.IconBlack, fontFamily: 'flatMedium' }}>  {i18n.t('Accnum')}   </Text>

                                            <Text style={{ paddingHorizontal: 10 }}>:</Text>
                                            <Text style={{ fontSize: width * .025, color: Colors.IconBlack, fontFamily: 'flatMedium' }}>{acc.account_number}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: width * .025, color: Colors.IconBlack, fontFamily: 'flatMedium' }}>IBAN   </Text>
                                            <Text style={{ paddingHorizontal: 10 }}>:</Text>
                                            <Text style={{ fontSize: width * .025, color: Colors.IconBlack, fontFamily: 'flatMedium' }}>{acc.iban_number}</Text>

                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>

                    ))

                }





            </ScrollView>
        </Container>
    )
}

export default Banktransfer
