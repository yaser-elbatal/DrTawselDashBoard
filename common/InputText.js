import React, { useState } from "react";
import { View, StyleSheet, TextInput, I18nManager, Image, Dimensions, Text, TouchableOpacity } from "react-native";
import Colors from "../consts/Colors";


const { width } = Dimensions.get('window')

const InputIcon = ({
    KeyboardStyle,
    label,
    value,
    onChangeText,
    LabelStyle,
    inputStyle,
    placeholder,
    image,
    styleCont,
    imageFocused,
    onPress,
    imgStyle,

    ...props
}) => {

    const [focused, setFocused] = useState(false);

    return (

        <View onPress={onPress} style={[styles.containerTableTextOverInput, styleCont]}>

            <Text style={[styles.labelText, LabelStyle]}  >
                {label}
            </Text>

            <TextInput
                style={[styles.textInput, inputStyle]}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...props}
                placeholder={placeholder}
            />
            <TouchableOpacity onPress={onPress}>
                <Image source={image} style={[styles.image, imgStyle]} />

            </TouchableOpacity>
        </View>


    );
};
export { InputIcon };

const styles = StyleSheet.create({

    containerTableTextOverInput: {
        height: width * .2,
        position: "relative",
        marginHorizontal: "5%",
        marginTop: 30

    },
    labelText: {
        left: 20,
        backgroundColor: Colors.bg,
        alignSelf: "flex-start",
        fontSize: width * .03,
        zIndex: 10,
        position: "absolute",
        bottom: width * .175,
        fontFamily: 'flatMedium',
        color: Colors.fontNormal,

    },
    textInput: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 25,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 5,
        color: Colors.fontNormal,
        paddingRight: 20,
        paddingLeft: 20,
        textAlign: I18nManager.isRTL ? "right" : "left",
        fontFamily: "flatMedium",
        fontSize: width * .026,
    },
    image: {
        width: width * 0.04,
        maxWidth: width * 0.12,
        height: width * 0.06,
        maxHeight: width * 0.12,
        resizeMode: "contain",
        left: width * .8,
        bottom: width * .09
    },
});
