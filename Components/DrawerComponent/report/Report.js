import React, { useState } from 'react'
import { View, Dimensions, ScrollView, StyleSheet, Modal, Text } from 'react-native'
import {
    BarChart,

} from "react-native-chart-kit";
import Header from '../../../common/Header';
import i18n from '../../../locale/i18n'
import { width, height } from '../../../consts/HeightWidth';
import Colors from '../../../consts/Colors';
import BTN from '../../../common/BTN';


function Report({ navigation }) {

    const chartConfig = {
        backgroundGradientFrom: Colors.bg,
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: Colors.bg,
        backgroundGradientToOpacity: 1,
        fillShadowGradientOpacity: 1,
        useShadowColorFromDataset: true,
        color: (opacity = 1) => `rgba(0, 191, 255, ${opacity})`,
        strokeWidth: 5, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: false, // optional
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

    };
    const data = {
        labels: ["70%", `50${i18n.t('RS')}`, "80%"],
        datasets: [
            {
                data: [45, 45, 50,]
            }
        ]
    };
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bg }}>
            <Header navigation={navigation} label={i18n.t('reports')} />
            <ScrollView style={{ flex: 1 }}>
                <BarChart
                    data={data}
                    width={width}
                    height={420}
                    chartConfig={chartConfig}
                    fromZero={true}
                    withInnerLines={false}
                    showBarTops={false}
                    style={{ marginTop: 40 }}
                />
                <BTN title={i18n.t('Createreport')} ContainerStyle={{
                    marginVertical: 10, borderRadius: 5, marginHorizontal: '5%', marginTop: 10, width: '90%'
                }} onPress={() => setModalVisible(true)} />

                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible} >

                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={{ margin: 20, marginTop: 50 }}>
                                    <Text style={{ fontFamily: 'flatMedium', fontSize: 14, textAlign: 'center', }}>سيتم ارسال التقرير اليك </Text>

                                    <BTN title={i18n.t('backHome')} ContainerStyle={{ borderRadius: 5 }} onPress={() => { setModalVisible(false); navigation.navigate('HomePage') }} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
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
        height: height * .25,
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
export default Report
