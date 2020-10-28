import React, { useEffect, useState } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { GetNotifications, DeleteNotifications } from '../../../store/action/NotificationsAction';
import Container from '../../../common/Container';

function Notifications({ navigation }) {

    const Notifications = useSelector(state => state.notifications.notify);
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const [spinner, setspinner] = useState(true)


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setspinner(true)
            dispatch(GetNotifications(token, lang)).then(() => setspinner(false))
        });

        return unsubscribe;
    }, [navigation])


    const DeleteNotify = (id) => {
        setspinner(true)
        dispatch(DeleteNotifications(token, id))
        dispatch(GetNotifications(token, lang)).then(() => setspinner(false))
    }


    // const notifyData =
    //     [
    //         {
    //             id: 'K0',
    //             Image: require('../../../assets/Images/circlegreen.png'),
    //             label: 'اشعار من الاداره',
    //             Sub: 'هذا النص هو مثال لصن يمكن ان يستبدل في نفس المساحه'
    //         },
    //         {
    //             id: 'K1',
    //             Image: require('../../../assets/Images/circlegreen.png'),
    //             label: 'اشعار من الاداره',
    //             Sub: 'هذا النص هو مثال لصن يمكن ان يستبدل في نفس المساحه'


    //         },
    //         {
    //             id: 'K2',
    //             Image: require('../../../assets/Images/circlegreen.png'),
    //             label: 'اشعار من الاداره',
    //             Sub: 'هذا النص هو مثال لصن يمكن ان يستبدل في نفس المساحه'


    //         }
    //     ]
    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} label={i18n.t('notifications')} />
            <Container loading={spinner}>

                {
                    !Notifications ?
                        <Image source={require('../../../assets/Images/empty.png')} style={{ height: 150, width: 150, alignSelf: 'center' }} />
                        :
                        <FlatList
                            pagingEnabled={true}
                            style={{ marginTop: 20 }}
                            data={Notifications}
                            extraData={spinner}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            renderItem={(item) => (
                                <TouchableOpacity onPress={() => item.item.type == 'order' ? navigation.navigate('OrderDetailes', { OrderId: item.item.order_id }) : {}}>
                                    <View style={{ borderWidth: 1, width: '90%', height: 100, marginHorizontal: '7%', borderRightWidth: 0, borderTopWidth: 0, borderColor: Colors.InputColor }}>
                                        <View style={{ flexDirection: 'column', margin: 20, justifyContent: 'center', flex: 1 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Image source={require('../../../assets/Images/circlegreen.png')} style={{ width: 12, height: 12 }} />
                                                    <Text style={styles.Text}>{item.item.title}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => DeleteNotify(item.item.id)}>
                                                    <Image source={require('../../../assets/Images/cross_gray_not.png')} style={{ width: 10, height: 12 }} resizeMode='contain' />
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={styles.sText}>{item.item.body}</Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>

                            )} />
                }
            </Container>

        </View>
    )
}


const styles = StyleSheet.create({

    Text: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.IconBlack,
        textAlign: 'center',
        marginHorizontal: 10
    },
    sText: {
        fontFamily: 'flatMedium',
        fontSize: 10,
        color: Colors.fontNormal,
        marginVertical: 5,
        marginHorizontal: 20
    },


})


export default Notifications
