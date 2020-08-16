import React from 'react'
import { View, StyleSheet, Image, Text, FlatList, I18nManager, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../consts/Colors';
import { width, height } from '../consts/HeightWidth';
import i18n from '../locale/i18n'

function Card() {

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
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={Orderdata}
                keyExtractor={(item) => item.id}
                renderItem={(item) => (
                    <View style={{
                        height: width * .3,
                        width: width * .29,
                        marginStart: 5,
                        borderRadius: 25,
                        borderTopStartRadius: 0,
                        flex: 1,
                        overflow: 'hidden'
                    }}>
                        <LinearGradient
                            colors={item.item.color}
                            style={styles.Linear}  >
                            <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center', }}>
                                <Image source={require('../assets/Images/carts_order_icon.png')} style={{ width: 20, height: 20 }} />
                                <Text style={[styles.Text, { marginTop: 5, }]}>{item.item.title}</Text>
                                <Text style={styles.Text}>{item.item.number}</Text>
                            </View>
                        </LinearGradient>

                    </View>



                )} />
        </View>
    )
}
const styles = StyleSheet.create({
    Text: {
        fontFamily: 'flatMedium',
        fontSize: width * .028,
        color: Colors.bg,
        textAlign: 'center'
    },
    Linear: {
        flex: 1,
    },
})
export default Card
