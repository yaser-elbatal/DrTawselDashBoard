import React from 'react'
import { View, FlatList, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import { InputIcon } from './InputText'
import i18n from '../locale/i18n'
import Colors from '../consts/Colors';
import Header from './Header';

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
                                <Image source={require('../assets/Images/carts_order_icon.png')} style={{ width: 20, height: 20 }} />
                                <Text style={styles.Text}>{item.item.title}</Text>
                                <Text style={styles.Text}>{item.item.number}</Text>
                            </View>
                        </LinearGradient>

                    )} />
            </View>
            <FlatList
                pagingEnabled={true}
                showsVerticalScrollIndicator={false}
                data={MeueCard}
                keyExtractor={(item) => item.id}
                renderItem={(item) => (
                    <TouchableOpacity onPress={onPress}>
                        <View style={styles.Card}>
                            <View style={{ margin: 20, justifyContent: 'center' }}>
                                <Text style={styles.nText}>{i18n.t('num')} # {item.item.num}</Text>

                                <View style={styles.Contain}>
                                    <Text style={styles.name}>{item.item.title}   </Text>
                                    <Text style={styles.nMenu}>:    {i18n.t('name')}    </Text>
                                </View>
                                <View style={styles.Contain}>
                                    <Text style={styles.name}>{item.item.time}      </Text>
                                    <Text style={styles.nMenu}>      :    5 {i18n.t('minutes')} </Text>
                                </View>
                                <View style={styles.Contain}>
                                    <Text style={styles.name}>{item.item.total}              : </Text>
                                    <Text style={styles.nText}> 122 </Text>
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
        marginEnd: 5,
        height: 110,
        width: 100,
        flex: 1

    },

    nText: {
        color: Colors.sky,
        marginStart: 10,
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
        overflow: 'hidden',

    },
    Contain: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,

    }


})
export default AllOrders
