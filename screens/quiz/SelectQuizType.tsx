import { Picker } from '@react-native-picker/picker';
import { CommonActions, useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, TextInput, TouchableNativeFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from '../../components/Themed';
import { category, difficulty, numberOfQuestion, quizType } from '../../constants/QuizCategoryConstant';

export default function SelectQuizTypeScreen() {
    const [quizCategory, setQuizCategory] = useState({
        numberOfQuestion: 10,
        category: undefined,
        difficulty: undefined,
        type: undefined
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ paddingTop: 25 }} >
                    <Text style={styles.title}>Create Quiz</Text>
                </View>
                {selectionTitle("Number of Questions:")}
                {picker(quizCategory.numberOfQuestion, numberOfQuestion, (itemValue, itemIndex) => setQuizCategory({ ...quizCategory, numberOfQuestion: itemValue }))}
                {selectionTitle("Select Category:")}
                {picker(quizCategory.category, category, (itemValue, itemIndex) => setQuizCategory({ ...quizCategory, category: itemValue }))}
                {selectionTitle("Select Difficulty:")}
                {picker(quizCategory.difficulty, difficulty, (itemValue, itemIndex) => setQuizCategory({ ...quizCategory, difficulty: itemValue }))}
                {selectionTitle("Select Type:")}
                {picker(quizCategory.type, quizType, (itemValue, itemIndex) => setQuizCategory({ ...quizCategory, type: itemValue }))}

            </View>
        </SafeAreaView>
    );

    function selectionTitle(title: String) {
        return <View style={{ paddingTop: 10 }} >
            <Text style={styles.selectionTitle}>{title}</Text>
        </View>
    }

    function picker(selectedValue: any, pickerItem: any, onValueChange?: ((itemValue: any, itemIndex: number) => void)) {
        return <View style={{ borderRadius: 10, elevation: 2 }} >
            <Picker
                selectedValue={selectedValue}
                mode="dropdown"
                style={{ height: 50, width: "100%", }}
                onValueChange={
                    onValueChange
                    // (itemValue, itemIndex) => setQuizCategory({ ...quizCategory, numberOfQuestion: itemValue })
                }>
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
});

