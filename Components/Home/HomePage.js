import React from 'react'
import { View, StyleSheet, Image, Text, FlatList, } from 'react-native';

import HomeHeader from '../../common/HomeHeader'
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../consts/Colors';
import { width } from '../../consts/HeightWidth';
import i18n from '../../locale/i18n'
import { Content } from 'native-base';



function HomePage({ navigation }) {

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


    const ProductData = [{
        id: 'K0',
        title: `${i18n.t('Prod')}`,
        price: `500 ${i18n.t('RS')}`,
        Image: require('../../assets/Images/imageseven.png')
    },
    {
        id: 'K1',
        title: `${i18n.t('Prod')}`,
        price: `500 ${i18n.t('RS')}`,
        Image: require('../../assets/Images/imagesix.png')
    },
    {
        id: 'K2',
        title: `${i18n.t('Prod')}`,
        price: `500 ${i18n.t('RS')}`,
        Image: require('../../assets/Images/imagefive.png')
    }
        ,
    ]

    const RebortData = [{
        id: 'K0',
        title: `${i18n.t('Prod')}`,
        sub: `${i18n.t('Yourproducts')}`,
        Image: require('../../assets/Images/nounproducticon.png'),
        num: 100
    },
    {
        id: 'K1',
        title: `${i18n.t('comments')}`,
        sub: `${i18n.t('Comm')}`,
        Image: require('../../assets/Images/comment.png'),
        num: 100
    },
    {
        id: 'K2',
        title: `${i18n.t('rateing')}`,
        sub: `${i18n.t('Rate')}`,
        Image: require('../../assets/Images/star_icon_blue.png'),
        num: 100
    }
        ,
    ]




    return (
        <View style={{ flex: 1, }}>

            <HomeHeader navigation={navigation} label={i18n.t('Hello')} title={i18n.t('Dash')} onPress={() => navigation.navigate('MyProfile')} />
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
                                <Image source={require('../../assets/Images/carts_order_icon.png')} style={{ width: 20, height: 20 }} />
                                <Text style={styles.Text}>{item.item.title}</Text>
                                <Text style={styles.Text}>{item.item.number}</Text>
                            </View>
                        </LinearGradient>

                    )} />
            </View>


            <Text style={styles.MainText}>{i18n.t('newProduct')}</Text>

            <Content showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

                <FlatList
                    horizontal
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    data={ProductData}
                    keyExtractor={(item) => item.id}
                    renderItem={(item) => (

                        <View style={styles.Card}>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Image source={item.item.Image} style={{ width: '100%', height: '70%', borderTopRightRadius: 10, borderTopLeftRadius: 10 }} />
                                <View style={{ margin: 10, flex: 1 }}>
                                    <Text style={styles.prod}>{item.item.title}</Text>
                                    <Text style={[styles.prod, { color: Colors.fontNormal }]}>{item.item.price}</Text>
                                </View>
                            </View>
                        </View>
                    )} />
                <Text style={styles.MainText}>{i18n.t('Quickreports')}</Text>
                <FlatList
                    pagingEnabled={true}
                    showsVerticalScrollIndicator={false}
                    data={RebortData}
                    keyExtractor={(item) => item.id}
                    renderItem={(item) => (
                        <View style={styles.SCard}>
                            <View style={{ flexDirection: 'row', height: '100%', }}>
                                <View style={styles.ImgWrab}>
                                    <Image source={item.item.Image} style={styles.SImg} resizeMode='contain' />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <View style={styles.WrabText}>
                                        <Text style={styles.ProdText}>{item.item.title}</Text>
                                        <Text style={[styles.ProdText, { color: Colors.fontNormal }]}>{item.item.sub}</Text>
                                    </View>
                                </View>
                                <Text style={styles.num}>{item.item.num}</Text>
                            </View>
                        </View>)} />

            </Content>


        </View >
    )
}
const styles = StyleSheet.create({
    wrab: {
        width: 100,
        alignSelf: 'center',
        overflow: 'hidden',
        marginEnd: 15,
        marginStart: 10,

        flex: 1
    },
    Linear: {
        borderTopStartRadius: 0,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        marginStart: 5,
        marginEnd: 5,
        height: 120,
        width: width * .27,
        flex: 1

    },
    num: {
        alignSelf: 'center',
        color: Colors.sky,
        marginEnd: 10,
        fontSize: 30,
        fontFamily: 'flatMedium',
    },
    SCard: {
        height: 80,
        width: '90%',
        margin: 20,
        shadowColor: Colors.bg,
        marginTop: -10,
        backgroundColor: Colors.bg,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        overflow: 'hidden',

    },
    MainText: {
        fontFamily: 'flatMedium',
        fontSize: 20, margin: 20
    },
    ImgWrab: {
        height: '100%',
        width: 90,
        backgroundColor: '#AAEFFC',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Text: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.bg,
        textAlign: 'center'
    },

    ProdText: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.IconBlack
    },
    prod: {
        fontFamily: 'flatMedium',
        fontSize: 10
    },
    Card: {
        margin: 10,
        borderRadius: 15,
        width: width * .5,
        height: width * .45,
        backgroundColor: Colors.bg,
        flex: 1
    },
    WrabText: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginStart: 15
    },
    SImg: {
        height: '50%',
        width: '50%',
        alignSelf: 'center'
    }
})
export default HomePage
