import React from 'react'
import { View, Text, Image, Dimensions, StyleSheet, FlatList, } from 'react-native';
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import BTN from '../../../common/BTN';
import Card from '../../../common/Card';

const { width } = Dimensions.get('window')

function Previousoffers({ navigation }) {

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

    const OrderInfo = [{
        id: 'K0',
        Image: require('../../../assets/Images/imagefour.png'),
        Date: '20/9/2020',
        color: Colors.IconBlack,
        label: `${i18n.t('Waitingapproval')}`,
        number: 1
    },
    {
        id: 'K1',
        Image: require('../../../assets/Images/imagefour.png'),
        Date: '20/9/2020',
        color: Colors.GradianGreen,
        label: `${i18n.t('Beenapproved')}`,
        number: 2


    },
    {
        id: 'K2',
        Image: require('../../../assets/Images/imagefour.png'),
        Date: '20/9/2020',
        color: Colors.RedColor,
        label: `${i18n.t('rejected1')}`,
        number: 3


    }


        ,
    ]

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} label={i18n.t('Previousoffers')} />
            <Card />

            <FlatList
                pagingEnabled={true}
                data={OrderInfo}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={(item) => (

                    <View style={styles.Card}>
                        <View style={{ flexDirection: 'row', height: '100%', }}>
                            <Image source={item.item.Image} style={{ height: '100%', width: '25%' }} />
                            <View style={{ flexDirection: 'column', justifyContent: 'center', margin: 10, width: '85%' }}>
                                <Text style={[styles.CardText, { color: Colors.sky }]}>{i18n.t('num')}{item.item.number}</Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={styles.CardText}>{i18n.t('Dateaddition')} : </Text>
                                    <Text style={styles.CardText}>{item.item.Date}</Text>
                                </View>
                                <BTN title={item.item.label} ContainerStyle={styles.LoginBtn} onPress={() => { }} TextStyle={{ color: item.item.color }} />
                            </View>
                        </View>
                    </View>
                )}
            />
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
        height: 110,
        width: width * .3,
        flex: 1

    },
    Text: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.bg,
        textAlign: 'center'
    },
    CardText: {
        fontFamily: 'flatMedium',
        fontSize: 13,
        color: Colors.IconBlack,
        marginVertical: 5
    },
    LoginBtn: {
        marginVertical: 10,
        borderRadius: 5,
        marginHorizontal: 0,
        width: '80%',
        backgroundColor: Colors.InputColor

    },
    Card: {
        height: 140,
        shadowColor: Colors.bg,
        margin: '5%',
        borderRadius: 10,
        backgroundColor: Colors.bg,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        overflow: 'hidden',
        marginTop: 5
    },

})


export default Previousoffers
