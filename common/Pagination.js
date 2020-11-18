import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import Container from './Container';


function Pagination() {
    const [loading, setloading] = useState(true)
    const [randomUserData, SetrandomUserData] = useState([])
    const [loadingExtraData, setloadingExtraData] = useState(true)
    const [page, setpage] = useState(1);


    const LoadRandomData = async () => {
        setloading(true);

        await fetch(`http://hnagran.aait-sa.com/api/get-blogs?page=${page}`).
            then(response => response.json()).then(responseJson => {

                setpage(page + 1);
                SetrandomUserData([...randomUserData, ...responseJson.data]);
                setloading(false);

            }).catch(error => {
                console.log('Error selecting random data: ' + error)
            })

    }

    console.log(page);
    useEffect(() => {
        setloadingExtraData(true)
        LoadRandomData().then(() => setloadingExtraData(false))

    }, [])




    const renderCustomItem = ({ item, index }) => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text>{item.id}</Text>
                <Text>{item.title}</Text>
                <Image source={{ uri: item.img }} style={{ width: 200, height: 200 }} />

            </View>

        )
    }

    return (
        <Container loading={loadingExtraData}>
            <View style={{ marginTop: 50, flex: 1 }}>
                <FlatList

                    data={randomUserData}
                    style={{ width: 350, height: 800 }}
                    renderItem={renderCustomItem}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0.4}
                    onEndReached={LoadRandomData}
                />
                {
                    loading ? (
                        <ActivityIndicator
                            color="red"
                            style={{ marginLeft: 8 }} size={'large'} />
                    )
                        : null
                }
            </View>
        </Container>

    )
}

export default Pagination
