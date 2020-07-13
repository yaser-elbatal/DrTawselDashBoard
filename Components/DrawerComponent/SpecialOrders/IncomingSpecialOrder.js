import React, { useState } from 'react'
import { View, FlatList, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors';
import Header from '../../../common/Header';
import { InputIcon } from '../../../common/InputText';
import { CheckBox } from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';

const { width } = Dimensions.get('window')

function IncomingSpecialOrder({ navigation }) {

    const [isSelected, setSelection] = useState();
    const [Operation, setOpeartion] = useState('uk');
    const [Arange, setArange] = useState('new');

    const Items = [
        { label: 'حذف', value: 'uk', },

    ]
    const Arrangement = [
        { label: 'الاحدث', value: 'new', },
        { label: 'الاقرب', value: 'n', },

    ]
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
        <View style={{ flex: 1 }}>
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
            <View style={{ height: 100 }}>
                <View style={{ backgroundColor: '#DBDBDB', flex: 1, width: '90%', margin: 20, flexDirection: 'row', alignItems: 'center', }}>
                    <CheckBox checked={isSelected} color={isSelected ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: isSelected ? Colors.sky : Colors.bg, width: width * .05, height: 20, marginHorizontal: 2 }} onPress={() => setSelection(!isSelected)} />
                    <Text style={{ marginStart: 10, fontFamily: 'flatMedium', fontSize: width * .033, }}>{i18n.t('Select')}</Text>
                    <DropDownPicker
                        defaultValue={Operation}
                        onChangeItem={(val) => setOpeartion(val.value)}
                        containerStyle={{ width: width * .25, }}

                        dropDownStyle={{
                            backgroundColor: Colors.bg,
                        }}
                        style={{ backgroundColor: '#fafafa', margin: 8 }}
                        itemStyle={{ justifyContent: 'flex-start', flexDirection: 'column', }}
                        items={Items} />
                    <Text style={{ fontFamily: 'flatMedium', fontSize: 10, }}>{i18n.t('filter')}</Text>

                    <DropDownPicker
                        defaultValue={Arange}
                        items={Arrangement}
                        onChangeItem={(val) => setArange(val.value)}
                        containerStyle={{ width: width * .26, }}
                        dropDownStyle={{
                            backgroundColor: Colors.bg,
                        }}
                        style={{ backgroundColor: '#fafafa', margin: 7, }}
                        itemStyle={{
                            justifyContent: 'center', flexDirection: 'column',
                        }}


                    />
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
        marginEnd: 5,
        height: 110,
        width: 100,
        flex: 1,


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
