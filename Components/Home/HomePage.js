import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Text, FlatList, ActivityIndicator, ScrollView, } from 'react-native';

import HomeHeader from '../../common/HomeHeader'
import Colors from '../../consts/Colors';
import { width, height } from '../../consts/HeightWidth';
import i18n from '../../locale/i18n'
import { Content } from 'native-base';
import Card from '../../common/Card'
import { useSelector, useDispatch } from 'react-redux';
import { GetQuickReborts, GetHomeProducts } from '../../store/action/HomeAction';
import Container from '../../common/Container';
import { TouchableOpacity } from 'react-native-gesture-handler';


function HomePage({ navigation }) {

    const user = useSelector(state => state.auth.user.data);
    const token = useSelector(state => state.auth.user.data.token)
    const [spinner, setSpinner] = useState(true);
    console.log(token);
    const lang = useSelector(state => state.lang.language);
    const HomeProduct = useSelector(state => state.home.product);
    const QuickRebort = useSelector(state => state.home.extra);
    const dispatch = useDispatch();









    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(true)
            dispatch(GetHomeProducts(token, lang)).then(() => setSpinner(false))
            console.log('11111');
        });

        return unsubscribe;
    }, [navigation])




    return (
        <Container loading={spinner}>
            <Content showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

                <HomeHeader navigation={navigation} image={user.avatar} label={i18n.t('Hello') + user.name + '!'} title={i18n.t('Dash')} onPress={() => navigation.navigate('MyProfile')} />
                <Card />

                <Text style={styles.MainText}>{i18n.t('newProduct')}</Text>
                <ScrollView style={{ flex: 1, }} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        HomeProduct &&
                            HomeProduct ?
                            HomeProduct.map((item, index) => (

                                <TouchableOpacity style={styles.Card} key={item.id} onPress={() => navigation.navigate('ProductDet', { ProductsId: item.id, index: index })}>
                                    <View style={{ flexDirection: 'column', flex: 1 }}>
                                        <Image source={{ uri: item.image }} style={{ width: '100%', height: '70%', }} />
                                        <View style={{ margin: 10, flex: 1, height: '30%', flexDirection: 'column' }}>
                                            <Text style={styles.prod}>{item.name}</Text>
                                            <Text style={[styles.prod, { color: Colors.fontNormal, paddingVertical: 5 }]}>{item.price}{i18n.t('RS')}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                            ) : <Image source={require('../../assets/Images/empty.png')} style={{ height: 150, width: 150, alignSelf: 'center' }} />


                    }
                </ScrollView>

                <Text style={styles.MainText}>{i18n.t('Quickreports')}</Text>
                {
                    QuickRebort && QuickRebort.reports ?
                        <View style={styles.SCard}>
                            <View style={{ flexDirection: 'row', height: '100%', }}>
                                <View style={styles.ImgWrab}>
                                    <Image source={require('../../assets/Images/nounproducticon.png')} style={styles.SImg} resizeMode='contain' />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <View style={styles.WrabText}>
                                        <Text style={styles.ProdText}>{QuickRebort.reports.products}</Text>
                                        <Text style={[styles.ProdText, { color: Colors.fontNormal }]}>{QuickRebort.reports.comments}</Text>
                                    </View>
                                </View>
                                <Text style={styles.num}>{QuickRebort.reports.rates}</Text>
                            </View>
                        </View>
                        :
                        <Image source={require('../../assets/Images/empty.png')} style={{ height: 150, width: 150, alignSelf: 'center' }} />
                }

            </Content>

        </Container>


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
