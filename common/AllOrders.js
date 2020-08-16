import React from 'react'
import { View, FlatList, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import { InputIcon } from './InputText'
import i18n from '../locale/i18n'
import Colors from '../consts/Colors';
import Header from './Header';
import Card from './Card';

const { width } = Dimensions.get('window')

function AllOrders({ navigation, label, onPress }) {

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
            <Header navigation={navigation} label={label} />
            <InputIcon
                placeholder={i18n.t('search1')}
                image={require('../assets/Images/search.png')}
                styleCont={{ marginTop: 10, height: width * .18, }}
                inputStyle={{ backgroundColor: '#DBDBDB' }}
            />
            <Card />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={MeueCard}
                keyExtractor={(item) => item.id}
                renderItem={(item) => (
                    <TouchableOpacity onPress={onPress}>
                        <View style={styles.Card}>

                            <View style={{ margin: 10, justifyContent: 'center' }}>

                                <Text style={styles.nText}>{i18n.t('num')} # {item.item.num}</Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginEnd: 150, marginVertical: 20, marginTop: 0 }}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                        <Text style={[styles.name, { marginVertical: 5 }]}>{item.item.title}</Text>
                                        <Text style={[styles.name, { marginVertical: 5 }]}>{item.item.time}</Text>
                                        <Text style={[styles.name, { marginVertical: 5 }]}>{item.item.total}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                        <Text style={{ marginVertical: 5, marginHorizontal: 5 }}>:</Text>
                                        <Text style={{ marginVertical: 5, marginHorizontal: 5 }}>:</Text>
                                        <Text style={{ marginVertical: 5, marginHorizontal: 5 }}>:</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                        <Text style={[styles.sname, { marginVertical: 5 }]}> {i18n.t('name')}</Text>
                                        <Text style={[styles.sname, { marginVertical: 5 }]}> 5 {i18n.t('minutes')}</Text>
                                        <Text style={[styles.sname, { color: Colors.sky, marginTop: 10 }]}> 122</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                )} />
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
        height: 120,
        width: width * .3,
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
        fontSize: width * .03,
        color: Colors.fontNormal
    },
    sname: {
        fontFamily: 'flatMedium',
        fontSize: width * .03,
        color: Colors.IconBlack
    },
    Card: {

        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 140,
        width: '92%',
        marginHorizontal: '4%',
        shadowColor: Colors.bg,
        margin: 5,
        backgroundColor: Colors.bg,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        overflow: 'hidden',
        borderRadius: 5

    },
    Contain: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,

    }


})
export default AllOrders
