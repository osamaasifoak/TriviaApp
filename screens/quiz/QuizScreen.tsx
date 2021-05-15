import { Picker } from '@react-native-picker/picker';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/core';
import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Pulse } from 'react-native-animated-spinkit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from '../../components/Themed';
import { QuizScreenRouteProp } from '../../types';

export default function QuizScreen() {
    const route = useRoute<QuizScreenRouteProp>();
    const [loading, setLoading] = useState(true);
    const params = route.params;
    console.log(`https://opentdb.com/api.php?amount=${params.numberOfQuestion}&category=${params.category}&difficulty=${params.difficulty}&type=${params.type}`)
    useEffect(() => {
        getQuestions()
    })

    function getQuestions() {
        let url = `https://opentdb.com/api.php?amount=${params.numberOfQuestion}`;
        if (params.category != undefined) {
            url = url.concat(`&category=${params.category}`)
        }
        if (params.difficulty != undefined) {
            url = url.concat(`&difficulty=${params.difficulty}`)
        }
        if (params.type != undefined) {
            url = url.concat(`&type=${params.type}`)
        }
        console.log(url)
        fetch(url, {
            method: 'GET',
        }).then(response => response.json()).then((res) => {
            console.log(res)
            setLoading(false);
        }).catch((err) => {
            console.log(err)
        });
    }

    if (!loading) {
        return (

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{ paddingTop: 25 }} >
                        <Text style={styles.title}>Create Quizasdasd</Text>
                    </View>
                    {selectionTitle("Number of Questions:")}
                    <TouchableOpacity onPress={() => { }} style={{ marginTop: 15 }}>
                        <View style={styles.btnContainer}
                            lightColor="#eee"
                            darkColor="rgba(255,255,255,0.1)" >
                            <Text style={[styles.title, { color: "#ffffff" }]}>Start Quiz</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
    else {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Pulse />
            </View>
        )
    }

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
                    pickerItem.map((e) => <Picker.Item label={e.label} value={e.value} />)
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

