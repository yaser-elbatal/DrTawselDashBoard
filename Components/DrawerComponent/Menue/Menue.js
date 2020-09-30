import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Text, FlatList, ScrollView, TouchableOpacity, Modal, Platform, ActivityIndicator } from 'react-native';
import { CheckBox } from "native-base";
import { Dropdown } from 'react-native-material-dropdown';



import HomeHeader from '../../../common/HomeHeader'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors';
import { InputIcon } from '../../../common/InputText';
import { width, height } from '../../../consts/HeightWidth';
import BTN from '../../../common/BTN';
import Card from '../../../common/Card';
import { useDispatch, useSelector } from 'react-redux';
import { MenueInfo, AddMenue, DeleteMenue, UpdateMenue, SearchMenue } from '../../../store/action/MenueAction';
import { Toaster } from '../../..//common/Toaster';
import { validateUserName } from '../../../common/Validation';
import Container from '../../../common/Container';

function Menue({ navigation }) {


    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const Menue = useSelector(state => state.menue.menue.data);
    const [nameAR, setNameAr] = useState('');
    const [nameEN, setNameEN] = useState('');
    const [DeleteArr, setDeleteArr] = useState([]);
    const [MenueData, setMenueData] = useState()
    const [spinner, setSpinner] = useState(true);
    const [Search, setSearch] = useState('');
    const [nameAREdit, setNameArEdit] = useState();
    const [nameENEdit, setNameENEdit] = useState();

    const [isSelected2, setSelection2] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [EditMaodVisible, setEditMaodVisible] = useState(false);

    const data = [{
        value: i18n.t('delete'),
    },];



    const data2 = [{
        value: i18n.t('latest'),
    }, {
        value: i18n.t('oldest'),
    },];
    const _validate = () => {


        let nameErr = validateUserName(nameAR)
        let nameEnErr = validateUserName(nameEN)
        return nameErr || nameEnErr
    }

    console.log(token);
    const dispatch = useDispatch();

    const Add_menue = async () => {
        let val = _validate()
        if (!val) {
            setSpinner(true)
            dispatch(AddMenue(token, lang, nameAR, nameEN))
            dispatch(MenueInfo(lang, token)).then(() => setSpinner(false))

            setModalVisible(false)
            setNameAr('');
            setNameEN('')
        }
        else {
            Toaster(_validate());

        }
    }

    const edit = (item) => {

        setEditMaodVisible(true)
        setNameArEdit(item.name);
        setNameENEdit(item.name);
        setMenueData(item.id);

    }

    const DeleteMeueIteM = (id) => {
        setSpinner(true)
        dispatch(DeleteMenue(token, id))
        dispatch(MenueInfo(lang, token)).then(() => setSpinner(false))

    }

    const EditMEnue = () => {
        setSpinner(true);
        dispatch(UpdateMenue(token, lang, nameAREdit, nameENEdit, MenueData))
        dispatch(MenueInfo(lang, token)).then(() => setSpinner(false))
        setEditMaodVisible(false)
    }


    const isChecked = (itemId) => {
        const isThere = DeleteArr.includes(itemId);
        return isThere;
    };

    const toggleChecked = (itemId) => {

        if (isChecked(itemId)) {

            let Deleted = DeleteArr.filter((id) => id !== itemId);
            setDeleteArr(Deleted)

        } else {
            setDeleteArr(DeleteArr.concat([itemId]))
        }
    };

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(true)
            dispatch(MenueInfo(lang, token)).then(() => setSpinner(false))
        });

        return unsubscribe;
    }, [navigation]);

    const handleChange = (e) => {
        setSearch(e);
        setTimeout(() => dispatch(SearchMenue(token, Search, lang)), 1000)
    }


    const DeleteMenueMultiIteM = () => {
        setSpinner(true)
        dispatch(DeleteMenue(token, DeleteArr))
        dispatch(MenueInfo(lang, token)).then(() => setSpinner(false))
    }


    const handleChandDrpDown = (val) => {
        setSpinner(true)
        Menue.reverse();
        setSpinner(false)


    }

    const SelectAllChecked = () => {
        if (isSelected2) {
            setSelection2(false);
            setDeleteArr([])
        }

        else {
            setSelection2(true);
            let MnueID = Menue ? Menue.map(menu => menu.id) : []
            setDeleteArr(MnueID)
        }
    }

    return (
        <Container loading={spinner}>

            <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }} showsVerticalScrollIndicator={false}>
                <HomeHeader navigation={navigation} label={i18n.t('menue')} onPress={() => navigation.navigate('MyProfile')} />

                <InputIcon
                    placeholder={i18n.t('search1')}
                    label={i18n.t('search1')}
                    value={Search}
                    onChangeText={(e) => handleChange(e)}
                    image={require('../../../assets/Images/search.png')}
                    styleCont={{ marginTop: 0, }}
                    inputStyle={{ borderRadius: 10 }}
                />

                <Card />

                <View style={{ height: 50, width: '90%', margin: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', zIndex: 10, backgroundColor: '#F6F6F6', }}>
                    <CheckBox checked={isSelected2} color={isSelected2 ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: isSelected2 ? Colors.sky : Colors.bg, marginStart: -5 }} onPress={SelectAllChecked} />
                    <Text style={{ fontFamily: 'flatMedium', fontSize: width * .03, paddingHorizontal: 15, color: Colors.inputTextMainColor }}>{i18n.t('Select')}</Text>
                    <TouchableOpacity onPress={DeleteMenueMultiIteM} style={{ borderWidth: .4, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center', borderColor: Colors.InputColor, marginHorizontal: 5 }}>
                        <Text style={{ fontFamily: 'flatMedium', paddingVertical: 8, paddingHorizontal: 15, color: Colors.inputTextMainColor }}> {i18n.t('delete')}</Text>
                    </TouchableOpacity>



                    <Text style={{ fontFamily: 'flatMedium', fontSize: width * .03, paddingHorizontal: 2, color: Colors.inputTextMainColor }}>{i18n.t('filter')}</Text>
                    <View style={{ borderWidth: .4, alignItems: 'center', justifyContent: 'center', height: width * .09, backgroundColor: Colors.bg, borderColor: Colors.InputColor, marginHorizontal: 5 }}>
                        <Dropdown
                            placeholder={i18n.t('select')}
                            data={data2}
                            animationDuration={0}
                            onChangeText={(val) => handleChandDrpDown(val)}
                            fontSize={12}

                            itemTextStyle={{ fontFamily: 'flatMedium' }}
                            lineWidth={0}
                            containerStyle={{ width: width * .22, paddingHorizontal: 8, bottom: 10 }}
                        />
                    </View>

                </View>


                <BTN title={i18n.t('AddMenue')} ContainerStyle={[styles.LoginBtn, { marginHorizontal: 18, marginVertical: 15 }]} onPress={() => setModalVisible(!modalVisible)} />





                {
                    !Menue ?
                        <Image source={require('../../../assets/Images/empty.png')} style={{ height: 150, width: 150, alignSelf: 'center' }} />
                        :
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={Menue}
                            extraData={spinner}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) =>


                                (

                                    <View style={styles.Card} key={index}>
                                        <View style={styles.FWrab}>
                                            <CheckBox checked={isChecked(item.id)} color={isChecked(item.id) ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: isChecked(item.id) ? Colors.sky : Colors.bg, }} onPress={() => toggleChecked(item.id)} />
                                            <Text style={styles.nText}>{i18n.t('num')} # {item.id}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={[styles.name, { color: Colors.IconBlack }]}>{i18n.t('name')} :   </Text>
                                                <Text style={styles.name}>{item.name}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.SWarb}>
                                            <TouchableOpacity style={styles.Edit} onPress={() => edit(item)}>
                                                <Image source={require('../../../assets/Images/Icon_edit.png')} style={styles.Img} resizeMode='contain' />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.Delete} onPress={() => DeleteMeueIteM(item.id)}>
                                                <Image source={require('../../../assets/Images/trash_white.png')} style={styles.Img} resizeMode='contain' />
                                            </TouchableOpacity>

                                        </View>

                                    </View>
                                )
                            } />
                }

                <TouchableOpacity style={styles.centeredView} onPress={() => setEditMaodVisible(false)}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        style={{ backgroundColor: Colors.bg, }}
                        visible={EditMaodVisible} >

                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={{ margin: 20, backgroundColor: Colors.bg }}>
                                    <Text style={{ fontFamily: 'flatMedium', fontSize: 14, }}>{i18n.t('edit')} </Text>

                                    <InputIcon

                                        label={i18n.t('menueAr')}
                                        placeholder={i18n.t('menueAr')}
                                        onChangeText={(e) => setNameArEdit(e)}
                                        value={nameAREdit}
                                    />

                                    <InputIcon
                                        label={i18n.t('menueEn')}
                                        placeholder={i18n.t('menueEn')}
                                        onChangeText={(e) => setNameENEdit(e)}
                                        value={nameENEdit}
                                        styleCont={{ marginTop: -5 }}
                                    />

                                    <BTN title={i18n.t('edit')} ContainerStyle={styles.LoginBtn} onPress={EditMEnue} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </TouchableOpacity>
                <TouchableOpacity style={styles.centeredView} onPress={() => setModalVisible(false)}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        style={{ backgroundColor: Colors.bg, }}
                        visible={modalVisible} >

                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={{ margin: 20, backgroundColor: Colors.bg }}>
                                    <Text style={{ fontFamily: 'flatMedium', fontSize: 14, }}>{i18n.t('AddMenue')} </Text>

                                    <InputIcon
                                        label={i18n.t('menueAr')}
                                        placeholder={i18n.t('menueAr')}
                                        onChangeText={(e) => setNameAr(e)}
                                        value={nameAR}
                                    />

                                    <InputIcon
                                        label={i18n.t('menueEn')}
                                        placeholder={i18n.t('menueEn')}
                                        onChangeText={(e) => setNameEN(e)}
                                        value={nameEN}
                                        styleCont={{ marginTop: -5 }}
                                    />

                                    <BTN title={i18n.t('AddMenue')} ContainerStyle={styles.LoginBtn} onPress={Add_menue} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </TouchableOpacity>
            </ScrollView>
        </Container>
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
        shadowColor: Colors.inputTextMainColor,
        marginTop: 0,
        backgroundColor: Colors.bg,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        shadowColor: Colors.bg,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,
    },
    FWrab: {
        flexDirection: 'column',
        margin: 5,
        flex: .75,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    nText: {
        color: Colors.sky,
        paddingVertical: 10,
        fontFamily: 'flatMedium',
    },
    nMenue: {
        fontFamily: 'flatMedium',
        fontSize: 12,
    },
    name: {
        fontFamily: 'flatMedium',
        fontSize: 14,
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
        opacity: Platform.OS = 'ios' ? .98 : .9,

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
