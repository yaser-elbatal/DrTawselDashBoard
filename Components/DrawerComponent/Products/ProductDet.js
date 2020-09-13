import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ImageBackground, I18nManager, ActivityIndicator } from 'react-native'

import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors'
import { useDispatch, useSelector } from 'react-redux';
import { ProductDetailes } from '../../../store/action/ProductAction';


function ProductDet({ navigation, route }) {

    const { Products, index } = route.params;
    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const [spinner, setSpinner] = useState(false);

    const dispatch = useDispatch();


    console.log(Products);

    useEffect(() => {
        dispatch(ProductDetailes(token, lang, Products.id))
        setSpinner(true)
        Products
    }, [dispatch])

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(false)
        });

        setSpinner(false)
        return unsubscribe;
    }, [navigation, spinner]);
    const [click1, setClick1] = useState(true)
    const [click2, setClick2] = useState(true)
    const [Select, setSelect] = useState(true)


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
                    backgroundColor: "rgba(0,0,0,0.5)",
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

            <Image source={{ uri: Products.image }} style={styles.ImgBackGround} />
            <ImageBackground source={require('../../../assets/Images/bluBack.png')} style={{ height: 120, width: 120, alignItems: 'center', justifyContent: 'center', position: 'absolute', marginTop: -20, marginLeft: -20 }} resizeMode='contain'>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    {
                        I18nManager.isRTL ?
                            <Image source={require('../../../assets/Images/arrowwhite.png')} style={{ height: 25, width: 25, marginTop: 45 }} resizeMode='contain' />
                            :
                            <Image source={require('../../../assets/Images/left.png')} style={{ height: 25, width: 25, marginTop: 45 }} resizeMode='contain' />

                    }
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.ScrolContainer}>
                <ScrollView style={{ flex: 1, marginStart: 20, marginEnd: 20 }} showsVerticalScrollIndicator={false}>


                    <View style={styles.Wrab}>
                        <Text style={styles.text}>{Products.name}</Text>
                        <TouchableOpacity >
                            {
                                Products.available == 0 ?
                                    <Image source={require('../../../assets/Images/off_notifcatiom.png')} style={styles.BImg} resizeMode='contain' />
                                    :
                                    <Image source={require('../../../assets/Images/on_notifcatiom.png')} style={styles.BImg} resizeMode='contain' />


                            }
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={styles.num}>{i18n.t('num')}#{index + 1}</Text>
                        <Text style={[styles.num, { color: Colors.fontNormal }]}>{Products.menu}</Text>
                        <Text style={[styles.num, { color: Colors.IconBlack }]}>{Products.name}</Text>
                        <Text style={styles.num}>{Products.price}{i18n.t('Rial')}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.num}>{Products.price}</Text>
                            <Text style={[styles.num, { textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: Colors.InputColor, paddingHorizontal: 15, fontSize: 10 }]}>{Products.price - Products.discount}</Text>
                            <Text style={[styles.num, { color: Colors.InputColor }]}>({i18n.t('Availablekilos') + Products.available_kilos})</Text>

                        </View>

                    </View>

                    <TouchableOpacity onPress={() => setClick1(!click1)}>
                        <View style={{ backgroundColor: Colors.InputColor, height: 40, }}>
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
                            <Text style={{ marginTop: 15, fontFamily: 'flatMedium', fontSize: 10, color: Colors.InputColor }}>
                                {Products.details}


                            </Text>
                            :
                            null
                    }
                    <TouchableOpacity onPress={() => setClick2(!click2)}>
                        <View style={{ backgroundColor: Colors.InputColor, height: 40, marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                <Text style={styles.nMenu}>{i18n.t('Additions')}</Text>
                                {
                                    click2 ?

                                        <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, top: 5 }} />
                                        :
                                        <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, top: 5 }} />

                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                    {
                        click2 ?
                            <View style={{ flexDirection: 'column', marginHorizontal: 40 }}>
                                {
                                    Products.extras.map(size => (
                                        <Text style={styles.name} key={size.id}> -   {size.name} </Text>

                                    )

                                    )
                                }
                            </View>

                            : null
                    }
                </ScrollView>
            </View>

        </View>

    )
}
const styles = StyleSheet.create({
    MainText: {
        fontFamily: 'flatMedium',
        fontSize: 16,
        margin: 20
    },
    BImg: {
        height: 50,
        width: 50,
    },
    nMenu: {
        fontFamily: 'flatMedium',
        fontSize: 14,
    },
    num: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.sky,
        marginBottom: 10
    },
    EditImg: {
        width: 20,
        height: 20
    },
    name: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.fontNormal,
        marginVertical: 5
    },
    text: {
        fontFamily: 'flatMedium',
        fontSize: 16,
        color: Colors.IconBlack
    },
    sname: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.fontBold,
        marginHorizontal: 20,
        marginVertical: 5
    },

    ImgBackGround: {
        width: '100%',
        height: '60%',
        bottom: 100,
    },
    Line: {
        height: 1,
        width: '100%',
        backgroundColor: Colors.fontNormal,
        opacity: .2,
        marginVertical: 15
    },
    ScrolContainer: {
        position: 'absolute',
        width: '100%',
        backgroundColor: Colors.bg,
        bottom: 0, height: '60%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    Container: {
        width: '88%',
        margin: 20,
        backgroundColor: Colors.InputColor,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    Wrab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
export default ProductDet
