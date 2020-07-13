import React, { useState } from 'react'
import { View, StyleSheet, Image, Text, FlatList, ScrollView, TouchableOpacity, Modal } from 'react-native';
import HomeHeader from '../../../common/HomeHeader'
import i18n from '../../../locale/i18n'
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../../consts/Colors';
import { InputIcon } from '../../../common/InputText';
import { width, height } from '../../../consts/HeightWidth';
import { CheckBox } from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';
import BTN from '../../../common/BTN';

function Menue({ navigation }) {
    const [isSelected, setSelection] = useState();
    const [isSelected2, setSelection2] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const [Operation, setOpeartion] = useState('uk');
    const [Arange, setArange] = useState('new');

    const Items = [
        { label: 'حذف', value: 'uk', },

    ]
    const Arrangement = [
        { label: 'الاحدث', value: 'new', },

    ]

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


    const MeueCard = [{
        id: 'K0',
        num: 1,
        title: 'اسم المنيو',
    },
    {
        id: 'K1',
        num: 2,
        title: 'اسم المنيو',
    },
    {
        id: 'K2',
        num: 3,
        title: 'اسم المنيو',
    }
        ,

    ]
    return (
        <View style={{ flex: 1 }}>
            <HomeHeader navigation={navigation} label={i18n.t('menue')} onPress={() => navigation.navigate('MyProfile')} />
            <InputIcon
                placeholder={i18n.t('search1')}
                image={require('../../../assets/Images/search.png')}
                styleCont={{ marginTop: -10, height: width * .18, }}
                inputStyle={{ backgroundColor: '#DBDBDB' }}
            />

            <ScrollView style={{ flex: 1 }}>
                <View style={{ margin: 10, marginVertical: 0, alignItems: 'center' }}>
                    <FlatList
                        horizontal
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        data={Orderdata}
                        keyExtractor={(item) => item.id}
                        renderItem={(item) => (

                            <View style={styles.wrab}>
                                <LinearGradient
                                    colors={item.item.color}
                                    style={styles.Linear}>
                                    <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                                        <Image source={require('../../../assets/Images/carts_order_icon.png')} style={{ width: 20, height: 20 }} />
                                        <Text style={styles.Text}>{item.item.title}</Text>
                                        <Text style={styles.Text}>{item.item.number}</Text>
                                    </View>
                                </LinearGradient>
                            </View>

                        )} />
                </View>


                <View style={{ backgroundColor: '#DBDBDB', width: '90%', margin: 20, height: 60, flexDirection: 'row', alignItems: 'center', }}>
                    <CheckBox checked={isSelected} color={isSelected ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: isSelected ? Colors.sky : Colors.bg, width: 20, height: 20, }} onPress={() => setSelection(!isSelected)} />
                    <Text style={{ marginStart: 10, fontFamily: 'flatMedium', fontSize: 10, }}>{i18n.t('Select')}</Text>
                    <DropDownPicker
                        defaultValue={Operation}
                        onChangeItem={(val) => setOpeartion(val.value)}
                        containerStyle={{ width: 90, }}

                        dropDownStyle={{
                            backgroundColor: Colors.bg,
                        }}
                        style={{ backgroundColor: '#fafafa', margin: 10 }}
                        itemStyle={{ justifyContent: 'flex-start', flexDirection: 'column', }}
                        items={Items} />
                    <Text style={{ fontFamily: 'flatMedium', fontSize: 10, }}>{i18n.t('filter')}</Text>

                    <DropDownPicker
                        defaultValue={Arange}
                        items={Arrangement}
                        onChangeItem={(val) => setArange(val.value)}
                        containerStyle={{ width: 100, }}
                        dropDownStyle={{
                            backgroundColor: Colors.bg,
                        }}
                        style={{ backgroundColor: '#fafafa', margin: 10 }}
                        itemStyle={{ justifyContent: 'center', flexDirection: 'column', }}


                    />

                </View>

                <BTN title={i18n.t('AddMenue')} ContainerStyle={[styles.LoginBtn, { marginHorizontal: 18, marginVertical: 10 }]} onPress={() => setModalVisible(true)} />


                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible} >

                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={{ margin: 20 }}>
                                    <Text style={{ fontFamily: 'flatMedium', fontSize: 14, }}>{i18n.t('AddMenue')} </Text>
                                    <InputIcon
                                        placeholder={i18n.t('menueAr')}
                                        inputStyle={{ textAlign: 'center', }}

                                    />
                                    <InputIcon
                                        placeholder={i18n.t('menueEn')}
                                        styleCont={{ marginTop: -5 }}
                                        inputStyle={{ textAlign: 'center', }}
                                    />
                                    <BTN title={i18n.t('AddMenue')} ContainerStyle={styles.LoginBtn} onPress={() => setModalVisible(false)} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>



                <FlatList
                    pagingEnabled={true}
                    showsVerticalScrollIndicator={false}
                    data={MeueCard}
                    keyExtractor={(item) => item.id}
                    renderItem={(item) => (

                        <View style={styles.Card}>
                            <View style={styles.FWrab}>
                                <CheckBox checked={isSelected2} color={isSelected2 ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: isSelected2 ? Colors.sky : Colors.bg, width: 20, height: 20, }} onPress={() => setSelection2(!isSelected2)} />
                                <Text style={styles.nText}>{i18n.t('num')} # {item.item.num}</Text>
                                <View style={{ flexDirection: 'row', marginStart: 5, alignItems: 'center' }}>
                                    <Text style={styles.nMenu}>{i18n.t('name')} :   </Text>
                                    <Text style={styles.name}>{item.item.title}</Text>
                                </View>
                            </View>
                            <View style={styles.SWarb}>
                                <View style={styles.Edit}>
                                    <TouchableOpacity>
                                        <Image source={require('../../../assets/Images/Icon_edit.png')} style={styles.Img} resizeMode='contain' />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.Delete}>
                                    <TouchableOpacity>
                                        <Image source={require('../../../assets/Images/trash_white.png')} style={styles.Img} resizeMode='contain' />
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>
                    )} />

            </ScrollView>

        </View >
    )
}
const styles = StyleSheet.create({
    wrab: {
        overflow: 'hidden',
    },
    Linear: {
        height: 120,
        justifyContent: 'center',
        borderTopStartRadius: 0,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        flex: 1,
        width: width * .27,

        marginHorizontal: 5

    },
    Text: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.bg,
        textAlign: 'center'
    },
    LoginBtn: {
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 15,
        marginTop: 0,
        width: '91%',
    },
    Card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 100,
        width: '90%',
        marginStart: 20,
        marginVertical: 5,
        shadowColor: Colors.bg,
        marginTop: 0,
        backgroundColor: Colors.bg,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        overflow: 'hidden',
    },
    FWrab: {
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 5,
        flex: .75
    },
    nText: {
        color: Colors.sky,
        marginStart: 10,
        marginVertical: 5
    },
    nMenue: {
        fontFamily: 'flatMedium',
        fontSize: 12,
    },
    name: {
        fontFamily: 'flatMedium',
        fontSize: 10,
        color: Colors.fontNormal
    },
    SWarb: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flex: .25,
    },
    Edit: {
        backgroundColor: '#E3E3E3',
        height: '50%',
        justifyContent: 'center',
        width: 30
    },
    Delete: {
        backgroundColor: Colors.RedColor,
        height: '50%',
        justifyContent: 'center', width: 30
    },
    Img: {
        height: 20,
        width: 20,
        alignSelf: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: '#737373',
        opacity: .9,

    },
    modalView: {
        backgroundColor: "white",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        width: width,
        height: height * .4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
})

export default Menue
