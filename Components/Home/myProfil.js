import React, { useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ImageBackground, I18nManager } from 'react-native'
import Colors from '../../consts/Colors'
import i18n from '../../locale/i18n'
import { useSelector, useDispatch } from 'react-redux'
import { GetProfile } from '../../store/action/ProfileAction'
import { width } from '../../consts/HeightWidth'

function myProfil({ navigation }) {

    const token = useSelector(state => state.auth.user.data.token)
    const user = useSelector(state => state.auth.user.data)
    const lang = useSelector(state => state.lang.language);
    // const myProf = useSelector(state => state.profile.user.data);
    // console.log('myProf' + myProf);
    const dispatch = useDispatch();
    console.log(token);

    const fetchData = async () => {
        await dispatch(GetProfile(token, lang));
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={{ flex: 1 }}>

            <Image source={{ uri: user.avatar }} style={styles.ImgBackGround} resizeMode='contain' />

            <ImageBackground source={require('../../assets/Images/bluBack.png')} style={{ height: 120, width: 120, alignItems: 'center', justifyContent: 'center', position: 'absolute', marginTop: -20, marginLeft: -20 }} resizeMode='contain'>
                <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
                    {
                        I18nManager.isRTL ?
                            <Image source={require('../../assets/Images/arrowwhite.png')} style={{ height: 25, width: 25, marginTop: 45 }} resizeMode='contain' />
                            :
                            <Image source={require('../../assets/Images/left.png')} style={{ height: 25, width: 25, marginTop: 45 }} resizeMode='contain' />

                    }
                </TouchableOpacity>
            </ImageBackground>

            <View style={styles.ScrolContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={{ alignItems: 'center', alignSelf: "flex-end", marginHorizontal: 5, bottom: 20, width: 50, height: 50, borderRadius: 50, backgroundColor: Colors.sky, justifyContent: 'center' }}>
                    <Image source={require('../../assets/Images/Icon_edit.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <Text style={styles.MainText}>{i18n.t('myProfile')}</Text>

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                    <View style={{ margin: 20, marginTop: 0 }}>

                        <View style={styles.Wrab}>
                            <Text style={styles.user}>{user.name}</Text>

                        </View>
                        <View style={styles.Line}></View>
                        <View style={styles.Wrab}>
                            <Text style={styles.user}>{user.phone}</Text>

                        </View>
                        <View style={styles.Line}></View>



                        <View style={styles.Wrab}>
                            <Text style={styles.user}>{user.provider.city}</Text>

                        </View>
                        <View style={styles.Line}></View>

                        <View style={styles.Wrab}>
                            <Text style={styles.user}>{user.email}</Text>

                        </View>
                        <View style={styles.Line}></View>


                    </View>


                </ScrollView>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    MainText: {
        fontFamily: 'flatMedium',
        fontSize: 16,
        margin: 20
    },
    user: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.fontNormal
    },
    EditImg: {
        width: 20,
        height: 20
    },
    Wrab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    ImgBackGround: {
        width: '110%',
        height: '42%',
        right: 18
    },
    Line: {
        height: 1,
        width: '100%',
        backgroundColor: Colors.fontNormal,
        opacity: .2,
        marginVertical: 15
    },
    ScrolContainer: {
        position: 'absolute',
        width: '100%',
        backgroundColor: Colors.bg,
        bottom: 0, height: '60%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    }
})
export default myProfil
