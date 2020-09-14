import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Modal, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


import i18n from '../../../locale/i18n'
import { InputIcon } from '../../../common/InputText'
import Colors from '../../../consts/Colors'
import BTN from '../../../common/BTN';
import { SText } from '../../../common/SText';
import Header from '../../../common/Header';
import { GetSizes } from '../../../store/action/SizesAction';
import { useSelector, useDispatch } from 'react-redux';
import { Add_Products, GetProducts } from '../../../store/action/ProductAction';
import { MenueInfo } from '../../../store/action/MenueAction';
import { width, height } from '../../../consts/HeightWidth';
import { GetExtraProduct, add_extra_ProductsService, edit_extra_ProductsService, delete_extra_ProductsService } from '../../../store/action/ExtraProductAction';


function AddProduct({ navigation }) {

    // const Sizes = useSelector(state => state.size.size.data);
    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const Menue = useSelector(state => state.menue.menue.data);
    const ExtraProduct = useSelector(state => state.ExtraProduct.ExtraProduct);



    const [nameAR, setNameAr] = useState('');
    const [nameEN, setNameEN] = useState('')
    const [Sizes, setSizes] = useState([
        { id: 1, name: `${i18n.t('large')}` },
        { id: 2, name: `${i18n.t('mid')}` },
        { id: 3, name: `${i18n.t('small')}` }
    ])
    const [ProductnameExtraAR, setProductnameExtraAR] = useState('');
    const [ProductnameExtraEn, setProductnameExtraEn] = useState('')
    const [priceProductExtra, setPricePrdouctExtra] = useState('');
    const [ExProdId, setExProdId] = useState(0);


    const [price, setPrice] = useState('');
    const [small_price, setsmall_price] = useState('');
    const [mid_price, setmid_price] = useState('');
    const [large_price, setlarge_price] = useState('');
    const [selectedRadion, setSelectedRadio] = useState(0)
    const [spinner, setSpinner] = useState(false);




    const [SizePriceId, SetSizePriceId] = useState([{
        size_id: 1,
        price: small_price,
    },
    {
        size_id: 2,
        price: mid_price,
    },
    {
        size_id: 3,
        price: large_price,
    }
    ]);




    const [availableKilos, setavailableKilos] = useState('');
    const [Discount, setDiscount] = useState('');
    const [quantity, setQuantity] = useState('')
    const [detailesAr, setDetailesAr] = useState('')
    const [detailesEn, setDetailesEn] = useState('')
    const [MenueId, setMenue] = useState('')
    const [available, setavailable] = useState(0);

    const [base64, setBase64] = useState();
    const [userImage, setUserImage] = useState(null);
    const [EditMaodVisible, setEditMaodVisible] = useState(false);

    const [nameArStatues, setnameArStatues] = useState(0)
    const [nameENStatus, setNameENStatus] = useState(0)
    const [priceStatues, setepriceStatues] = useState(0)
    const [availableKilosStatus, setavailableKilosStatues] = useState(0);
    const [discountStatues, setDiscountStatues] = useState(0);
    const [quantityStatues, setquantityStatues] = useState(0);
    const [detailesArStatues, setdetailesArStatues] = useState(0);
    const [detailesEnStatues, setdetailesEnStatues] = useState(0);


    const [SmallSizeStatues, setSmallSizeStatues] = useState(0);
    const [MiddleStatues, setMiddleStatues] = useState(0);
    const [BigStatues, setBigStatues] = useState(0);
    const [ProductNameArStatues, setProductNameArStatues] = useState(0);
    const [ProductNameEnStatues, setProductNameEnStatues] = useState(0);
    const [ProductExtraPriceStatues, setProductExtraPrieceStatues] = useState(0);


    let MenueData = Menue.length ? Menue.map(menue => ({ label: menue.name, value: menue.id })) : null
    let MenueName = Menue.map(menue => ({ label: menue.name, }));

    const [data, setData] = useState([

        { id: 0, title: `${i18n.t("no")}` },
        { id: 1, title: `${i18n.t("yes")}` },

    ])



    function activeInput(type) {
        if (type === 'nameAr' || nameAR !== '') setnameArStatues(1);
        if (type === 'nameEN' || nameEN !== '') setNameENStatus(1);
        if (type === 'price' || price !== '') setepriceStatues(1);
        if (type === 'availableKilos' || availableKilos !== '') setavailableKilosStatues(1);
        if (type === 'Discount' || Discount !== '') setDiscountStatues(1);
        if (type === 'quantity' || quantity !== '') setquantityStatues(1);
        if (type === 'detailesAr' || detailesAr !== '') setdetailesArStatues(1);
        if (type === 'detailesEn' || detailesEn !== '') setdetailesEnStatues(1);
        if (type === 'detailesEn' || detailesEn !== '') setdetailesEnStatues(1);

        if (type === 'small_price' || small_price !== '') setSmallSizeStatues(1);
        if (type === 'mid_price' || mid_price !== '') setMiddleStatues(1);
        if (type === 'large_price' || large_price !== '') setBigStatues(1);

        if (type === 'ProductnameExtraAR' || ProductnameExtraAR !== '') setProductNameArStatues(1);
        if (type === 'ProductnameExtraEn' || ProductnameExtraEn !== '') setProductNameEnStatues(1);
        if (type === 'priceProductExtra' || priceProductExtra !== '') setProductExtraPrieceStatues(1);
    }


    function unActiveInput(type) {
        if (type === 'nameAr' && nameAR == '') setnameArStatues(0);
        if (type === 'nameEN' && nameEN == '') setNameENStatus(0);
        if (type === 'price' && price == '') setepriceStatues(0);
        if (type === 'availableKilos' && availableKilos == '') setavailableKilosStatues(0);
        if (type === 'Discount' && Discount == '') setDiscountStatues(0);
        if (type === 'quantity' && quantity == '') setquantityStatues(0);
        if (type === 'detailesAr' && detailesAr == '') setdetailesArStatues(0);
        if (type === 'detailesEn' && detailesEn == '') setdetailesEnStatues(0);

        if (type === 'small_price' && small_price == '') setSmallSizeStatues(0);
        if (type === 'mid_price' && mid_price == '') setMiddleStatues(0);
        if (type === 'large_price' && large_price == '') setBigStatues(0);

        if (type === 'ProductnameExtraAR' && ProductnameExtraAR == '') setProductNameArStatues(0);
        if (type === 'ProductnameExtraEn' && ProductnameExtraEn == '') setProductNameEnStatues(0);
        if (type === 'priceProductExtra' && priceProductExtra == '') setProductExtraPrieceStatues(0);

    }



    const dispatch = useDispatch();




    const Add_Product = async () => {
        await dispatch(Add_Products(token, lang, nameAR, nameEN, price, detailesAr, detailesEn, available, availableKilos, Discount, quantity, small_price, mid_price, large_price, MenueId, base64, navigation, ExtraProduct))
        setTimeout(() => dispatch(GetProducts(token, lang)), 1000)
        await dispatch(GetProducts(token, lang))
        setSpinner(true)
        setNameAr('');
        setNameEN('');
        setsmall_price('');
        setmid_price('');
        setlarge_price('');
        setDiscount('');
        setPrice('');
        setavailableKilos('');
        setQuantity('');
        setDetailesAr('');
        setDetailesEn('');



    }

    const FetchData = async () => {
        setSpinner(true)
        await dispatch(MenueInfo(lang, token))
        await Menue
        await MenueData
    }
    // setTimeout(() => {
    //     dispatch(MenueInfo(lang, token));
    //     dispatch(GetSizes(token, lang))
    //     Menue
    //     Sizes
    // }, 1000)


    useEffect(() => {
        FetchData()

        GetExtraProduct()
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(false)
        });
        setSpinner(false)
        return unsubscribe;
    }, [navigation, spinner]);



    const askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    const _pickImage = async () => {

        askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true
        });

        if (!result.cancelled) {
            setUserImage(result.uri);
            setBase64(result.base64);
        }
    };


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



    const handaleChange = (e, IdSelect) => {
        let array = SizePriceId;
        let ID = array.findIndex(id => id.size_id === IdSelect);
        array[ID].price = e
        console.log(array);

        SetSizePriceId(array)

    }



    const submitData = () => {
        if (ProductnameExtraAR && ProductnameExtraEn && !ExProdId) {
            const newEmployee = {
                id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
                name_ar: ProductnameExtraAR,
                name_en: ProductnameExtraEn,
                price: priceProductExtra
            };

            dispatch(add_extra_ProductsService(newEmployee));
        } else if (ProductnameExtraAR && ProductnameExtraEn && ExProdId) {
            const updatedDetails = {
                id: ExProdId,
                name_ar: ProductnameExtraAR,
                name_en: ProductnameExtraEn,
                price: priceProductExtra
            };
            dispatch(add_extra_ProductsService(updatedDetails));
        } else {
            alert('Enter Extra Data.');
        }
        setEditMaodVisible(false)
        setPricePrdouctExtra('');
        setProductnameExtraAR('');
        setProductnameExtraEn('');

        clearData();
    }



    const deleteExtraProduct = (id) => {
        clearData();
        dispatch(delete_extra_ProductsService(id));

    }



    const clearData = () => {
        setExProdId('');
        setPricePrdouctExtra('')
        setProductnameExtraAR('')
        setProductnameExtraEn('')
    }



    return (
        <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }}>
            {renderLoader()}
            <Header navigation={navigation} label={i18n.t('AddPro')} />

            <InputIcon

                label={nameArStatues === 1 ? i18n.t('prodnameAr') : null}
                placeholder={nameArStatues === 1 ? null : i18n.t('prodnameAr')}
                onBlur={() => unActiveInput('nameAr')}
                onFocus={() => activeInput('nameAr')}
                inputStyle={{ borderColor: nameArStatues === 1 ? Colors.sky : Colors.InputColor }}
                onChangeText={(e) => setNameAr(e)}
                value={nameAR}
                LabelStyle={{ paddingHorizontal: nameArStatues === 1 ? 10 : 0, color: nameArStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}

            />
            <InputIcon

                label={nameENStatus === 1 ? i18n.t('prodnameEn') : null}
                placeholder={nameENStatus === 1 ? null : i18n.t('prodnameEn')}
                onBlur={() => unActiveInput('nameEN')}
                onFocus={() => activeInput('nameEN')}
                inputStyle={{ borderColor: nameENStatus === 1 ? Colors.sky : Colors.InputColor }}
                onChangeText={(e) => setNameEN(e)}
                value={nameEN}
                styleCont={{ marginTop: 0 }}

                LabelStyle={{ paddingHorizontal: nameENStatus === 1 ? 10 : 0, color: nameENStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
            />

            <Text style={{ marginStart: 10, fontFamily: 'flatMedium', fontSize: 16, }}>{i18n.t('addSize')}</Text>
            <View style={{ alignItems: 'center', marginTop: 10, borderWidth: 1, height: 50, marginHorizontal: "5%", borderColor: '#E0E0E0', borderRadius: 5, flexDirection: 'row' }}>

                {
                    Sizes.map((size, index) => {
                        return (

                            <View key={index + 1} style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 30, flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => { setSelectedRadio(size.id) }} style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <View style={{
                                        height: 15,
                                        width: 15,
                                        borderRadius: 12,
                                        borderWidth: 2,
                                        borderColor: selectedRadion === size.id ? Colors.sky : Colors.fontNormal,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'center',

                                    }}>
                                        {
                                            selectedRadion === size.id ?
                                                <View style={{
                                                    height: 6,
                                                    width: 6,
                                                    borderRadius: 6,
                                                    backgroundColor: Colors.sky,
                                                }} />
                                                : null
                                        }
                                    </View>
                                    <Text style={[styles.sText, { color: selectedRadion === size.id ? Colors.sky : Colors.fontNormal, left: 6, bottom: 1 }]}>{size.name}</Text>

                                </TouchableOpacity>


                            </View>
                        )
                    })

                }

            </View>

            {
                selectedRadion === 1 ?
                    <InputIcon
                        styleCont={{ marginTop: 20 }}
                        label={BigStatues === 1 ? i18n.t('BigPrice') : null}
                        placeholder={BigStatues === 1 ? null : i18n.t('BigPrice')}
                        onBlur={() => unActiveInput('large_price')}
                        onFocus={() => activeInput('large_price')}
                        inputStyle={{ borderColor: BigStatues === 1 ? Colors.sky : Colors.InputColor }}
                        onChangeText={(e) => { setlarge_price(e); handaleChange(e, 1) }}
                        keyboardType='numeric'
                        value={large_price}
                        LabelStyle={{ paddingHorizontal: BigStatues === 1 ? 10 : 0, color: BigStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                    />
                    :
                    selectedRadion === 2 ?
                        <InputIcon
                            styleCont={{ marginTop: 20 }}
                            label={MiddleStatues === 1 ? i18n.t('MidlePrice') : null}
                            placeholder={MiddleStatues === 1 ? null : i18n.t('MidlePrice')}
                            onBlur={() => unActiveInput('mid_price')}
                            onFocus={() => activeInput('mid_price')}
                            inputStyle={{ borderColor: MiddleStatues === 1 ? Colors.sky : Colors.InputColor }}
                            onChangeText={(e) => { setmid_price(e); handaleChange(e, 3) }}
                            value={mid_price}
                            keyboardType='numeric'
                            LabelStyle={{ paddingHorizontal: MiddleStatues === 1 ? 10 : 0, color: MiddleStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                        />
                        :
                        selectedRadion === 3 ?
                            <InputIcon
                                styleCont={{ marginTop: 20 }}
                                label={SmallSizeStatues === 1 ? i18n.t('SmallPrice') : null}
                                placeholder={SmallSizeStatues === 1 ? null : i18n.t('SmallPrice')}
                                onBlur={() => unActiveInput('small_price')}
                                onFocus={() => activeInput('small_price')}
                                inputStyle={{ borderColor: SmallSizeStatues === 1 ? Colors.sky : Colors.InputColor }}
                                onChangeText={(e) => { setsmall_price(e); handaleChange(e, 2) }}
                                value={small_price}
                                keyboardType='numeric'
                                LabelStyle={{ paddingHorizontal: SmallSizeStatues === 1 ? 10 : 0, color: SmallSizeStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                            />
                            : null

            }











            <InputIcon
                styleCont={{ marginTop: 10 }}
                label={discountStatues === 1 ? i18n.t('discount') : null}
                placeholder={discountStatues === 1 ? null : i18n.t('discount')}
                onBlur={() => unActiveInput('Discount')}
                onFocus={() => activeInput('Discount')}
                keyboardType='numeric'
                inputStyle={{ borderColor: discountStatues === 1 ? Colors.sky : Colors.InputColor }}
                onChangeText={(e) => setDiscount(e)}
                value={Discount}
                LabelStyle={{ paddingHorizontal: discountStatues === 1 ? 10 : 0, color: discountStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
            />

            <InputIcon
                styleCont={{ marginTop: 0 }}
                label={priceStatues === 1 ? i18n.t('price') : null}
                placeholder={priceStatues === 1 ? null : i18n.t('price')}
                onBlur={() => unActiveInput('price')}
                onFocus={() => activeInput('price')}
                keyboardType='numeric'
                inputStyle={{ borderColor: priceStatues === 1 ? Colors.sky : Colors.InputColor }}
                onChangeText={(e) => setPrice(e)}
                value={price}
                LabelStyle={{ paddingHorizontal: priceStatues === 1 ? 10 : 0, color: priceStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
            />

            <InputIcon
                styleCont={{ marginTop: -5 }}
                label={availableKilosStatus === 1 ? i18n.t('Availablekilos') : null}
                placeholder={availableKilosStatus === 1 ? null : i18n.t('Availablekilos')}
                onBlur={() => unActiveInput('availableKilos')}
                onFocus={() => activeInput('availableKilos')}
                keyboardType='numeric'
                inputStyle={{ borderColor: availableKilosStatus === 1 ? Colors.sky : Colors.InputColor }}
                onChangeText={(e) => setavailableKilos(e)}
                value={availableKilos}
                LabelStyle={{ paddingHorizontal: availableKilosStatus === 1 ? 10 : 0, color: availableKilosStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
            />

            <InputIcon
                styleCont={{ marginTop: -5 }}
                label={quantityStatues === 1 ? i18n.t('quantity') : null}
                placeholder={quantityStatues === 1 ? null : i18n.t('quantity')}
                onBlur={() => unActiveInput('quantity')}
                onFocus={() => activeInput('quantity')}
                keyboardType='numeric'
                inputStyle={{ borderColor: quantityStatues === 1 ? Colors.sky : Colors.InputColor }}
                onChangeText={(e) => setQuantity(e)}
                value={quantity}
                LabelStyle={{ paddingHorizontal: quantityStatues === 1 ? 10 : 0, color: quantityStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
            />

            <View style={{ height: width * .14, marginHorizontal: '5%', borderColor: Colors.InputColor, borderWidth: .9, borderRadius: 5, flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ paddingEnd: 120, fontFamily: 'flatMedium', paddingStart: 10 }}>
                    <Text style={{ color: Colors.inputTextMainColor }}>{i18n.t('available')}</Text>
                </View>
                {
                    data.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => { setavailable(index) }} key={index + 1} style={{ flexDirection: 'row', justifyContent: 'center', padding: 10, }}>
                                <View style={{
                                    height: 15,
                                    width: 15,
                                    borderRadius: 12,
                                    borderWidth: 2,
                                    borderColor: available === index ? Colors.sky : Colors.fontNormal,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',

                                }}>
                                    {
                                        available === index ?
                                            <View style={{
                                                height: 6,
                                                width: 6,
                                                borderRadius: 6,
                                                backgroundColor: Colors.sky,
                                            }} />
                                            : null
                                    }
                                </View>
                                <Text style={[styles.sText, { color: available === index ? Colors.sky : Colors.fontNormal, left: 6, bottom: 1 }]}>{item.title}</Text>

                            </TouchableOpacity>



                        )
                    })
                }

            </View>

            <TouchableOpacity onPress={_pickImage} style={{ height: width * .14, flexDirection: 'row', marginHorizontal: "5%", borderWidth: 1, borderColor: Colors.InputColor, borderRadius: 5, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 20 }}>
                <Text style={{ color: Colors.InputColor, fontFamily: 'flatMedium', fontSize: 12 }}>{i18n.t('ProdPice')}</Text>
                <Image source={require('../../../assets/Images/camera_gray.png')} style={{ width: 15, height: 15 }} resizeMode='contain' />
            </TouchableOpacity>



            <View style={{ borderWidth: 1, borderRadius: 5, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center', height: width * .15, marginTop: 15, borderColor: Colors.InputColor, marginHorizontal: '5%' }}>
                <Dropdown
                    placeholder={i18n.t('menue')}
                    data={MenueData}
                    fontSize={12}
                    itemTextStyle={{ fontFamily: 'flatMedium' }}
                    lineWidth={0}
                    containerStyle={{ width: '95%', paddingHorizontal: 5, bottom: 10, }}
                    animationDuration={0}
                    onChangeText={val => setMenue(val)}

                    value={MenueName.label}
                />
            </View>
            <InputIcon


                placeholder={i18n.t('prodDetAr')}
                styleCont={{ height: width * .35, marginHorizontal: '5%', marginTop: 20 }}
                label={detailesArStatues === 1 ? i18n.t('prodDetAr') : null}
                placeholder={detailesArStatues === 1 ? null : i18n.t('prodDetAr')}
                onBlur={() => unActiveInput('detailesAr')}
                onFocus={() => activeInput('detailesAr')}
                inputStyle={{ borderColor: detailesArStatues === 1 ? Colors.sky : Colors.InputColor }}
                onChangeText={(e) => setDetailesAr(e)}
                value={detailesAr}
                LabelStyle={{ paddingHorizontal: detailesArStatues === 1 ? 10 : 0, color: detailesArStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14, bottom: width * .32 }}
            />


            <InputIcon
                styleCont={{ height: width * .35, marginHorizontal: '5%', marginTop: 0 }}
                label={detailesEnStatues === 1 ? i18n.t('prodDetEn') : null}
                placeholder={detailesEnStatues === 1 ? null : i18n.t('prodDetEn')}
                onBlur={() => unActiveInput('detailesEn')}
                onFocus={() => activeInput('detailesEn')}
                inputStyle={{ borderColor: detailesEnStatues === 1 ? Colors.sky : Colors.InputColor }}
                onChangeText={(e) => setDetailesEn(e)}
                value={detailesEn}
                LabelStyle={{ paddingHorizontal: detailesEnStatues === 1 ? 10 : 0, color: detailesEnStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14, bottom: width * .32, }}
            />


            {
                ExtraProduct.length ?
                    ExtraProduct.map((proExtra, index) =>
                        (
                            <>
                                <View style={{ backgroundColor: Colors.InputColor, width: '90%', justifyContent: 'space-between', alignItems: 'center', height: 50, marginHorizontal: '5%', flexDirection: 'row' }} key={index + 1}>
                                    <View style={{ flexDirection: 'row', paddingStart: 10 }}>
                                        <Text style={{ fontFamily: 'flatMedium', color: Colors.inputTextMainColor }}>{proExtra.name_ar}</Text>
                                        <Text style={{ paddingHorizontal: 10, fontFamily: 'flatMedium', color: Colors.inputTextMainColor }}>{proExtra.name_en}</Text>
                                        <Text style={{ fontFamily: 'flatMedium', color: Colors.inputTextMainColor }}>{proExtra.price}{i18n.t('Rial')}</Text>
                                    </View>
                                    <TouchableOpacity style={[styles.Delete, { alignItems: 'flex-end' }]} onPress={() => deleteExtraProduct(proExtra.id)}>
                                        <Image source={require('../../../assets/Images/trash_white.png')} style={styles.Img} resizeMode='contain' />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width, height: 1, backgroundColor: Colors.bg }}></View>
                            </>
                        )
                    ) : null
            }

            <SText title={`+ ${i18n.t('AddPro')}`} onPress={() => setEditMaodVisible(true)} style={{ color: Colors.sky, fontSize: 15, marginVertical: 20, marginTop: 0, textAlign: 'left', marginHorizontal: '5%' }} />

            <BTN title={`+ ${i18n.t('Add')}`} ContainerStyle={styles.LoginBtn} onPress={Add_Product} />
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    style={{ backgroundColor: Colors.bg, }}
                    visible={EditMaodVisible} >

                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ScrollView style={{ margin: 20, backgroundColor: Colors.bg, flex: 1 }}>
                                <InputIcon
                                    styleCont={{ marginTop: 10 }}
                                    label={ProductNameArStatues === 1 ? i18n.t('prodDetEn') : null}
                                    placeholder={ProductNameArStatues === 1 ? null : i18n.t('prodDetEn')}
                                    onBlur={() => unActiveInput('ProductnameExtraAR')}
                                    onFocus={() => activeInput('ProductnameExtraAR')}
                                    inputStyle={{ borderColor: ProductNameArStatues === 1 ? Colors.sky : Colors.InputColor }}
                                    onChangeText={(e) => setProductnameExtraAR(e)}
                                    value={ProductnameExtraAR}
                                    LabelStyle={{ paddingHorizontal: ProductNameArStatues === 1 ? 10 : 0, color: ProductNameArStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14, }}

                                />
                                <InputIcon

                                    styleCont={{ marginTop: 0 }}
                                    label={ProductNameEnStatues === 1 ? i18n.t('AddEn') : null}
                                    placeholder={ProductNameEnStatues === 1 ? null : i18n.t('AddEn')}
                                    onBlur={() => unActiveInput('ProductnameExtraEn')}
                                    onFocus={() => activeInput('ProductnameExtraEn')}
                                    inputStyle={{ borderColor: ProductNameEnStatues === 1 ? Colors.sky : Colors.InputColor }}
                                    onChangeText={(e) => setProductnameExtraEn(e)}
                                    value={ProductnameExtraEn}
                                    LabelStyle={{ paddingHorizontal: ProductNameEnStatues === 1 ? 10 : 0, color: ProductNameEnStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14, }}

                                />

                                <InputIcon
                                    styleCont={{ marginTop: 0 }}
                                    label={ProductExtraPriceStatues === 1 ? i18n.t('price') : null}
                                    placeholder={ProductExtraPriceStatues === 1 ? null : i18n.t('price')}
                                    onBlur={() => unActiveInput('priceProductExtra')}
                                    onFocus={() => activeInput('priceProductExtra')}
                                    inputStyle={{ borderColor: ProductExtraPriceStatues === 1 ? Colors.sky : Colors.InputColor }}
                                    onChangeText={(e) => setPricePrdouctExtra(e)}
                                    value={priceProductExtra}
                                    LabelStyle={{ paddingHorizontal: ProductExtraPriceStatues === 1 ? 10 : 0, color: ProductExtraPriceStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14, }}
                                />

                                <BTN title={i18n.t('send')} ContainerStyle={styles.LoginBtn} onPress={submitData} />
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>

        </ScrollView>

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
    Img: {
        height: 50,
        width: 20,
        alignSelf: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: '#737373',
        opacity: .95,

    },
    modalView: {
        backgroundColor: "white",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        width: width,
        height: height * .49,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    Delete: {
        backgroundColor: Colors.RedColor,
        justifyContent: 'flex-end', width: 30,
        alignSelf: 'flex-end'
    },
})
export default AddProduct
