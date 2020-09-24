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
import Container from './Container';

const { width } = Dimensions.get('window')

function AllOrders({ navigation, route }) {
    const { statues, label } = route.params

    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const dispatch = useDispatch();
    const OrderRequest = useSelector(state => state.Orders.GetmyOrders);
    const LoaderOrder = useSelector(state => state.Orders.loader);
    const [Search, setSearch] = useState('');

    const isFocused = useIsFocused();
    const [spinner, setSpinner] = useState(true);



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(true)
            dispatch(GetOrders(token, statues, lang, Search)).then(() => setSpinner(false))
        });

        return unsubscribe;
    }, [navigation])



    const handleChange = (e) => {
        setSearch(e);
        setTimeout(() => dispatch(GetOrders(token, statues, lang, Search)), 1000)
    }



    return (
        <Container loading={spinner}>
            <View style={{ flex: 1, backgroundColor: Colors.bg }}>
                <Header navigation={navigation} label={label} />
                <InputIcon
                    placeholder={i18n.t('search1')}
                    label={i18n.t('search1')}
                    value={Search}
                    onChangeText={(e) => handleChange(e)}
                    image={require('../assets/Images/search.png')}
                    styleCont={{ marginTop: 20, }}
                />
                <Card />

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={OrderRequest.data}
                    extraData={OrderRequest}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('OrderDetailes', { OrderId: item.id })}>
                            <View style={styles.Card}>

                                <View style={{ margin: 10, justifyContent: 'center' }}>

                                    <Text style={styles.nText}>{i18n.t('num')} # {item.id}</Text>

                                    <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                            <Text style={[styles.name, {}]}>{i18n.t('rebresentativename')}</Text>
                                            <Text style={[styles.name, { paddingVertical: 15 }]}>{i18n.t('time')}</Text>
                                            <Text style={[styles.name, { paddingTop: 5 }]}>{i18n.t('totaly')}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                                            <Text style={{ paddingHorizontal: 15 }}>:</Text>
                                            <Text style={{ paddingVertical: 15, paddingHorizontal: 15 }}>:</Text>
                                            <Text style={{ paddingHorizontal: 15 }}>:</Text>
                                        </View>
                                        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                            <Text style={[styles.sname,]}> {item.name}</Text>
                                            <Text style={[styles.sname, { paddingVertical: 15 }]}> {item.date} {i18n.t('minutes')}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>
                                                <Text style={[styles.sname, { color: Colors.sky, }]}> {item.total}</Text>
                                                <Text style={[styles.sname, { color: Colors.fontNormal, }]}> {i18n.t('Rial')}</Text>

                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>

                    )} />



            </View>
        </Container>
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
