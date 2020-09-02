import React from "react";
import { Text, StyleSheet, I18nManager, TouchableOpacity } from "react-native";
import Colors from "../consts/Colors";

const SText = ({ title, style, onPress, ...rest }) => (
    <TouchableOpacity onPress={onPress} >
        <Text {...rest} style={[styles.text, style]}>
            {title}
        </Text>
    </TouchableOpacity>
);
export { SText };

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        color: '#BCBCBC',
        fontFamily: "flatMedium",
        textAlign: 'center',
        paddingTop: 15,

    },
});
