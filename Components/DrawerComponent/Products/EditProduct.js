import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Dimensions, StyleSheet, Image, Modal, I18nManager, ImageBackground } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


import i18n from '../../../locale/i18n'
import { InputIcon } from '../../../common/InputText'
import Colors from '../../../consts/Colors'
import BTN from '../../../common/BTN';
import { SText } from '../../../common/SText';
import Header from '../../../common/Header';
import { useSelector, useDispatch } from 'react-redux';
import { EditProducts, GetProducts, ProductDetailes, GetProductExtrasFromEdit, AddExtraProductsFromEdit, DeleteProductExtrasFromEdit } from '../../../store/action/ProductAction';
import Container from '../../../common/Container';


const { width, height } = Dimensions.get('window')
const EditProduct = ({ navigation, route }) => {

    const { ProductsId } = route.params



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(true)
            dispatch(ProductDetailes(token, lang, ProductsId.id)).then(() => setSpinner(false));
            setSpinner(true)
            dispatch(GetProductExtrasFromEdit(ProductsId.id, token, lang)).then(() => setSpinner(false));
        });

        return unsubscribe;
    }, [navigation, route])



    const ProductDet = useSelector(state => state.product.EditProduct);
    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const Menue = useSelector(state => state.menue.menue.data);
    const ProductsExtras = useSelector(state => state.product.ExtraProduct);
    console.log(ProductsExtras);
    const dispatch = useDispatch();


    const [nameAR, setNameAr] = useState(ProductDet.name_ar);
    const [nameEN, setNameEN] = useState(ProductDet.name_en)
    const [price, setPrice] = useState(`${ProductDet.price}`);
    const [small_price, setsmall_price] = useState(`${ProductDet.small_price}`);
    const [mid_price, setmid_price] = useState(`${ProductDet.mid_price}`);
    const [large_price, setlarge_price] = useState(`${ProductDet.large_price}`);
    const [selectedRadion, setSelectedRadio] = useState(0)
    const [spinner, setSpinner] = useState(true);

    const [ProductnameExtraAR, setProductnameExtraAR] = useState('');
    const [ProductnameExtraEn, setProductnameExtraEn] = useState('')
    const [priceProductExtra, setPricePrdouctExtra] = useState('');

    const [availableKilos, setavailableKilos] = useState(`${ProductDet.available_kilos}`);
    const [Discount, setDiscount] = useState(`${ProductDet.discount}`);
    const [quantity, setQuantity] = useState(`${ProductDet.quantity}`)
    const [detailesAr, setDetailesAr] = useState(ProductDet.details_ar)
    const [detailesEn, setDetailesEn] = useState(ProductDet.details_en)
    const [available, setavailable] = useState(ProductDet.available);



    const [MenueId, setMenue] = useState(ProductDet.menu_id)
    const [EditMaodVisible, setEditMaodVisible] = useState(false);

    const [base64, setBase64] = useState(ProductDet.image);
    const [userImage, setUserImage] = useState(null);





    const [Sizes, setSizes] = useState([
        { id: 1, name: `${i18n.t('large')}` },
        { id: 2, name: `${i18n.t('mid')}` },
        { id: 3, name: `${i18n.t('small')}` }
    ]);


    const [data, setData] = useState([

        { id: 0, title: `${i18n.t("no")}` },
        { id: 1, title: `${i18n.t("yes")}` },

    ])


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




    let MenueData = !Menue ? [] : Menue.map(menue => ({ label: menue.name, value: menue.id }));
    // let MenueName = Menue.map(menue => ({ label: menue.name, }));

    console.log(ProductsId);






    const Edit_product = () => {
        setSpinner(true)
        dispatch(EditProducts(token, lang, ProductsId, nameAR, nameEN, price, available, detailesAr, detailesEn, availableKilos, Discount, quantity, MenueId, small_price, mid_price, large_price, base64, ProductsExtras, navigation))
        dispatch(GetProducts(token, lang)).then(() => setSpinner(false))



    }



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


    const AddProductExras = () => {
        setSpinner(true)
        dispatch(AddExtraProductsFromEdit(ProductnameExtraAR, ProductnameExtraEn, priceProductExtra, ProductsId, token, lang));
        dispatch(GetProductExtrasFromEdit(ProductsId, token, lang)).then(() => setSpinner(false))
        setEditMaodVisible(false)
    }


    const DeleteExtraOneProduct = (id) => {
        setSpinner(true)
        dispatch(DeleteProductExtrasFromEdit(id, token))
        dispatch(GetProductExtrasFromEdit(ProductsId, token, lang)).then(() => setSpinner(false))

    }


    // const handaleChange = (e, IdSelect) => {
    //     let array = SizePriceId;
    //     let ID = array.findIndex(id => id.size_id === IdSelect);
    //     array[ID].price = e

    //     SetSizePriceId(array)

    // }
    const user = useSelector(state => state.auth.user.data);




    return (
        <Container loading={spinner}>

            <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }}>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ right: 20, bottom: 15 }}>
                        <ImageBackground source={require('../../../assets/Images/bluBack.png')} style={{ height: 120, width: 120, alignItems: 'center', justifyContent: 'center' }} resizeMode='contain'>
                            <TouchableOpacity onPress={() => navigation.navigate('Products')}>
                                {
                                    I18nManager.isRTL ?
                                        <Image source={require('../../../assets/Images/arrowwhite.png')} style={{ height: 30, width: 30, marginTop: 45 }} resizeMode='contain' />
                                        :
                                        <Image source={require('../../../assets/Images/left.png')} style={{ height: 30, width: 30, marginTop: 45 }} resizeMode='contain' />

                                }
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
                        <View style={{ marginTop: 45, marginHorizontal: 20 }}>
                            <Image source={require('../../../assets/Images/circlegreen.png')} style={{ height: 10, width: 10, position: 'absolute', alignSelf: 'flex-end', }} />
                            <Image source={{ uri: user.avatar }} style={{ height: 45, width: 45, borderRadius: 50, }} />
                        </View>
                    </TouchableOpacity>

                </View>
                <Text style={{ marginHorizontal: 25, fontFamily: 'flatMedium', fontSize: 18, }}>{i18n.t('edit')}</Text>
                {/* <Header navigation={navigation} label={i18n.t('AddPro')} /> */}

                <InputIcon

                    label={i18n.t('prodnameAr')}
                    placeholder={i18n.t('prodnameAr')}
                    onChangeText={(e) => setNameAr(e)}
                    value={nameAR}

                />
                <InputIcon

                    label={i18n.t('prodnameEn')}
                    placeholder={i18n.t('prodnameEn')}

                    onChangeText={(e) => setNameEN(e)}
                    value={nameEN}
                    styleCont={{ marginTop: 0 }}

                />

                <Text style={{ marginStart: 10, fontFamily: 'flatMedium', fontSize: 16, }}>{i18n.t('addSize')}</Text>
                <View style={{ alignItems: 'center', marginTop: 10, borderWidth: 1, height: 50, marginHorizontal: "5%", borderColor: '#E0E0E0', borderRadius: 5, flexDirection: 'row' }}>

                    {
                        Sizes.map((size, index) => {
                            return (

                                <View key={index} style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 30, flexDirection: 'row' }}>
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
                            label={i18n.t('BigPrice')}
                            placeholder={i18n.t('BigPrice')}
                            onChangeText={(e) => { setlarge_price(e); handaleChange(e, 1) }}
                            keyboardType='numeric'
                            value={large_price}
                        />
                        : selectedRadion === 3 ?
                            <InputIcon
                                styleCont={{ marginTop: 20 }}
                                label={i18n.t('SmallPrice')}
                                placeholder={i18n.t('SmallPrice')}
                                onChangeText={(e) => { setsmall_price(e); handaleChange(e, 2) }}
                                value={small_price}
                                keyboardType='numeric'
                            />

                            : selectedRadion === 2 ?
                                <InputIcon
                                    styleCont={{ marginTop: 20 }}
                                    label={i18n.t('MidlePrice')}
                                    placeholder={i18n.t('MidlePrice')}
                                    onChangeText={(e) => { setmid_price(e); handaleChange(e, 3) }}
                                    value={mid_price}
                                    keyboardType='numeric'
                                />
                                : null
                }




                <InputIcon
                    styleCont={{ marginTop: 10 }}
                    label={i18n.t('discount')}
                    placeholder={i18n.t('discount')}
                    keyboardType='numeric'
                    onChangeText={(e) => setDiscount(e)}
                    value={Discount}
                />

                <InputIcon
                    styleCont={{ marginTop: 0 }}
                    label={i18n.t('price')}
                    placeholder={i18n.t('price')}

                    keyboardType='numeric'
                    onChangeText={(e) => setPrice(e)}
                    value={price}
                />

                <InputIcon
                    styleCont={{ marginTop: -5 }}
                    label={i18n.t('Availablekilos')}
                    placeholder={i18n.t('Availablekilos')}

                    keyboardType='numeric'
                    onChangeText={(e) => setavailableKilos(e)}
                    value={availableKilos}
                />

                <InputIcon
                    styleCont={{ marginTop: -5 }}
                    label={i18n.t('quantity')}
                    placeholder={i18n.t('quantity')}
                    keyboardType='numeric'
                    onChangeText={(e) => setQuantity(e)}
                    value={quantity}
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

                <TouchableOpacity onPress={_pickImage} style={{ height: width * .14, flexDirection: 'row', marginHorizontal: "5%", marginTop: 15, borderWidth: 1, borderColor: Colors.InputColor, borderRadius: 5, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
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

                        value={ProductDet.menu}
                    />
                </View>
                <InputIcon


                    placeholder={i18n.t('prodDetAr')}
                    styleCont={{ height: width * .35, marginHorizontal: '5%', marginTop: 20 }}
                    placeholder={i18n.t('prodDetAr')}
                    onChangeText={(e) => setDetailesAr(e)}
                    value={detailesAr}
                />

                <InputIcon

                    placeholder={i18n.t('prodDetEn')}
                    styleCont={{ height: width * .35, marginHorizontal: '5%', marginTop: 20 }}
                    placeholder={i18n.t('prodDetAr')}
                    onChangeText={(e) => setDetailesEn(e)}
                    value={detailesEn}
                />

                {!ProductsExtras ? [] :
                    !ProductsExtras.data ? [] :

                        ProductsExtras.data.map((proExtra, index) =>
                            (
                                <>
                                    <View style={{ backgroundColor: '#F3F3F3', width: '90%', justifyContent: 'space-between', alignItems: 'center', height: 45, marginHorizontal: '5%', flexDirection: 'row' }} key={index + 1}>
                                        <View style={{ flexDirection: 'row', paddingStart: 10 }}>
                                            <Text style={{ fontFamily: 'flatMedium', color: Colors.inputTextMainColor }}>{proExtra.name}</Text>
                                            <Text style={{ fontFamily: 'flatMedium', color: Colors.inputTextMainColor }}>{proExtra.price}{i18n.t('Rial')}</Text>
                                        </View>
                                        <TouchableOpacity style={[styles.Delete, { alignItems: 'flex-end' }]} onPress={() => DeleteExtraOneProduct(proExtra.id)}>
                                            <Image source={require('../../../assets/Images/trash_white.png')} style={styles.Img} resizeMode='contain' />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width, height: 1, backgroundColor: Colors.bg }}></View>
                                </>
                            )
                        )
                }




                <SText title={`+ ${i18n.t('AddPro')}`} onPress={() => setEditMaodVisible(true)} style={{ color: Colors.sky, fontSize: 15, marginVertical: 20, marginTop: 0, textAlign: 'left', marginHorizontal: '5%' }} />

                <BTN title={i18n.t('edit')} ContainerStyle={styles.LoginBtn} onPress={Edit_product} />


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
                                        label={i18n.t('prodDetAr')}
                                        placeholder={i18n.t('prodDetEn')}

                                        onChangeText={(e) => setProductnameExtraAR(e)}
                                        value={ProductnameExtraAR}

                                    />
                                    <InputIcon

                                        styleCont={{ marginTop: 0 }}
                                        label={i18n.t('AddEn')}
                                        placeholder={i18n.t('AddEn')}
                                        onChangeText={(e) => setProductnameExtraEn(e)}
                                        value={ProductnameExtraEn}

                                    />

                                    <InputIcon
                                        styleCont={{ marginTop: 0 }}
                                        label={i18n.t('price')}
                                        placeholder={i18n.t('price')}

                                        onChangeText={(e) => setPricePrdouctExtra(e)}
                                        value={priceProductExtra}
                                    />

                                    <BTN title={i18n.t('send')} ContainerStyle={styles.LoginBtn} onPress={AddProductExras} />
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                </View>


            </ScrollView>
        </Container>

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
    Img: {
        height: 50,
        width: 20,
        alignSelf: 'center'
    },
})
export default EditProduct
