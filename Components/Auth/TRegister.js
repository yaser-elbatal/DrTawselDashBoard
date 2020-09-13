import React, { useState } from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, } from 'react-native'
import Colors from '../../consts/Colors'
import BackBtn from '../../common/BackBtn'
import i18n from '../../locale/i18n';
import { InputIcon } from '../../common/InputText';
import { width, height } from '../../consts/HeightWidth';
import BTN from '../../common/BTN';

function TRegister({ navigation }) {
    const [WebUrl, setWebUrl] = useState('');
    const [selecCommerical, setselecCommerical] = useState(null);
    const [SelectDelivery, setSelectDelivery] = useState(null)


    const [EbUrlStatues, setEbUrlStatues] = useState(0)

    const [data, setData] = useState([
        { id: 1, title: `${i18n.t("yes")}` },
        { id: 0, title: `${i18n.t("no")}` }
    ])
    function activeInput(type) {
        if (type === 'WebUrl' || WebUrl !== '') setEbUrlStatues(1);



    }
    function unActiveInput(type) {
        if (type === 'WebUrl' && WebUrl === '') setEbUrlStatues(0);



    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }}>
            <BackBtn navigation={navigation} />
            <View style={{ flexDirection: 'column', paddingStart: '5%' }}>
                <Text style={styles.TextLogin}>{i18n.t('createAcc')}</Text>
                <Text style={styles.UText}>{i18n.t('Activity')}</Text>
                <Text style={[styles.TextLogin, { paddingVertical: 10, }]}>{i18n.t('connectInfo')}</Text>
            </View>

            <InputIcon
                label={EbUrlStatues === 1 ? i18n.t('webUrl') : null}
                placeholder={EbUrlStatues === 1 ? null : i18n.t('webUrl')}
                onBlur={() => unActiveInput('WebUrl')}
                onFocus={() => activeInput('WebUrl')}
                inputStyle={{ borderColor: EbUrlStatues === 1 ? Colors.sky : Colors.InputColor }}
                onChangeText={(e) => setWebUrl(e)}
                value={WebUrl}
                styleCont={{ marginTop: 20 }}
                LabelStyle={{ paddingHorizontal: EbUrlStatues === 1 ? 10 : 0, color: EbUrlStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
            />

            <View style={{ height: width * .14, marginHorizontal: '5%', flex: 1, borderColor: Colors.InputColor, borderWidth: .9, borderRadius: 5, flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ paddingEnd: 80, fontFamily: 'flatMedium', paddingStart: 10, flex: .9, fontSize: 10, }}>
                    <Text style={{ color: Colors.inputTextMainColor }}>{i18n.t('Franch')}</Text>
                </View>
                {
                    data.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => { setselecCommerical(index) }} key={index + 1} style={{ flexDirection: 'row', justifyContent: 'center', padding: 10, }}>
                                <View style={{
                                    height: 15,
                                    width: 15,
                                    borderRadius: 12,
                                    borderWidth: 2,
                                    borderColor: selecCommerical === index ? Colors.sky : Colors.fontNormal,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',

                                }}>
                                    {
                                        selecCommerical === index ?
                                            <View style={{
                                                height: 6,
                                                width: 6,
                                                borderRadius: 6,
                                                backgroundColor: Colors.sky,
                                            }} />
                                            : null
                                    }
                                </View>
                                <Text style={[styles.sText, { color: selecCommerical === index ? Colors.sky : Colors.fontNormal, left: 6, bottom: 1 }]}>{item.title}</Text>

                            </TouchableOpacity>
                        )
                    })
                }

            </View>
            <View style={{ height: width * .14, marginHorizontal: '5%', marginTop: 20, borderColor: Colors.InputColor, borderWidth: .9, borderRadius: 5, flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ paddingEnd: 80, flex: .9, fontFamily: 'flatMedium', paddingStart: 10 }}>
                    <Text style={{ color: Colors.inputTextMainColor }}>{i18n.t('DeliveryServ')}</Text>
                </View>
                {
                    data.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => { setSelectDelivery(index) }} key={index + 1} style={{ flexDirection: 'row', justifyContent: 'center', padding: 10, }}>
                                <View style={{
                                    height: 15,
                                    width: 15,
                                    borderRadius: 12,
                                    borderWidth: 2,
                                    borderColor: SelectDelivery === index ? Colors.sky : Colors.fontNormal,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',

                                }}>
                                    {
                                        SelectDelivery === index ?
                                            <View style={{
                                                height: 6,
                                                width: 6,
                                                borderRadius: 6,
                                                backgroundColor: Colors.sky,
                                            }} />
                                            : null
                                    }
                                </View>
                                <Text style={[styles.sText, { color: SelectDelivery === index ? Colors.sky : Colors.fontNormal, left: 6, bottom: 1 }]}>{item.title}</Text>

                            </TouchableOpacity>
                        )
                    })
                }

            </View>
            <BTN title={i18n.t('send')} ContainerStyle={styles.LoginBtn} onPress={() => { }} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    UText: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        marginVertical: 10,
        color: Colors.fontNormal
    },
    TextLogin: {
        fontFamily: 'flatMedium',
        fontSize: 18,
    },
    LoginBtn: {
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 20,
        width: '90%',
    },
})
export default TRegister
