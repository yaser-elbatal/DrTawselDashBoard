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
import { MenueInfo, AddMenue, DeleteMenue, UpdateMenue } from '../../../store/action/MenueAction';
import { Toaster } from '../../..//common/Toaster';
import { validateUserName } from '../../../common/Validation';

function Menue({ navigation }) {



    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const Menue = useSelector(state => state.menue.menue);

    const [nameAR, setNameAr] = useState('');
    const [nameEN, setNameEN] = useState('')
    const [MenueData, setMenueData] = useState()
    const [spinner, setSpinner] = useState(false);

    const [nameAREdit, setNameArEdit] = useState();
    const [nameENEdit, setNameENEdit] = useState();
    const [nameARStatusEdit, setnameARStatusEdit] = useState(0);
    const [nameENStatusEdit, setNameENStatusEdit] = useState(0)

    const [isSelected2, setSelection2] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [EditMaodVisible, setEditMaodVisible] = useState(false);
    const [nameARStatus, setnameARStatus] = useState(0);
    const [nameENStatus, setNameENStatus] = useState(0)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(false)
        });
        setSpinner(false)
        return unsubscribe;
    }, [navigation, spinner]);

    function activeInput(type) {

        if (type === 'nameAR' || nameAR !== '') setnameARStatus(1);
        if (type === 'nameEN' || nameEN !== '') setNameENStatus(1);
        if (type === 'nameAREdit' || nameAREdit !== '') setnameARStatusEdit(1);
        if (type === 'nameENEdit' || nameENEdit !== '') setNameENStatusEdit(1);

    }
    function unActiveInput(type) {

        if (type === 'nameAR' && nameAR == '') setnameARStatus(0);
        if (type === 'nameEN' && nameEN == '') setNameENStatus(0);
        if (type === 'nameAREdit' && nameAREdit == '') setnameARStatusEdit(0);
        if (type === 'nameENEdit' && nameENEdit == '') setNameENStatusEdit(0);

    }




    const data = [{
        value: i18n.t('delete'),
    }, {
        value: i18n.t('edit'),
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

    const dispatch = useDispatch();

    const Add_menue = async () => {
        let val = _validate()
        if (!val) {
            setSpinner(true)
            await dispatch(AddMenue(token, lang, nameAR, nameEN))
            dispatch(MenueInfo(lang, token))
            setTimeout(() => dispatch(MenueInfo(lang, token)), 1000)
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

        console.log('M' + MenueData);
    }

    const DeleteMeueIteM = async (id) => {
        setSpinner(true);
        await dispatch(DeleteMenue(token, id))
        setTimeout(() => dispatch(MenueInfo(lang, token)), 1000)

    }

    const EditMEnue = () => {
        setSpinner(true);

        dispatch(UpdateMenue(token, lang, nameAREdit, nameENEdit, MenueData))
        dispatch(MenueInfo(lang, token))
        setTimeout(() => dispatch(MenueInfo(lang, token)), 1000)

        setEditMaodVisible(false)
    }



    useEffect(() => {
        setSpinner(true);
        dispatch(MenueInfo(lang, token))
        Menue.data
        setSpinner(true);

    }, [dispatch]);


    function renderLoader() {
        if (spinner) {
            return (
                <View style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 99999,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                }}>
                    <ActivityIndicator size="large" color={Colors.sky} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    return (
        <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
            {renderLoader()}
            <HomeHeader navigation={navigation} label={i18n.t('menue')} onPress={() => navigation.navigate('MyProfile')} />

            <InputIcon
                placeholder={i18n.t('search1')}
                image={require('../../../assets/Images/search.png')}
                styleCont={{ marginTop: 0, height: width * .18, }}
                inputStyle={{ backgroundColor: '#DBDBDB' }}
            />

            <Card />

            <View style={{ height: 60, width: '90%', margin: 20, flexDirection: 'row', alignItems: 'center', zIndex: 10, backgroundColor: Colors.InputColor, }}>
                <CheckBox checked={isSelected2} color={isSelected2 ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: isSelected2 ? Colors.sky : Colors.bg, width: width * .05, height: height * .03, }} onPress={() => setSelection2(!isSelected2)} />
                <Text style={{ marginStart: 12, fontFamily: 'flatMedium', fontSize: width * .025, paddingHorizontal: 2 }}>{i18n.t('Select')}</Text>
                <View style={{ borderWidth: .4, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center', height: width * .09, borderColor: Colors.InputColor, marginHorizontal: 5 }}>
                    <Dropdown
                        placeholder={i18n.t('select')}
                        data={data}
                        fontSize={12}
                        itemTextStyle={{ fontFamily: 'flatMedium' }}
                        lineWidth={0}
                        containerStyle={{ width: width * .22, paddingHorizontal: 5, bottom: 10 }}
                        animationDuration={0}
                    />
                </View>



                <Text style={{ fontFamily: 'flatMedium', fontSize: width * .025, paddingHorizontal: 2 }}>{i18n.t('filter')}</Text>
                <View style={{ borderWidth: .4, alignItems: 'center', justifyContent: 'center', height: width * .09, backgroundColor: Colors.bg, borderColor: Colors.InputColor, marginHorizontal: 5 }}>
                    <Dropdown
                        placeholder={i18n.t('select')}
                        data={data2}
                        fontSize={12}
                        itemTextStyle={{ fontFamily: 'flatMedium' }}
                        lineWidth={0}
                        containerStyle={{ width: width * .22, paddingHorizontal: 5, bottom: 10 }}
                    />
                </View>

            </View>


            <BTN title={i18n.t('AddMenue')} ContainerStyle={[styles.LoginBtn, { marginHorizontal: 18, marginVertical: 10 }]} onPress={() => setModalVisible(true)} />


            <View style={styles.centeredView}>
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

                                    label={nameARStatus === 1 ? i18n.t('menueAr') : null}
                                    placeholder={nameARStatus === 1 ? null : i18n.t('menueAr')}
                                    onBlur={() => unActiveInput('nameAR')}
                                    onFocus={() => activeInput('nameAR')}
                                    inputStyle={{ borderColor: nameARStatus === 1 ? Colors.sky : Colors.InputColor, textAlign: 'center', }}
                                    onChangeText={(e) => setNameAr(e)}
                                    value={nameAR}
                                    LabelStyle={{ paddingHorizontal: nameARStatus === 1 ? 10 : 0, color: nameARStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                                />

                                <InputIcon
                                    label={nameENStatus === 1 ? i18n.t('menueEn') : null}
                                    placeholder={nameENStatus === 1 ? null : i18n.t('menueEn')}
                                    onBlur={() => unActiveInput('nameEN')}
                                    onFocus={() => activeInput('nameEN')}
                                    inputStyle={{ borderColor: nameENStatus === 1 ? Colors.sky : Colors.InputColor, textAlign: 'center', }}
                                    onChangeText={(e) => setNameEN(e)}
                                    value={nameEN}
                                    styleCont={{ marginTop: -5 }}
                                    LabelStyle={{ paddingHorizontal: nameENStatus === 1 ? 10 : 0, color: nameENStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                                />

                                <BTN title={i18n.t('AddMenue')} ContainerStyle={styles.LoginBtn} onPress={Add_menue} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>



            <FlatList
                pagingEnabled={true}
                showsVerticalScrollIndicator={false}
                data={Menue.data}
                extraData={dispatch}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) =>


                    (
                        <View style={styles.Card}>
                            <View style={styles.FWrab}>
                                <CheckBox checked={isSelected2} color={isSelected2 ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: isSelected2 ? Colors.sky : Colors.bg, width: 20, height: 20, }} onPress={() => setSelection2(!isSelected2)} />
                                <Text style={styles.nText}>{i18n.t('num')} # {index + 1}</Text>
                                <View style={{ flexDirection: 'row', marginStart: 5, alignItems: 'center' }}>
                                    <Text style={styles.nMenu}>{i18n.t('name')} :   </Text>
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
            <View style={styles.centeredView}>
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

                                    label={nameARStatusEdit === 1 ? i18n.t('menueAr') : null}
                                    placeholder={nameARStatusEdit === 1 ? null : i18n.t('menueAr')}
                                    onBlur={() => unActiveInput('nameAREdit')}
                                    onFocus={() => activeInput('nameAREdit')}
                                    inputStyle={{ borderColor: nameARStatusEdit === 1 ? Colors.sky : Colors.InputColor, textAlign: 'center', }}
                                    onChangeText={(e) => setNameArEdit(e)}
                                    value={nameAREdit}
                                    LabelStyle={{ paddingHorizontal: nameARStatusEdit === 1 ? 10 : 0, color: nameARStatusEdit === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                                />

                                <InputIcon
                                    label={nameENStatusEdit === 1 ? i18n.t('menueEn') : null}
                                    placeholder={nameENStatusEdit === 1 ? null : i18n.t('menueEn')}
                                    onBlur={() => unActiveInput('nameENEdit')}
                                    onFocus={() => activeInput('nameENEdit')}
                                    inputStyle={{ borderColor: nameENStatusEdit === 1 ? Colors.sky : Colors.InputColor, textAlign: 'center', }}
                                    onChangeText={(e) => setNameENEdit(e)}
                                    value={nameENEdit}
                                    styleCont={{ marginTop: -5 }}
                                    LabelStyle={{ paddingHorizontal: nameENStatusEdit === 1 ? 10 : 0, color: nameENStatusEdit === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                                />

                                <BTN title={i18n.t('edit')} ContainerStyle={styles.LoginBtn} onPress={EditMEnue} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>

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
