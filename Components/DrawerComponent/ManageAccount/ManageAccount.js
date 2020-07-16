import React, { useState } from 'react'
import { View, ScrollView, Text, StyleSheet, Dimensions, FlatList } from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';


import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors';
import BTN from '../../../common/BTN';

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
function ManageAccount({ navigation }) {
    const [routes] = useState([
        { key: 'first', title: i18n.t('Notsettled') },
        { key: 'second', title: i18n.t('Adjusted') },

    ]);
    const [index, setIndex] = useState(0);
    const MeueCard = [{
        id: 'K0',
        TotalPrice: 100,
        OrderPrice: 100,
        Commission: 100
    },
    {
        id: 'K1',
        TotalPrice: 100,
        OrderPrice: 100,
        Commission: 100
    },
    {
        id: 'K2',
        TotalPrice: 100,
        OrderPrice: 100,
        Commission: 100
    }
        ,

    ]

    const MeueCard2 = [{
        id: 'K0',
        TotalPrice: 100,
        OrderPrice: 100,
        Commission: 100
    },
    {
        id: 'K1',
        TotalPrice: 100,
        OrderPrice: 100,
        Commission: 100
    },
    {
        id: 'K2',
        TotalPrice: 100,
        OrderPrice: 100,
        Commission: 100
    }
        ,

    ]
    const FirstRoute = () => (
        <FlatList
            pagingEnabled={true}
            showsVerticalScrollIndicator={false}
            data={MeueCard}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (

                <View style={styles.card}>
                    <View style={{ margin: 10 }}>



                        <Text style={styles.Text}>{i18n.t('num')} #1</Text>



                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginEnd: 120, marginTop: 0 }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                <Text style={styles.sText}>{i18n.t('total')}  </Text>
                                <Text style={styles.sText}>{i18n.t('OrderPrice')}</Text>
                                <Text style={styles.sText}>{i18n.t('Commission')}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                <Text style={{ marginVertical: 5 }}>:</Text>
                                <Text style={{ marginVertical: 5 }}>:</Text>
                                <Text style={{ marginVertical: 5 }}>:</Text>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                <Text style={styles.sText}>{item.item.TotalPrice}{i18n.t('Rial')}</Text>
                                <Text style={styles.sText}>{item.item.OrderPrice}{i18n.t('Rial')}</Text>
                                <Text style={styles.sText}>{item.item.Commission}{i18n.t('Rial')}</Text>
                            </View>
                        </View>



                    </View>
                    <BTN title={i18n.t('confirm')} ContainerStyle={{ marginHorizontal: 20, marginTop: 0 }} onPress={() => navigation.navigate('OrderDetMangeAcc')} />


                </View>)} />
    )

    const SecondRoute = () => (
        <FlatList
            pagingEnabled={true}
            showsVerticalScrollIndicator={false}
            data={MeueCard2}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (

                <View style={styles.card}>
                    <View style={{ margin: 10 }}>
                        <Text style={styles.Text}>{i18n.t('num')} #1</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginEnd: 120, marginTop: 0 }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                <Text style={styles.sText}>{i18n.t('total')}  </Text>
                                <Text style={styles.sText}>{i18n.t('OrderPrice')}</Text>
                                <Text style={styles.sText}>{i18n.t('Commission')}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                <Text style={{ marginVertical: 5 }}>:</Text>
                                <Text style={{ marginVertical: 5 }}>:</Text>
                                <Text style={{ marginVertical: 5 }}>:</Text>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                <Text style={styles.sText}>{item.item.TotalPrice}{i18n.t('Rial')}</Text>
                                <Text style={styles.sText}>{item.item.OrderPrice}{i18n.t('Rial')}</Text>
                                <Text style={styles.sText}>{item.item.Commission}{i18n.t('Rial')}</Text>
                            </View>
                        </View>
                    </View>
                    <BTN title={i18n.t('Adjusted')} ContainerStyle={{ marginHorizontal: 20, marginTop: 0, marginVertical: 10, backgroundColor: Colors.InputColor }} onPress={() => navigation.navigate('OrderDetAdjust')} />


                </View>)} />
    )


    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,

    });
    const renderTabBar = props => (
        <TabBar
            {...props}
            getLabelText={({ route }) => route.title}
            activeColor={Colors.bg}
            inactiveColor={Colors.IconBlack}
            labelStyle={{
                fontSize: width * 0.035,
                fontFamily: 'flatMedium',
            }}
            style={styles.tab}
            indicatorStyle={styles.TabLine}
            pressColor={Colors.bg}
        />
    );
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bg }}>
            <Header navigation={navigation} label={i18n.t('ManageAccs')} />

            <View style={{ flex: 1, marginTop: 20 }}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={width}
                    renderTabBar={renderTabBar}
                />

            </View>
        </View>
    )
}
const styles = StyleSheet.create({

    tab: {
        backgroundColor: '#F8F8F8',
        borderRadius: 50,
        width: '95%',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    TabLine: {
        backgroundColor: Colors.sky,
        height: '75%',
        width: '45%',
        marginVertical: 5,
        marginTop: 5,
        borderRadius: 20,
        marginHorizontal: 5
    },
    Text: {
        fontFamily: 'flatMedium',
        color: Colors.sky,
        fontSize: width * .04,
        marginHorizontal: 10

    },
    tabContainer: {
        backgroundColor: "white",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        height: "20%",
        alignItems: "center",
        marginTop: 10,
        height: 40
    },
    card: {
        shadowColor: Colors.bg,
        backgroundColor: Colors.bg,
        margin: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        marginVertical: 5,
        height: width * .57,
        paddingTop: 10,
        paddingStart: 10,
        overflow: 'hidden',
        borderRadius: 5

    },


    sText: {
        fontFamily: 'flatMedium',
        color: Colors.IconBlack,
        fontSize: width * .03,
        marginVertical: 5,
        marginHorizontal: 10
    },

    yText: {
        fontFamily: 'flatLight',
        color: Colors.IconBlack,
        fontSize: width * .026,
        marginTop: width * .02,
    },
})
export default ManageAccount
