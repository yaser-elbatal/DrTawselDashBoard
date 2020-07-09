import React, { useState } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native'
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors'
import BTN from '../../../common/BTN'

function OrderDetailes({ navigation }) {
    const [click, setClick] = useState(false)
    const [click1, setClick1] = useState(false)
    const [click3, setClick3] = useState(false)
    const [click4, setClick4] = useState(false)


    const Orderdata = [{
        id: 'K0',
        title: 'اسم الطلب',
        number: '4وجبات',

    },
    {
        id: 'K1',
        title: 'اسم الطلب',
        number: '4وجبات',
    },
    {
        id: 'K2',
        title: 'اسم الطلب',
        number: '4وجبات',
    }
        ,
    ]

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} label={i18n.t('orderDetailes') + '#1000'} />
            <ScrollView style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => setClick(!click)}>
                    <View style={{ width: '90%', margin: 20, backgroundColor: Colors.InputColor, height: 40, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                            <Text style={styles.nMenu}>{i18n.t('ClientInfo')}</Text>
                            {
                                click ?

                                    <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, top: 5 }} />
                                    :
                                    <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, top: 5 }} />

                            }
                        </View>
                    </View>
                </TouchableOpacity>
                {
                    click ?
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                                <Text style={styles.name}>{i18n.t('rebresentativename')} :</Text>
                                <Text style={styles.nMenu}>اوامر الشبكه</Text>
                                <TouchableOpacity onPress={() => { }}>
                                    <Image source={require('../../../assets/Images/whatsapp.png')} style={{ width: 20, height: 20, }} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                                <Text style={styles.name}>{i18n.t('phone')}    :      </Text>
                                <Text style={styles.nMenu}>1234567891           </Text>
                            </View>
                        </View>
                        : null
                }

                <TouchableOpacity onPress={() => setClick1(!click1)}>
                    <View style={{ width: '90%', margin: 20, backgroundColor: Colors.InputColor, height: 40, marginTop: 0 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                            <Text style={styles.nMenu}>{i18n.t('orderDetailes')}</Text>
                            {
                                click1 ?

                                    <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, top: 5 }} />
                                    :
                                    <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, top: 5 }} />

                            }
                        </View>
                    </View>
                </TouchableOpacity>
                {
                    click1 ?
                        <FlatList
                            pagingEnabled={true}
                            showsVerticalScrollIndicator={false}
                            data={Orderdata}
                            keyExtractor={(item) => item.id}
                            renderItem={(item) => (

                                <View style={{ flexDirection: 'row', overflow: 'hidden', flex: 1, justifyContent: 'space-between', alignItems: 'center', margin: 20, backgroundColor: Colors.bg, width: '90%', height: 40, padding: 20, borderWidth: 1, borderColor: Colors.InputColor, marginTop: 0 }}>
                                    <Text style={styles.name}>{item.item.title}</Text>
                                    <View style={{ height: 50, width: 1, backgroundColor: Colors.InputColor }}></View>
                                    <Text style={styles.name}>{item.item.number}</Text>
                                    <View style={{ height: 50, width: 1, backgroundColor: Colors.InputColor }}></View>
                                    <TouchableWithoutFeedback onPress={() => { }}>
                                        <Text style={[styles.name, { color: Colors.sky }]}>التفاصيل</Text>

                                    </TouchableWithoutFeedback>

                                </View>
                            )}
                        />

                        : null
                }
                <TouchableOpacity onPress={() => setClick3(!click3)}>
                    <View style={{ width: '90%', margin: 20, backgroundColor: Colors.InputColor, height: 40, marginTop: 0 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                            <Text style={styles.nMenu}>{i18n.t('Paymentmethod')}</Text>
                            {
                                click3 ?

                                    <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, top: 5 }} />
                                    :
                                    <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, top: 5 }} />

                            }
                        </View>
                    </View>
                </TouchableOpacity>
                {
                    click3 ?
                        <Text style={[styles.name, { marginHorizontal: 40, marginTop: -10 }]}>كاش</Text>
                        :
                        null

                }

                <TouchableOpacity onPress={() => setClick4(!click4)}>
                    <View style={{ width: '90%', margin: 20, backgroundColor: Colors.InputColor, height: 40, marginTop: 0 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                            <Text style={styles.nMenu}>{i18n.t('prices')}</Text>
                            {
                                click4 ?

                                    <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, top: 5 }} />
                                    :
                                    <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, top: 5 }} />

                            }
                        </View>
                    </View>
                </TouchableOpacity>
                {
                    click4 ?
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginEnd: 150, marginHorizontal: 40, marginVertical: 20, marginTop: 0 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.name}>سعر المنتج</Text>
                                <Text style={[styles.name, { marginVertical: 5 }]}>سعر التوصيل</Text>
                                <Text style={styles.name}>السعر الاجمالي</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text>:</Text>
                                <Text style={{ marginVertical: 5 }}>:</Text>
                                <Text>:</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.sname}>180 ريال</Text>
                                <Text style={[styles.sname, { marginVertical: 5 }]}>20ريال</Text>
                                <Text style={[styles.sname, { color: Colors.RedColor }]}> ريال200</Text>
                            </View>
                        </View>
                        : null
                }
                <BTN title={i18n.t('confirm')} ContainerStyle={styles.LoginBtn} onPress={() => navigation.navigate('ActiveRequests')} />
                <BTN title={i18n.t('refuse')} ContainerStyle={[styles.LoginBtn, { backgroundColor: Colors.InputColor }]} onPress={() => navigation.navigate('ActiveRequests')} />

            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
    nMenu: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        marginHorizontal: 15,
        textAlign: 'center'
    },
    name: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.fontNormal
    },
    sname: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.IconBlack
    },
    LoginBtn: {
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 20,
        width: '90%',
        marginTop: 0
    }
})
export default OrderDetailes
