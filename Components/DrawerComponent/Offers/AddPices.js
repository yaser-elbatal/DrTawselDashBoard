import React from 'react'
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, I18nManager, FlatList, ScrollView } from 'react-native';
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window')

function AddPices({ navigation }) {

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

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} label={i18n.t('AddPices')} />
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
                                <Image source={require('../../../assets/Images/carts_order_icon.png')} style={{ width: 20, height: 20 }} />
                                <Text style={styles.Text}>{item.item.title}</Text>
                                <Text style={styles.Text}>{item.item.number}</Text>
                            </View>
                        </LinearGradient>

                    )} />
                <Image source={require('../../../assets/Images/add_photo.png')} style={{ width: 100, height: 100, marginTop: 30 }} />
            </View>
            {/* <View>
                <Image source={} style={{}}/>
           </View> */}
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
        width: width * .26,
        flex: 1

    },
    Text: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.bg,
        textAlign: 'center'
    },

})
export default AddPices
