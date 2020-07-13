import React, { useState } from 'react'
import { View, ScrollView, Text, FlatList, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { Picker } from 'native-base';


import i18n from '../../../locale/i18n'
import { InputIcon } from '../../../common/InputText'
import Colors from '../../../consts/Colors'
import BTN from '../../../common/BTN';
import { SText } from '../../../common/SText';
import Header from '../../../common/Header';


const { width } = Dimensions.get('window')
function AddProduct({ navigation }) {

    const [selectedRadion, setSelectedRadio] = useState(0)
    const [isSelected, setSelection] = useState();

    const [nameAR, setNameAr] = useState('');
    const [nameEN, setNameEN] = useState('')
    const [data, setData] = useState([
        { id: 1, title: `${i18n.t('big')}`, },
        { id: 2, title: `${i18n.t('meduim')}`, },
        { id: 3, title: `${i18n.t('small')}` },
    ])

    const onValueChange = (value) => {
        setSelection(value)
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bg }}>
            <Header navigation={navigation} label={i18n.t('AddPro')} />

            <ScrollView style={{ flex: 1 }}>
                <InputIcon
                    label={i18n.t('prodnameAr')}
                    placeholder={i18n.t('prodnameAr')}
                    inputStyle={{ borderColor: Colors.sky }}
                    onChangeText={(e) => setNameAr(e)}
                    value={nameAR}
                    LabelStyle={{ paddingHorizontal: 10, color: Colors.sky, fontSize: 14 }}

                />
                <InputIcon
                    placeholder={i18n.t('prodnameEn')}
                    onChangeText={(e) => setNameEN(e)}
                    value={nameEN}

                    styleCont={{ marginTop: 0 }}
                />

                <Text style={{ marginStart: 10, fontFamily: 'flatMedium', fontSize: 16, }}>{i18n.t('addSize')}</Text>
                <View style={{ alignItems: 'center', marginTop: 10, borderWidth: 1, height: 50, marginHorizontal: "5%", borderColor: '#E0E0E0', borderRadius: 5 }}>

                    <FlatList data={data}
                        horizontal
                        keyExtractor={(item) => (item.id).toString()}
                        renderItem={({ item, index }) => {
                            return (

                                <View style={{
                                    alignItems: 'center', justifyContent: 'center', marginHorizontal: 30,

                                }}>
                                    <TouchableOpacity onPress={() => setSelectedRadio(index)} style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                                        <View style={{
                                            height: 15,
                                            width: 15,
                                            borderRadius: 12,
                                            borderWidth: 2,
                                            borderColor: selectedRadion === index ? Colors.sky : Colors.fontNormal,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            alignSelf: 'center',

                                        }}>
                                            {
                                                selectedRadion === index ?
                                                    <View style={{
                                                        height: 6,
                                                        width: 6,
                                                        borderRadius: 6,
                                                        backgroundColor: Colors.sky,
                                                    }} />
                                                    : null
                                            }
                                        </View>
                                        <Text style={[styles.sText, { color: selectedRadion === index ? Colors.sky : Colors.fontNormal, left: 6, bottom: 1 }]}>{item.title}</Text>

                                    </TouchableOpacity>

                                </View>
                            )
                        }} />
                </View>

                <InputIcon
                    placeholder={i18n.t('Onesizeprice')}
                    styleCont={{ marginTop: 10 }}
                />
                <InputIcon
                    placeholder={i18n.t('discount')}
                    styleCont={{ marginTop: -5 }}
                />
                <InputIcon
                    placeholder={i18n.t('Availablekilos')}
                    styleCont={{ marginTop: -5 }}
                />
                <InputIcon
                    placeholder={i18n.t('ProdPice')}
                    styleCont={{ marginTop: -5 }}
                    image={require('../../../assets/Images/camera_gray.png')}
                    imgStyle={{ width: width * .055 }}
                />
                <View style={styles.DrbContain}>
                    <Picker
                        mode="dropdown"
                        style={{ color: Colors.fontNormal, marginHorizontal: 5 }}
                        placeholder={i18n.t('menueChoice')}
                        placeholderStyle={{ color: Colors.IconBlack }}
                        placeholderIconColor={Colors.IconBlack}
                        selectedValue={isSelected}
                        onValueChange={onValueChange}
                    >
                        <Picker.Item label='menue' value="key" />
                        <Picker.Item label="tanta" value="key1" />
                        <Picker.Item label="mansoura" value="key2" />
                        <Picker.Item label="mahalla" value="key3" />
                        <Picker.Item label="Dmam" value="key4" />
                    </Picker>
                </View>
                <InputIcon
                    placeholder={i18n.t('prodDetAr')}
                    inputStyle={{ borderColor: '#eaeaea', textAlignVertical: 'top', paddingTop: 10, borderRadius: 5 }}
                    styleCont={{ height: width * .35, marginHorizontal: '5%', marginTop: 10 }}
                    LabelStyle={{ bottom: width * .42, backgroundColor: 0, left: 10, color: Colors.IconBlack }}
                />

                <InputIcon
                    placeholder={i18n.t('prodDetEn')}
                    inputStyle={{ borderColor: '#eaeaea', textAlignVertical: 'top', paddingTop: 10, borderRadius: 5 }}
                    styleCont={{ height: width * .35, marginHorizontal: '5%', marginTop: 0 }}
                    LabelStyle={{ bottom: width * .42, backgroundColor: 0, left: 10, color: Colors.IconBlack }}
                />
                <SText title={`+ ${i18n.t('AddPro')}`} onPress={() => navigation.navigate('AddOnotherProduct')} style={{ color: Colors.sky, fontSize: 15, marginVertical: 20, marginTop: 0, textAlign: 'left', marginHorizontal: '5%' }} />

                <BTN title={`+ ${i18n.t('Add')}`} ContainerStyle={styles.LoginBtn} onPress={() => navigation.navigate('SuccessAddition')} />

            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
    sText: {
        fontFamily: 'flatMedium',
        color: Colors.fontBold,
        fontSize: width * .036,
        left: 20
    },
    Text: {
        fontFamily: 'flatMedium',
        color: Colors.IconBlack,
        fontSize: width * .04,
    },
    DrbContain: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: "5%"
    },
    LoginBtn: {
        borderRadius: 5,
        marginTop: 0,
        marginHorizontal: '5%',
        width: '90%',
        marginVertical: 5

    },
})
export default AddProduct
