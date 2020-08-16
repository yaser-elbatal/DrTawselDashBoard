import React from 'react'
import { View, StyleSheet, FlatList, Text, Image } from 'react-native';

import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import { width } from '../../../consts/HeightWidth'
import Card from '../../../common/Card';
import Colors from '../../../consts/Colors'

function Comments({ navigation }) {

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

    const CommInf = [{
        id: 'K0',
        Image: require('../../../assets/Images/imagecomment.png'),
        Date: '20/9/2020',
        Text: 'هذا  النص هو مثال لنص يمكن ان يتولد في نفس المساحه ',
        label: `${i18n.t('name')}`,
        StarImage: require('../../../assets/Images/star_half_yellow.png'),
        StImage: require('../../../assets/Images/star_gray_half.png')
    },
    {
        id: 'K1',
        Image: require('../../../assets/Images/imagecomment.png'),
        Date: '20/9/2020',
        Text: 'هذا  النص هو مثال لنص يمكن ان يتولد في نفس المساحه ',
        label: `${i18n.t('name')}`,
        StarImage: require('../../../assets/Images/star_half_yellow.png'),
        StImage: require('../../../assets/Images/star_gray_half.png')


    },
    {
        id: 'K2',
        Image: require('../../../assets/Images/imagecomment.png'),
        Date: '20/9/2020',
        Text: 'هذا  النص هو مثال لنص يمكن ان يتولد في نفس المساحه ',
        label: `${i18n.t('name')}`,
        StarImage: require('../../../assets/Images/star_half_yellow.png'),
        StImage: require('../../../assets/Images/star_gray_half.png')


    }


        ,
    ]

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} label={i18n.t('comments')} />
            <Card />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                <View style={{ backgroundColor: Colors.InputColor, height: 70, width: '95%', margin: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
                    <Image source={require('../../../assets/Images/big_star_yellow.png')} style={{ width: '20%', height: '50%' }} resizeMode='contain' />
                    <Text style={[styles.Text, { color: Colors.IconBlack, fontSize: 16 }]}>{i18n.t('RateNum')} : (16)</Text>
                </View>
            </View>

            <FlatList
                pagingEnabled={true}
                data={CommInf}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={(item) => (

                    <View style={styles.Card}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 20, }}>
                            <Image source={item.item.Image} style={{ height: 50, width: 50, borderRadius: 50, }} />
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginHorizontal: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <Text style={[styles.CardText]}>{item.item.label}</Text>
                                    <Text style={[styles.CardText, { color: Colors.fontNormal, fontSize: 10, }]}>{item.item.Date}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', }}>
                                    <Image source={item.item.StarImage} style={{ height: 12, width: 12, }} />
                                    <Image source={item.item.StarImage} style={{ height: 12, width: 12, }} />
                                    <Image source={item.item.StarImage} style={{ height: 12, width: 12, }} />
                                    <Image source={item.item.StarImage} style={{ height: 12, width: 12, }} />
                                    <Image source={item.item.StImage} style={{ height: 12, width: 12, }} />
                                </View>
                                <Text style={[styles.CardText, { color: Colors.fontNormal, fontSize: 10, }]}>
                                    {item.item.Text}
                                </Text>
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
    Card: {
        height: 140,
        shadowColor: Colors.bg,
        margin: 10,
        borderRadius: 10,
        backgroundColor: Colors.bg,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        overflow: 'hidden',
        marginBottom: 0,
        flex: 1
    },
    CardText: {
        fontFamily: 'flatMedium',
        fontSize: 13,
        color: Colors.IconBlack,
        marginVertical: 5
    },
})
export default Comments
