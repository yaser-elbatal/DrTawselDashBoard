
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { AsyncStorage, View } from "react-native";


function InitScreen({ navigation }) {

    const lang = useSelector(state => state.lang.language);

    const auth = useSelector(state => state.auth.user ? state.auth.user : null);
    const dispatch = useDispatch();
    const [Intros, setIntros] = useState('')

    console.log('d' + Intros);
    async function fetchData() {

        await AsyncStorage.getItem("Inro", (err, res) => {
            setIntros(res)
        })
        if (lang === null || lang === undefined) {
            navigation.navigate('ChooseLang');
        } else if (Intros) {
            navigation.navigate('Login');
        }
        else {
            navigation.navigate("Home");
        }
        AsyncStorage.getItem('init').then(init => {
            if (init !== 'true') {
                AsyncStorage.setItem('init', 'true');
                // dispatch(chooseLang('ar'));
            }
        });
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <View />
    );

}

export default InitScreen;
