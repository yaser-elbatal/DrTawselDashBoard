import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors';

function Notifications({ navigation }) {

    const notifyData =
        [
            {
                id: 'K0',
                Image: require('../../../assets/Images/circlegreen.png'),
                label: 'اشعار من الاداره',
                Sub: 'هذا النص هو مثال لصن يمكن ان يستبدل في نفس المساحه'
            },
            {
                id: 'K1',
                Image: require('../../../assets/Images/circlegreen.png'),
                label: 'اشعار من الاداره',
                Sub: 'هذا النص هو مثال لصن يمكن ان يستبدل في نفس المساحه'


            },
            {
                id: 'K2',
                Image: require('../../../assets/Images/circlegreen.png'),
                label: 'اشعار من الاداره',
                Sub: 'هذا النص هو مثال لصن يمكن ان يستبدل في نفس المساحه'


            }
        ]
    return (

        <View style={{ flex: 1 }}>
            <Header navigation={navigation} label={i18n.t('notifications')} />

            <FlatList
                pagingEnabled={true}
                style={{ marginTop: 20 }}
                data={notifyData}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={(item) => (
                    <View style={{ borderWidth: 1, width: '90%', height: 100, marginHorizontal: '7%', borderRightWidth: 0, borderTopWidth: 0, borderColor: Colors.InputColor }}>
                        <View style={{ flexDirection: 'column', margin: 20, justifyContent: 'center', flex: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={item.item.Image} style={{ width: 12, height: 12 }} />
                                    <Text style={styles.Text}>{item.item.label}</Text>
                                </View>
                                <TouchableOpacity>
                                    <Image source={require('../../../assets/Images/cross_gray_not.png')} style={{ width: 10, height: 12 }} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.sText}>{item.item.Sub}</Text>
                        </View>

                    </View>
                )} />

        </View>
    )
}


const styles = StyleSheet.create({

    Text: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.IconBlack,
        textAlign: 'center',
        marginHorizontal: 10
    },
    sText: {
        fontFamily: 'flatMedium',
        fontSize: 10,
        color: Colors.fontNormal,
        marginVertical: 5,
        marginHorizontal: 20
    },


})


export default Notifications
