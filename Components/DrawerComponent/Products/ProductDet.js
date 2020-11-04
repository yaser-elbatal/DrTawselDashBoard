import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ImageBackground, I18nManager, ActivityIndicator } from 'react-native'

import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors'
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../../common/Container';
import { ProductDetailes } from '../../../store/action/ProductAction';


const ProductDet = ({ navigation, route }) => {

    const { ProductsId, index } = route.params;

    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const [spinner, setSpinner] = useState(true);
    const ProductDetA = useSelector(state => state.product.product);

    const dispatch = useDispatch();

    console.log(ProductDetA);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(true)
            dispatch(ProductDetailes(token, lang, ProductsId)).then(() => setSpinner(false))
        });

        return unsubscribe;
    }, [navigation])




    const [click1, setClick1] = useState(true)
    const [click2, setClick2] = useState(true)
    const [Select, setSelect] = useState(true)


    return (
        <Container loading={spinner}>

            <View style={{ flex: 1 }}>
                {
                    !ProductDetA ? null :
                        <>
                            <Image source={{ uri: ProductDetA.image }} style={styles.ImgBackGround} resizeMode='cover' />
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
                                <ScrollView style={{ flex: 1, margin: 20, marginTop: 0 }} showsVerticalScrollIndicator={false}>

                                    <View style={{ flexDirection: 'column', justifyContent: 'center', }}>
                                        <View style={styles.Wrab}>
                                            <View style={{ flexDirection: 'row', }}>
                                                <Text style={styles.text}>{ProductDetA.name_ar}</Text>
                                                <Text style={[styles.text, { paddingHorizontal: 10 }]}>{ProductDetA.name_en}</Text>
                                            </View>

                                            <View >
                                                {
                                                    ProductDetA.available == 0 ?
                                                        <Image source={require('../../../assets/Images/off_notifcatiom.png')} style={styles.BImg} resizeMode='contain' />
                                                        :
                                                        <Image source={require('../../../assets/Images/on_notifcatiom.png')} style={styles.BImg} resizeMode='contain' />


                                                }
                                            </View>


                                        </View>
                                        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                            <Text style={styles.num}>{i18n.t('num')}#{ProductDetA.id}</Text>
                                            <Text style={[styles.num, { color: Colors.fontNormal }]}>{ProductDetA.menu}</Text>
                                            <View style={{ flexDirection: 'row', }}>
                                                <Text style={styles.num}>{ProductDetA.price - ProductDetA.discount}{i18n.t('Rial')}</Text>
                                                <Text style={[styles.num, { textDecorationLine: 'line-through', textDecorationColor: Colors.sky, textDecorationStyle: 'solid', color: Colors.fontNormal, paddingHorizontal: 15, fontSize: 10 }]}>{ProductDetA.price}</Text>
                                                <Text style={[styles.num, { color: Colors.fontNormal }]}>({i18n.t('Availablekilos') + ' : ' + ProductDetA.available_kilos})</Text>

                                            </View>

                                        </View>
                                    </View>


                                    <TouchableOpacity onPress={() => setClick1(!click1)}>
                                        <View style={{ backgroundColor: '#F6F6F6', height: 40, }}>
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
                                            <Text style={{ marginTop: 15, fontFamily: 'flatMedium', fontSize: 12, color: Colors.fontNormal, alignSelf: 'flex-start', paddingHorizontal: 15 }}>
                                                {ProductDetA.details}


                                            </Text>
                                            :
                                            null
                                    }
                                    <TouchableOpacity onPress={() => setClick2(!click2)}>
                                        <View style={{ backgroundColor: '#F6F6F6', height: 40, marginTop: 10 }}>
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

                                            ProductDetA.extras && ProductDetA.extras.map((size, index) => (
                                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }} key={index + 1}>
                                                    <Text style={styles.name} key={size.id}> {size.name} </Text>
                                                    <Text style={[styles.num, { marginBottom: 0, paddingHorizontal: 15, alignSelf: 'flex-start' }]}>{size.price}{i18n.t('Rial')}</Text>

                                                </View>



                                            ))


                                            : null
                                    }
                                </ScrollView>
                            </View>
                        </>
                }


            </View>
        </Container>

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
        marginBottom: 10,
        paddingVertical: 3
    },
    EditImg: {
        width: 20,
        height: 20
    },
    name: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.fontNormal,
        marginVertical: 5,
        alignSelf: 'flex-start'
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
        height: '50%',
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




