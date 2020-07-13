import React, { useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ImageBackground, I18nManager } from 'react-native'

import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors'


function ProductDet({ navigation }) {
    const [click1, setClick1] = useState(true)
    const [click2, setClick2] = useState(true)
    const [Select, setSelect] = useState(true)

    return (
        <View style={{ flex: 1 }}>
            <Image source={require('../../../assets/Images/imageone.png')} style={styles.ImgBackGround} />
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
                        <Text style={styles.text}>{i18n.t('ProductDetailes')}</Text>
                        <TouchableOpacity onPress={() => setSelect(!Select)}>
                            {
                                Select ?
                                    <Image source={require('../../../assets/Images/on_notifcatiom.png')} style={styles.BImg} resizeMode='contain' />
                                    :
                                    <Image source={require('../../../assets/Images/off_notifcatiom.png')} style={styles.BImg} resizeMode='contain' />

                            }
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={styles.num}>{i18n.t('num')}#1</Text>
                        <Text style={[styles.num, { color: Colors.fontNormal }]}>{i18n.t('menue')}</Text>
                        <Text style={[styles.num, { color: Colors.IconBlack }]}>{i18n.t('Prod')}</Text>
                        <Text style={styles.num}>122{i18n.t('Rial')}</Text>


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
                            <Text style={{ marginTop: 15 }}>
                                هذا النص هو مثال لنص يمكن ان يستبدل ف نفس المساحه
                                هذا النص هو مثال لنص يمكن ان يستبدل ف نفس المساحه
                                هذا النص هو مثال لنص يمكن ان يستبدل ف نفس المساحه
                                هذا النص هو مثال لنص يمكن ان يستبدل ف نفس المساحه
                                هذا النص هو مثال لنص يمكن ان يستبدل ف نفس المساحه


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

                                <Text style={styles.name}> -   كولا </Text>
                                <Text style={styles.name}>-    بيبسي </Text>
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
