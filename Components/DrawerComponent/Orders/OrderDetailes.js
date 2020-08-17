import React, { useState } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native'
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors'
import BTN from '../../../common/BTN'
import { width } from '../../../consts/HeightWidth'

function OrderDetailes({ navigation, labelBtn1, labelBtn2, onPress1, onPress2, onPressDetailes }) {
    const [click, setClick] = useState(true)
    const [click1, setClick1] = useState(true)
    const [click3, setClick3] = useState(true)
    const [click4, setClick4] = useState(true)


    const Orderdata = [{
        id: 'K0',
        title: 'اسم الطلب',
        number: `4${i18n.t('Meals')}`,


    },
    {
        id: 'K1',
        title: 'اسم الطلب',
        number: `4${i18n.t('Meals')}`,
    },
    {
        id: 'K2',
        title: 'اسم الطلب',
        number: `4${i18n.t('Meals')}`,
    }
        ,
    ]

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} label={i18n.t('orderDetailes') + '#1000'} />

            <ScrollView style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => setClick(!click)}>
                    <View style={{ width: '90%', margin: 20, backgroundColor: Colors.InputColor, height: 40, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center' }}>
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


                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: '7%' }}>
                            <View style={{ flexDirection: 'column', }}>
                                <Text style={styles.name}>{i18n.t('rebresentativename')}</Text>
                                <Text style={[styles.name, { marginVertical: 15 }]}>{i18n.t('phone')}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'center', }}>
                                <Text style={{ marginHorizontal: 15 }}>:</Text>
                                <Text style={{ marginHorizontal: 15, marginVertical: 15 }}>:</Text>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <Text style={styles.sname}>اوامر الشبكه</Text>
                                    <TouchableOpacity style={{ alignSelf: 'flex-end', alignItems: 'flex-end', left: width * .25 }}>
                                        <Image source={require('../../../assets/Images/whatsapp.png')} style={{ width: 20, height: 20, }} resizeMode='contain' />
                                    </TouchableOpacity>
                                </View>
                                <Text style={[styles.sname, { marginVertical: 15 }]}>1234567891</Text>
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
                            showsVerticalScrollIndicator={false}
                            data={Orderdata}
                            keyExtractor={(item) => item.id}
                            renderItem={(item) => (

                                <View style={{ flexDirection: 'row', overflow: 'hidden', flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, margin: 20, backgroundColor: Colors.bg, width: '90%', height: 40, borderWidth: 1, borderColor: Colors.InputColor, marginTop: 0 }}>
                                    <Text style={styles.name}>{item.item.title}</Text>
                                    <View style={{ height: 50, width: 1, backgroundColor: Colors.InputColor }}></View>
                                    <Text style={styles.name}>{item.item.number}</Text>
                                    <View style={{ height: 50, width: 1, backgroundColor: Colors.InputColor }}></View>
                                    <TouchableWithoutFeedback onPress={onPressDetailes}>
                                        <Text style={[styles.name, { color: Colors.sky, fontSize: 14, }]}>{i18n.t('detailes')}</Text>
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
                        <Text style={[styles.name, { marginHorizontal: 40, marginTop: -10 }]}>{i18n.t('cash')}</Text>
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
                        <View style={{ flexDirection: 'row', marginHorizontal: '7%' }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.name}>{i18n.t('productPrice')}</Text>
                                <Text style={[styles.name, { paddingVertical: 15 }]}>{i18n.t('Deliveryprice')}</Text>
                                <Text style={styles.name}>{i18n.t('total')}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ marginHorizontal: 20 }}>:</Text>
                                <Text style={{ marginHorizontal: 20, paddingVertical: 11 }}>:</Text>
                                <Text style={{ marginHorizontal: 20 }}>:</Text>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.sname}>180 {i18n.t('Rial')}</Text>
                                <Text style={[styles.sname, { paddingVertical: 15 }]}>20{i18n.t('Rial')}</Text>
                                <Text style={[styles.sname, { color: Colors.RedColor, }]}> {i18n.t('Rial')}200</Text>
                            </View>
                        </View>
                        : null
                }
                {
                    labelBtn1 &&
                    < BTN title={labelBtn1} ContainerStyle={styles.LoginBtn} onPress={onPress1} />
                }
                {

                    labelBtn2 &&
                    <BTN title={labelBtn2} ContainerStyle={[styles.LoginBtn, { backgroundColor: Colors.InputColor }]} onPress={onPress2} />

                }




            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
    nMenu: {
        fontFamily: 'flatMedium',
        fontSize: width * .03,
        marginHorizontal: 15,
        textAlign: 'center'
    },
    name: {
        fontFamily: 'flatMedium',
        fontSize: width * .03,
        color: Colors.fontNormal
    },
    sname: {
        fontFamily: 'flatMedium',
        fontSize: width * .03,
        color: Colors.IconBlack
    },
    LoginBtn: {
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 20,
        width: '90%',
        marginTop: 10
    }
})
export default OrderDetailes
