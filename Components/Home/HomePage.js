import React from 'react'
import { View, StyleSheet, Image, Text, FlatList, I18nManager, Platform, } from 'react-native';

import HomeHeader from '../../common/HomeHeader'
import Colors from '../../consts/Colors';
import { width, height } from '../../consts/HeightWidth';
import i18n from '../../locale/i18n'
import { Content } from 'native-base';
import Card from '../../common/Card'
import { useSelector } from 'react-redux';


function HomePage({ navigation }) {

    const user = useSelector(state => state.auth.user.data)
    console.log(user.avatar);

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

            <HomeHeader navigation={navigation} image={user.avatar} label={i18n.t('Hello') + user.name + '!'} title={i18n.t('Dash')} onPress={() => navigation.navigate('MyProfile')} />
            <Content showsVerticalScrollIndicator={false} style={{ flex: 1 }}>


                <Card />

                <Text style={styles.MainText}>{i18n.t('newProduct')}</Text>


                <FlatList
                    horizontal
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    data={ProductData}
                    keyExtractor={(item) => item.id}
                    renderItem={(item) => (

                        <View style={styles.Card}>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Image source={item.item.Image} style={{ width: '100%', height: '70%', }} />
                                <View style={{ margin: 10, flex: 1, height: '30%' }}>
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
        flex: 1,
    },
    num: {
        alignSelf: 'center',
        color: Colors.sky,
        marginEnd: 10,
        fontSize: 30,
        fontFamily: 'flatMedium',
    },
    SCard: {
        height: height * .15,
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
        fontSize: width * .03,
        color: Colors.bg,
        textAlign: 'center'
    },

    ProdText: {
        fontFamily: 'flatMedium',
        fontSize: width * .03,
        color: Colors.IconBlack
    },
    prod: {
        fontFamily: 'flatMedium',
        fontSize: width * .025
    },
    Card: {
        margin: 10,
        borderRadius: 20,
        width: width * .5,
        height: height * .25,
        backgroundColor: Colors.bg,
        flex: 1,
        borderTopStartRadius: 0,
        overflow: 'hidden'
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
