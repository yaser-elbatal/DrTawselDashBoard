import React, { useState } from 'react'
import { View, StyleSheet, Image, Text, FlatList, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Picker, CheckBox } from "native-base";



import HomeHeader from '../../../common/HomeHeader'
import i18n from '../../../locale/i18n'
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../../consts/Colors';
import { InputIcon } from '../../../common/InputText';
import { width, height } from '../../../consts/HeightWidth';
import BTN from '../../../common/BTN';
import Card from '../../../common/Card';

function Menue({ navigation }) {

    const [isSelected, setSelection] = useState();
    const [isSelected2, setSelection2] = useState();
    const [modalVisible, setModalVisible] = useState(false);




    const [selected, setSelected] = useState("key0")
    const [selected1, setSelected1] = useState("key0")


    const onValueChange1 = (value) => {
        setSelected1(value)
    }

    const onValueChange = (value) => {
        setSelected(value)
    }





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
            <ScrollView style={{ flex: 1 }}>

                <InputIcon
                    placeholder={i18n.t('search1')}
                    image={require('../../../assets/Images/search.png')}
                    styleCont={{ marginTop: 0, height: width * .18, }}
                    inputStyle={{ backgroundColor: '#DBDBDB' }}
                />

                <Card />

                <View style={{ backgroundColor: '#DBDBDB', flex: 1, width: '90%', margin: 20, height: 80, flexDirection: 'row', alignItems: 'center', zIndex: 100, }}>
                    <CheckBox checked={isSelected} color={isSelected ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: isSelected ? Colors.sky : Colors.bg, width: width * .05, height: height * .03, }} onPress={() => setSelection(!isSelected)} />
                    <Text style={{ marginStart: 12, fontFamily: 'flatMedium', fontSize: width * .025, }}>{i18n.t('Select')}</Text>


                    <View style={{ width: width * .26, backgroundColor: Colors.bg, margin: 20, marginHorizontal: 2, overflow: 'hidden', height: 60 }}>
                        <Picker
                            mode="dropdown"
                            selectedValue={selected1}
                            onValueChange={onValueChange1}
                            style={{ marginStart: -15, marginEnd: 0, height: 20 }}

                        >
                            <Picker.Item label="حذف" value="key0" />
                            <Picker.Item label="تعديل" value="key1" />

                        </Picker>
                    </View>



                    <Text style={{ fontFamily: 'flatMedium', fontSize: width * .025, }}>{i18n.t('filter')}</Text>
                    <View style={{ margin: 30, backgroundColor: Colors.bg, marginHorizontal: 2, width: width * .27, overflow: 'hidden' }}>
                        <Picker
                            mode="dropdown"
                            selectedValue={selected}
                            onValueChange={onValueChange}
                            style={{ marginStart: -15, height: 40, }}

                        >
                            <Picker.Item label="جديد" value="key0" />
                            <Picker.Item label="الاقدام" value="key1" />
                            <Picker.Item label="الجديد" value="key2" />
                            <Picker.Item label="القديم" value="key3" />
                        </Picker>
                    </View>


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
        height: width * .32,
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
        marginVertical: 15,
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
