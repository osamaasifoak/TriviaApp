import { CommonActions, useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';
import Routes from '../constants/Routes';
import { HomeScreenNavigationProp, RootStackParamList } from '../types';

export default function HomeScreen() {
    const navigation = useNavigation<any>();
    const navigate = (route: String) => {
        navigation.navigate(route)
    }
    return (
        <View style={styles.container}>
            <View style={{ padding: 25, }} >
                <Text style={styles.title}>Trivia App</Text>
            </View>
            <View style={{ flexDirection: "row", padding: 10 }}>
                {btnContainer("Start Quiz", () => { navigate(Routes.SELECT_QUIZ_TYPE)})}
                {btnContainer("Score Board", () => { navigate(Routes.SCOREBOARD)})}

            </View>
        </View>
    );

    function btnContainer(btnTitle: String, onPress: () => void) {
        return <TouchableOpacity onPress={onPress} >
            <View style={styles.btnContainer}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)" >
                <Text style={styles.title}>{btnTitle}</Text>
            </View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    btnContainer: {
        padding: 25,
        margin: 4,
        borderRadius: 10,
        flex: 2,
        alignItems:"center",
        alignContent:"center",
        justifyContent:"center"
    }
});
