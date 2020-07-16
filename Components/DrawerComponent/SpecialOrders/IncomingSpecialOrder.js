import React, { useState } from 'react'
import { View, FlatList, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors';
import Header from '../../../common/Header';
import { InputIcon } from '../../../common/InputText';
import { Picker, CheckBox, Content } from "native-base";

const { width, height } = Dimensions.get('window')

function IncomingSpecialOrder({ navigation }) {

    const [isSelected, setSelection] = useState();
    const [selected, setSelected] = useState("key0")
    const [selected1, setSelected1] = useState("key0")


    const onValueChange1 = (value) => {
        setSelected1(value)
    }

    const onValueChange = (value) => {
        setSelected(value)
    }
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

    const MeueCard = [{
        id: 'K0',
        num: 1,
        title: `${i18n.t('rebresentativename')}`,
        time: `${i18n.t('time')}`,
        total: `${i18n.t('totaly')}`,
    },
    {
        id: 'K1',
        num: 2,
        title: `${i18n.t('rebresentativename')}`,
        time: `${i18n.t('time')}`,
        total: `${i18n.t('totaly')}`,


    },
    {
        id: 'K2',
        num: 3,
        title: `${i18n.t('rebresentativename')}`,
        time: `${i18n.t('time')}`,
        total: `${i18n.t('totaly')}`,

    }
        ,

    ]

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bg }}>
            <Header navigation={navigation} label={i18n.t('incom')} />
            <InputIcon
                placeholder={i18n.t('search1')}
                image={require('../../../assets/Images/search.png')}
                styleCont={{ marginTop: 10, height: width * .18, }}
                inputStyle={{ backgroundColor: '#DBDBDB' }}
            />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    horizontal
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    data={Orderdata}
                    keyExtractor={(item) => item.id}
                    renderItem={(item) => (

                        <LinearGradient
                            colors={item.item.color}
                            style={styles.Linear}>
                            <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center', borderTopLeftRadius: 90 }}>
                                <Image source={require('../../../assets/Images/carts_order_icon.png')} style={{ width: 20, height: 20 }} />
                                <Text style={styles.Text}>{item.item.title}</Text>
                                <Text style={styles.Text}>{item.item.number}</Text>
                            </View>
                        </LinearGradient>

                    )} />
            </View>

            <View style={{ backgroundColor: Colors.InputColor, width: '90%', margin: 20, marginVertical: 10, height: 50, flexDirection: 'row', alignItems: 'center', zIndex: 100, }}>
                <CheckBox checked={isSelected} color={isSelected ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: isSelected ? Colors.sky : Colors.bg, width: width * .05, height: height * .03, }} onPress={() => setSelection(!isSelected)} />
                <Text style={{ marginStart: 12, fontFamily: 'flatMedium', fontSize: width * .025, }}>{i18n.t('Select')}</Text>


                <View style={{ width: width * .26, backgroundColor: Colors.bg, margin: 20, marginHorizontal: 2, overflow: 'hidden', }}>
                    <Picker
                        mode="dropdown"
                        selectedValue={selected1}
                        onValueChange={onValueChange1}
                        style={{ marginStart: -15, marginEnd: 0, height: 40 }}

                    >
                        <Picker.Item label="delete" value="key0" />
                        <Picker.Item label="تعديل" value="key1" />

                    </Picker>
                </View>



                <Text style={{ fontFamily: 'flatMedium', fontSize: width * .025, }}>{i18n.t('filter')}</Text>
                <View style={{ margin: 30, backgroundColor: Colors.bg, marginHorizontal: 2, width: width * .27, overflow: 'hidden' }}>
                    <Picker
                        mode="dropdown"
                        selectedValue={selected}
                        onValueChange={onValueChange}
                        style={{ marginStart: -15, height: 40, }}

                    >
                        <Picker.Item label="newest" value="key0" />
                        <Picker.Item label="الاقدام" value="key1" />
                        <Picker.Item label="الجديد" value="key2" />
                        <Picker.Item label="القديم" value="key3" />
                    </Picker>
                </View>


            </View>


            <FlatList
                pagingEnabled={true}
                showsVerticalScrollIndicator={false}
                data={MeueCard}
                keyExtractor={(item) => item.id}
                renderItem={(item) => (
                    <TouchableOpacity onPress={() => navigation.navigate('IcomingSpecialOrderDetailes')} >
                        <View style={styles.Card}>
                            <View style={{ margin: 10, justifyContent: 'center' }}>
                                <CheckBox checked={isSelected} color={isSelected ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: isSelected ? Colors.sky : Colors.bg, width: width * .05, height: 20, marginHorizontal: 2 }} onPress={() => setSelection(!isSelected)} />

                                <Text style={styles.nText}>{i18n.t('num')} # {item.item.num}</Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginEnd: 150, marginVertical: 20, marginTop: 0 }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={styles.name}>{item.item.title}</Text>
                                        <Text style={[styles.name, { marginVertical: 5 }]}>{item.item.time}</Text>
                                        <Text style={styles.name}>{item.item.total}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text>:</Text>
                                        <Text style={{ marginVertical: 5 }}>:</Text>
                                        <Text>:</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={styles.sname}> {i18n.t('name')}</Text>
                                        <Text style={[styles.sname, { marginVertical: 5 }]}> 5 {i18n.t('minutes')}</Text>
                                        <Text style={[styles.sname, { color: Colors.sky }]}> 122</Text>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </TouchableOpacity>

                )
                } />
        </View >
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
        height: height * .18,
        width: width * .28,
        flex: 1
    },

    nText: {
        color: Colors.sky,
        marginVertical: 5,
        fontFamily: 'flatMedium',

    },
    Text: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.bg,
        textAlign: 'center'
    },
    nMenu: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        marginHorizontal: 15,
        textAlign: 'center'
    },
    name: {
        fontFamily: 'flatMedium',
        fontSize: 10,
        color: Colors.fontNormal
    },
    Card: {

        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 140,
        width: '90%',
        marginHorizontal: 20,
        shadowColor: Colors.bg,
        margin: 5,
        backgroundColor: Colors.bg,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        marginTop: 0

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
    Contain: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,

    }


})

export default IncomingSpecialOrder
