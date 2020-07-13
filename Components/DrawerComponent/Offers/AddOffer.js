import React from 'react'
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, I18nManager } from 'react-native';
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors'
const { width } = Dimensions.get('window')


function AddOffer({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} label={i18n.t('AddPices')} />
            <View style={styles.wrap}>

                <TouchableOpacity onPress={() => navigation.navigate('AddPices')}>
                    <View style={styles.Container}>
                        <Text style={styles.text}>{i18n.t('AddPice')}</Text>
                        {
                            I18nManager.isRTL ?
                                <Image source={require('../../../assets/Images/opengrayarrow.png')} style={styles.Img} resizeMode='contain' />
                                :
                                <Image source={require('../../../assets/Images/opengrayarrow_left.png')} style={styles.Img} resizeMode='contain' />

                        }
                    </View>
                </TouchableOpacity>

                <View style={styles.Line}></View>

                <TouchableOpacity onPress={() => navigation.navigate('')}>
                    <View style={styles.Container}>
                        <Text style={styles.text}>{i18n.t('Previousoffers')}</Text>
                        {
                            I18nManager.isRTL ?
                                <Image source={require('../../../assets/Images/opengrayarrow.png')} style={styles.Img} resizeMode='contain' />
                                :
                                <Image source={require('../../../assets/Images/opengrayarrow_left.png')} style={styles.Img} resizeMode='contain' />

                        }
                    </View>
                </TouchableOpacity>

                <View style={styles.Line}></View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'column',
        marginTop: 25,
        backgroundColor: Colors.bgGray,
    },
    Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        padding: 10,
        alignItems: 'center',
    },
    Img: {
        height: 25,
        width: 25,
    },
    BImg: {
        height: 50,
        width: 50,
    },
    Line: {
        width,
        height: 1,
        backgroundColor: Colors.fontBold,
        opacity: .2
    },
    text: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.IconBlack
    }
})
export default AddOffer
