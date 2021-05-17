import { Picker } from '@react-native-picker/picker';
import { CommonActions, useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from '../../components/Themed';
import Routes from '../../constants/Routes';
import { HomeScreenNavigationProp, ResultScreenNavigationProp, ResultScreenRouteProp } from '../../types';

export default function ResultScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const route = useRoute<ResultScreenRouteProp>();
    const params = route.params;

    console.log(params)
    var minutes = Math.floor(params.totalTime / 60);
    var seconds = params.totalTime - minutes * 60;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ paddingTop: 25 }} >
                    <Text style={styles.title}>Result</Text>
                </View>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        {selectionTitle("Number of Questions:")}
                        {selectionTitle(`${params.totalQuestion}`)}
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        {selectionTitle("Correct Answer: ")}
                        {selectionTitle(`${params.correctAnswer}`)}
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        {selectionTitle("Incorrect Answer:")}
                        {selectionTitle(`${params.incorrectAnswer}`)}
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        {selectionTitle("Duration (m:s):")}
                        {selectionTitle(`${minutes}:${seconds}`)}
                    </View>
                </View>
                <TouchableOpacity onPress={() => {
                      navigation.dispatch(CommonActions.reset({
                        index: 0, routes: [
                            {
                                name: Routes.HOME
                            },
                        ]
                    }));

                }} style={{ marginTop: 15 }}>
                    <View style={styles.btnContainer}
                        lightColor="#eee"
                        darkColor="rgba(255,255,255,0.1)" >
                        <Text style={[styles.title, { color: "#ffffff" }]}>Back</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

    function selectionTitle(title: String) {
        return <View style={{ paddingTop: 10 }} >
            <Text style={styles.selectionTitle}>{title}</Text>
        </View>
    }

    function picker(selectedValue: any, pickerItem: any, onValueChange?: ((itemValue: any, itemIndex: number) => void)) {
        return <View style={{ borderRadius: 5, elevation: 1, marginVertical: 10 }} lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"  >
            <Picker
                selectedValue={selectedValue}
                mode="dropdown"
                style={{ height: 50, width: "100%", }}
                onValueChange={onValueChange}>
                {
                    //@ts-expect-error
                    pickerItem.map((e, i) => <Picker.Item key={i} label={e.label} value={e.value} />)
                }

            </Picker>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    selectionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    textInputStyle: {
        width: "100%",
        elevation: 1,
        padding: 16,
    },
    btnContainer: {
        padding: 25,
        borderRadius: 5,
        flex: 2,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "#000000"
    }
});

