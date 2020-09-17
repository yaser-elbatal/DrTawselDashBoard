import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors'
import BTN from '../../../common/BTN'
import { width } from '../../../consts/HeightWidth'
import { useSelector, useDispatch } from 'react-redux'
import { Order_Detailes } from '../../../store/action/OrdersAction';
import { useIsFocused } from "@react-navigation/native";




function OrderDetailes({ navigation, route, labelBtn1, labelBtn2, onPress1, onPress2, onPressDetailes }) {

    const [click, setClick] = useState(true)
    const [click1, setClick1] = useState(true)
    const [click3, setClick3] = useState(true)
    const [click4, setClick4] = useState(true)


    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const dispatch = useDispatch();
    const OrderDet = useSelector(state => state.Orders.OrderDetailes);
    const LoaderOrder = useSelector(state => state.Orders.loader);
    const { OrderId } = route.params
    const isFocused = useIsFocused();
    const [spinner, setSpinner] = useState(true);

    console.log(OrderDet);

    function fetchData() {
        setSpinner(true)
        dispatch(Order_Detailes(token, OrderId, lang));

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
        OrderDet ?
            <View style={{ flex: 1 }}>
                {renderLoader()}
                <Header navigation={navigation} label={i18n.t('orderDetailes') + `${OrderDet.data.order_id}`} />

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
                                        <Text style={styles.sname}>{OrderDet.data.user.name}</Text>
                                        <TouchableOpacity style={{ alignSelf: 'flex-end', alignItems: 'flex-end', left: width * .25 }}>
                                            <Image source={require('../../../assets/Images/whatsapp.png')} style={{ width: 20, height: 20, }} resizeMode='contain' />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={[styles.sname, { marginVertical: 15 }]}>{OrderDet.data.user.phone}</Text>
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
                            OrderDet && OrderDet.data.products.length ?

                                OrderDet.data.products.map(item => (
                                    <View key={`${item.id}`} style={{ flexDirection: 'row', overflow: 'hidden', flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, margin: 20, backgroundColor: Colors.bg, width: '90%', height: 40, borderWidth: 1, borderColor: Colors.InputColor, marginTop: 0 }}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <View style={{ height: 50, width: 1, backgroundColor: Colors.InputColor }}></View>
                                        <Text style={styles.name}>{item.quantity}{i18n.t('Meals')}</Text>
                                        <View style={{ height: 50, width: 1, backgroundColor: Colors.InputColor }}></View>
                                        <TouchableWithoutFeedback onPress={onPressDetailes}>
                                            <Text style={[styles.name, { color: Colors.sky, fontSize: 14, }]}>{i18n.t('detailes')}</Text>
                                        </TouchableWithoutFeedback>

                                    </View>
                                ))


                                : null

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
                            <Text style={[styles.name, { marginHorizontal: 40, marginTop: -10 }]}>{OrderDet.data.payment}</Text>
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
                                    <Text style={styles.sname}>{OrderDet.data.sum} {i18n.t('Rial')}</Text>
                                    <Text style={[styles.sname, { paddingVertical: 15 }]}>{OrderDet.data.shipping}{i18n.t('Rial')}</Text>
                                    <Text style={[styles.sname, { color: Colors.RedColor, }]}>{OrderDet.data.total} {i18n.t('Rial')}</Text>
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
            : null
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
