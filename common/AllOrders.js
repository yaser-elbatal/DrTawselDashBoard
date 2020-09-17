import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, Dimensions, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native'

import { InputIcon } from './InputText'
import i18n from '../locale/i18n'
import Colors from '../consts/Colors';
import Header from './Header';
import Card from './Card';
import { GetOrders, Order_Detailes } from '../store/action/OrdersAction';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";

const { width } = Dimensions.get('window')

function AllOrders({ navigation, label, statues }) {


    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const dispatch = useDispatch();
    const OrderRequest = useSelector(state => state.Orders.GetmyOrders);
    const LoaderOrder = useSelector(state => state.Orders.loader);

    const isFocused = useIsFocused();
    const [spinner, setSpinner] = useState(true);



    async function fetchData() {
        setSpinner(true)
        await dispatch(GetOrders(token, statues, lang))

    }
    useEffect(() => {
        fetchData();
        setSpinner(true)

        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
            setSpinner(false)

        });
        setSpinner(false)

        return unsubscribe;
    }, [navigation, LoaderOrder, spinner]);



    function renderLoader() {
        if (spinner) {

            return (
                <View style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 99999,
                    backgroundColor: Colors.bg,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                }}>
                    <ActivityIndicator size="large" color={Colors.sky} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {renderLoader()}

            <Header navigation={navigation} label={label} />
            <InputIcon
                placeholder={i18n.t('search1')}
                image={require('../assets/Images/search.png')}
                styleCont={{ marginTop: 10, height: width * .18, }}
                inputStyle={{ backgroundColor: '#DBDBDB' }}
            />
            <Card />
            {
                OrderRequest && OrderRequest.data.length ?

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={OrderRequest.data}
                        extraData={OrderRequest}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => { navigation.navigate('OrderDetailes', { OrderId: item.id }); setTimeout(() => dispatch(Order_Detailes(token, item.id, lang)), 1000) }}>
                                <View style={styles.Card}>

                                    <View style={{ margin: 10, justifyContent: 'center' }}>

                                        <Text style={styles.nText}>{i18n.t('num')} # {item.id}</Text>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginEnd: 150, marginVertical: 20, marginTop: 0 }}>
                                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                                <Text style={[styles.name, { marginVertical: 5 }]}>{i18n.t('rebresentativename')}</Text>
                                                <Text style={[styles.name, { marginVertical: 5 }]}>{i18n.t('time')}</Text>
                                                <Text style={[styles.name, { marginVertical: 5 }]}>{i18n.t('totaly')}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                                <Text style={{ marginVertical: 5, marginHorizontal: 5 }}>:</Text>
                                                <Text style={{ marginVertical: 5, marginHorizontal: 5 }}>:</Text>
                                                <Text style={{ marginVertical: 5, marginHorizontal: 5 }}>:</Text>
                                            </View>
                                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                                <Text style={[styles.sname, { marginVertical: 5 }]}> {item.name}</Text>
                                                <Text style={[styles.sname, { marginVertical: 5 }]}> {item.date} {i18n.t('minutes')}</Text>
                                                <Text style={[styles.sname, { color: Colors.sky, marginTop: 10 }]}> {item.total}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        )} />
                    : null
            }

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
