import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Text, FlatList, TouchableOpacity, ScrollView, } from 'react-native';
import { CheckBox, } from "native-base";


import HomeHeader from '../../../common/HomeHeader'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors';
import { InputIcon } from '../../../common/InputText';
import { width, height } from '../../../consts/HeightWidth';
import BTN from '../../../common/BTN';
import Card from '../../../common/Card';
import { useSelector, useDispatch } from 'react-redux';
import { GetProducts, DeleteProduct, SerachForPorducts, } from '../../../store/action/ProductAction';
import Container from '../../../common/Container';
import { Dropdown } from 'react-native-material-dropdown';

function Products({ navigation }) {
    const dispatch = useDispatch();


    const [isSelected2, setSelection2] = useState();
    const [spinner, setSpinner] = useState(true);
    const [Search, setSearch] = useState('');


    const Products = useSelector(state => state.product.products);
    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const Menue = useSelector(state => state.menue.menue.data);
    const [DeleteArr, setDeleteArr] = useState([]);

    const data2 = [{
        value: i18n.t('latest'),
    }, {
        value: i18n.t('oldest'),
    },];

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(true)
            dispatch(GetProducts(token, lang)).then(() => setSpinner(false))
        });

        return unsubscribe;
    }, [navigation]);


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

    const handleChandDrpDown = (val) => {
        setSpinner(true)
        Products.reverse();
        setSpinner(false)


    }

    const SelectAllChecked = () => {
        if (isSelected2) {
            setSelection2(false);
            setDeleteArr([])
        }

        else {
            setSelection2(true);
            let MnueID = Products.map(menu => menu.id)
            setDeleteArr(MnueID)
        }
    }

    const DeleteMenueMultiIteM = () => {
        setSpinner(true)
        dispatch(DeleteProduct(token, lang, DeleteArr))
        dispatch(GetProducts(token, lang)).then(() => setSpinner(false))
    }


    const DeletProduct = (id) => {
        setSpinner(true)
        dispatch(DeleteProduct(token, lang, id))
        dispatch(GetProducts(token, lang)).then(() => setSpinner(false))
    }


    const handleChange = (e) => {
        setSearch(e);
        setTimeout(() => dispatch(SerachForPorducts(token, lang, Search)), 1000)
    }

    return (
        <Container loading={spinner}>

            <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }}>
                <HomeHeader navigation={navigation} onPress={() => navigation.navigate('MyProfile')} label={i18n.t('products')} />

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


                <View style={{ height: 60, width: '90%', margin: 20, flexDirection: 'row', alignItems: 'center', zIndex: 10, backgroundColor: '#F6F6F6', }}>
                    <CheckBox checked={isSelected2} color={isSelected2 ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: isSelected2 ? Colors.sky : Colors.bg, marginStart: -5 }} onPress={SelectAllChecked} />
                    <Text style={{ marginStart: 12, fontFamily: 'flatMedium', color: Colors.inputTextMainColor, fontSize: width * .03, paddingHorizontal: 5 }}>{i18n.t('Select')}</Text>
                    <TouchableOpacity onPress={DeleteMenueMultiIteM} style={{ borderWidth: .4, paddingHorizontal: 15, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center', height: width * .09, borderColor: Colors.InputColor, marginHorizontal: 5 }}>
                        <Text style={{ fontFamily: 'flatMedium', color: Colors.inputTextMainColor, }}> {i18n.t('delete')}</Text>
                    </TouchableOpacity>



                    <Text style={{ fontFamily: 'flatMedium', fontSize: width * .03, paddingHorizontal: 2, color: Colors.inputTextMainColor }}>{i18n.t('filter')}</Text>
                    <View style={{ borderWidth: .4, alignItems: 'center', justifyContent: 'center', height: width * .09, backgroundColor: Colors.bg, borderColor: Colors.InputColor, marginHorizontal: 5 }}>
                        <Dropdown
                            placeholder={i18n.t('select')}
                            data={data2}
                            animationDuration={0}
                            onChangeText={(val) => handleChandDrpDown(val)}
                            fontSize={14}
                            itemTextStyle={{ fontFamily: 'flatMedium' }}
                            lineWidth={0}
                            containerStyle={{ width: width * .22, paddingHorizontal: 5, bottom: 10 }}
                        />
                    </View>

                </View>



                <BTN title={i18n.t('AddProd')} ContainerStyle={styles.LoginBtn} onPress={!Menue ? () => navigation.navigate('Menue') : () => navigation.navigate('AddProduct')} />


                <FlatList
                    pagingEnabled={true}
                    showsVerticalScrollIndicator={false}
                    data={Products}
                    extraData={spinner}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('ProductDet', { ProductsId: item.id, index: index })}>
                            <View style={styles.Card}>
                                <View style={{ flexDirection: 'row', flex: .75 }}>
                                    <Image source={{ uri: item.image }} style={{ height: '100%', width: '25%' }} />
                                    <View style={styles.FWrab}>
                                        <CheckBox checked={isChecked(item.id)} color={isChecked(item.id) ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: isChecked(item.id) ? Colors.sky : Colors.bg, }} onPress={() => toggleChecked(item.id)} />
                                        <Text style={styles.nText}>{i18n.t('num')} # {index + 1}</Text>
                                        <Text style={[styles.name, { color: Colors.IconBlack }]}>{item.menu}</Text>
                                        <Text style={[styles.nMenu, { color: Colors.IconBlack }]}>{item.name}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.nText}>{item.price}</Text>
                                            <Text style={[styles.nText, { textDecorationLine: 'line-through', textDecorationColor: Colors.RedColor, textDecorationStyle: 'solid', color: Colors.InputColor, paddingHorizontal: 5, fontSize: 10 }]}>{item.price - item.discount}</Text>

                                        </View>


                                    </View>
                                </View>


                                <View style={styles.SWarb}>

                                    <TouchableOpacity style={styles.Edit} onPress={() => navigation.navigate('EditProducts', { ProductsId: item })}>
                                        <Image source={require('../../../assets/Images/Icon_edit.png')} style={styles.Img} resizeMode='contain' />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.Delete} onPress={() => DeletProduct(item.id)}>
                                        <Image source={require('../../../assets/Images/trash_white.png')} style={styles.Img} resizeMode='contain' />
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </TouchableOpacity>

                    )} />

            </ScrollView>
        </Container>

    )
}
const styles = StyleSheet.create({
    wrab: {
        overflow: 'hidden',
    },
    Linear: {
        borderTopStartRadius: 0,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        marginStart: 5,
        marginTop: 10,
        marginEnd: 5,
        height: height * .16,
        width: width * .28,
        flex: 1
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
        marginHorizontal: 20,
        marginTop: 0,
        width: '90%',
        zIndex: 0

    },
    Card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 160,
        width: '90%',
        marginStart: 20,
        marginVertical: 5,
        shadowColor: Colors.bg,
        marginTop: 0,
        backgroundColor: Colors.bg,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

    },
    FWrab: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginStart: 5
    },
    nText: {
        color: Colors.sky,
        fontFamily: 'flatMedium',
        paddingVertical: 8

    },
    nMenu: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        paddingVertical: 5

    },
    name: {
        fontFamily: 'flatMedium',
        fontSize: 10,
        color: Colors.fontNormal,
        paddingVertical: 5
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
    Modal: {
        flex: 1,
        backgroundColor: Colors.bg,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        marginTop: height * .55,
    }
})
export default Products
