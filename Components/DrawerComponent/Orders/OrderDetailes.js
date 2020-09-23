import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView, TouchableWithoutFeedback, Modal } from 'react-native'
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors'
import BTN from '../../../common/BTN'
import { width, height } from '../../../consts/HeightWidth'
import { useSelector, useDispatch } from 'react-redux'
import { Order_Detailes, CancelOrders, ConfirmOrders } from '../../../store/action/OrdersAction';
import { useIsFocused } from "@react-navigation/native";
import Container from '../../../common/Container'




function OrderDetailes({ navigation, route, onPressDetailes }) {

    const [click, setClick] = useState(true)
    const [click1, setClick1] = useState(true)
    const [click3, setClick3] = useState(true)
    const [click4, setClick4] = useState(true)
    const [ModalVisible, setModalVisible] = useState(false)

    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const dispatch = useDispatch();
    const OrderDet = useSelector(state => state.Orders.OrderDetailes);
    const LoaderOrder = useSelector(state => state.Orders.loader);
    const { OrderId } = route.params
    const isFocused = useIsFocused();
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        dispatch(Order_Detailes(token, OrderId, lang)).then(() => setSpinner(false))

    }, []);


    const CancelIncomingOrders = () => {
        dispatch(CancelOrders(token, OrderId, navigation))

    }

    const ConfirmIncomingOrders = () => {
        setSpinner(true)
        dispatch(ConfirmOrders(token, OrderId))
        navigation.navigate('AllOrders', { statues: 'RUNNING', label: i18n.t('ActiveRequests') })
        setSpinner(false)

    }



    const OrderProcceed = () => {
        setSpinner(true)
        dispatch(ConfirmOrders(token, OrderId))
        dispatch(Order_Detailes(token, OrderId, lang)).then(() => setSpinner(false))

    }
    const OrderDelivered = () => {
        setSpinner(true)
        dispatch(ConfirmOrders(token, OrderId)).then(() => setSpinner(false))
        navigation.navigate('HomePage')
    }
    return (

        OrderDet ?
            <Container loading={spinner}>
                <View style={{ flex: 1 }}>
                    <Header navigation={navigation} label={i18n.t('orderDetailes') + `${OrderDet.data.order_id}`} />

                    <ScrollView style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => setClick(!click)}>
                            <View style={{ width: '90%', margin: 20, backgroundColor: '#F8F8F8', height: 50, justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center', }}>
                                    <Text style={styles.nMenu}>{i18n.t('ClientInfo')}</Text>
                                    {
                                        click ?

                                            <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, }} />
                                            :
                                            <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, }} />

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
                            <View style={{ width: '90%', margin: 20, backgroundColor: '#F8F8F8', height: 50, marginTop: 0, justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center' }}>
                                    <Text style={styles.nMenu}>{i18n.t('orderDetailes')}</Text>
                                    {
                                        click1 ?

                                            <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, }} />
                                            :
                                            <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, }} />

                                    }
                                </View>
                            </View>
                        </TouchableOpacity>
                        {
                            click1 ?
                                OrderDet && OrderDet.data.products.length ?

                                    OrderDet.data.products.map(item => (
                                        <>
                                            <View key={`${item.id}`} style={{ flexDirection: 'row', overflow: 'hidden', flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, margin: 20, backgroundColor: Colors.bg, width: '90%', height: 40, borderWidth: 1, borderColor: Colors.InputColor, marginTop: 0 }}>
                                                <Text style={styles.name}>{item.name}</Text>
                                                <View style={{ height: 50, width: 1, backgroundColor: Colors.InputColor }}></View>
                                                <Text style={styles.name}>{item.quantity}{i18n.t('Meals')}</Text>
                                                <View style={{ height: 50, width: 1, backgroundColor: Colors.InputColor }}></View>
                                                <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                                                    <Text style={[styles.name, { color: Colors.sky, fontSize: 14, }]}>{i18n.t('detailes')}</Text>
                                                </TouchableWithoutFeedback>

                                            </View>
                                            <View style={styles.centeredView}>
                                                <Modal
                                                    animationType="slide"
                                                    transparent={true}
                                                    style={{ backgroundColor: Colors.bg, }}
                                                    visible={ModalVisible} >

                                                    <View style={styles.centeredView}>
                                                        <View style={styles.modalView}>
                                                            <View style={{ margin: 20, }}>
                                                                {
                                                                    item.extras.map((ex, index) => {
                                                                        return (
                                                                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                                <Text style={{ fontFamily: 'flatMedium', }}>_{ex.name}</Text>
                                                                                <Text style={{ fontFamily: 'flatMedium', paddingHorizontal: 20, color: Colors.sky }}>{ex.price} {i18n.t('Rial')}</Text>

                                                                            </View>
                                                                        )
                                                                    })
                                                                }

                                                                <BTN title={i18n.t('close')} ContainerStyle={styles.LoginBtn} onPress={() => setModalVisible(false)} />
                                                            </View>
                                                        </View>
                                                    </View>
                                                </Modal>
                                            </View>
                                        </>

                                    ))


                                    : null

                                : null
                        }



                        <TouchableOpacity onPress={() => setClick3(!click3)}>
                            <View style={{ width: '90%', margin: 20, backgroundColor: '#F8F8F8', justifyContent: 'center', height: 50, marginTop: 0 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center' }}>
                                    <Text style={styles.nMenu}>{i18n.t('Paymentmethod')}</Text>
                                    {
                                        click3 ?

                                            <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, }} />
                                            :
                                            <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, }} />

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
                            <View style={{ width: '90%', margin: 20, backgroundColor: '#F8F8F8', justifyContent: 'center', height: 50, }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center' }}>
                                    <Text style={styles.nMenu}>{i18n.t('prices')}</Text>
                                    {
                                        click4 ?

                                            <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, }} />
                                            :
                                            <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, }} />

                                    }
                                </View>
                            </View>
                        </TouchableOpacity>

                        {
                            click4 ?
                                <View style={{ flexDirection: 'row', marginHorizontal: '7%' }}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'center', }}>
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
                            OrderDet &&
                                OrderDet.data.status === 'WAITING' ?
                                <>
                                    < BTN title={i18n.t('confirm')} ContainerStyle={styles.LoginBtn} onPress={ConfirmIncomingOrders} />
                                    <BTN title={i18n.t('refuse')} ContainerStyle={[styles.LoginBtn, { backgroundColor: Colors.InputColor }]} onPress={CancelIncomingOrders} />
                                </>
                                : OrderDet.data.status === 'PROGRESS' ?
                                    < BTN title={i18n.t('AcceptOrders')} ContainerStyle={styles.LoginBtn} onPress={OrderProcceed} />
                                    : OrderDet.data.status === 'READY' ?
                                        <>
                                            < BTN title={i18n.t('findDelegate')} ContainerStyle={[styles.LoginBtn, { backgroundColor: Colors.InputColor }]} disabled={true} onPress={() => { }} />
                                            <Text style={{ color: 'red' }}> {i18n.t('findDelegate')}..........</Text>
                                        </>
                                        :
                                        null
                        }





                    </ScrollView>

                </View>
            </Container>
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#737373',
        opacity: .9,

    },
    modalView: {
        backgroundColor: "white",

        width: '90%',
        shadowColor: "#000",

        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
})

export default OrderDetailes
