import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/core';
import moment from 'moment';
import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Pulse } from 'react-native-animated-spinkit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from '../../components/Themed';
import Routes from '../../constants/Routes';
import { Convert, SortBy } from '../../models/QuizModel';
import { QuizScreenRouteProp, ResultScreenNavigationProp } from '../../types';

export default function QuizScreen() {
    const navigation = useNavigation<ResultScreenNavigationProp>();
    const route = useRoute<QuizScreenRouteProp>();
    const [loading, setLoading] = useState<boolean>(true);
    const [disabledOtionTab, setDisabledOtionTab] = useState<boolean>(false);
    const [seconds, setSeconds] = React.useState<any>(10);
    const [questionCount, setQuestionCount] = React.useState<number>(0);
    const [quizData, setQuizData] = useState<SortBy[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
    const params = route.params;
    let now = new Date();
    var dateString = moment(now).format('YYYY-MM-DD');
    const [calculatingResult, setCalculatingResult] = useState({
        correctAnswer: 0,
        incorrectAnswer: 0,
        totalTime: 0,
        totalQuestion: params.numberOfQuestion,
        dateTime: dateString
    });
    // console.log(`https://opentdb.com/api.php?amount=${params.numberOfQuestion}&category=${params.category}&difficulty=${params.difficulty}&type=${params.type}`)
    useEffect(() => {
        async function getQuestions() {
            // setQuizData("jsonRes");
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
            try {
                const response = await fetch(url, {
                    method: 'GET',
                });
                const res = await response.json();
                if (res) {
                    const result = Convert.toSortBy(JSON.stringify(res.results))
                    // console.log("res.results", res.results)
                    result.forEach((element) => {
                        element.incorrectAnswers.push(element.correctAnswer);
                        element.incorrectAnswers = element.incorrectAnswers.sort((a, b) => 0.5 - Math.random());

                        if (element.question.includes("&quot;")) { element.question = element.question.replace(/&quot;/g, '"'); }
                        if (element.question.includes("&#039;")) { element.question = element.question.replace(/&#039;/g, "'"); }
                        if (element.question.includes("&sup2;")) { element.question = element.question.replace(/&sup2;/g, "^2"); }

                        // if (element.question.includes("&quot;")) { element.question = element.question.replace("&quot;", `"`) }

                        // var options = element.incorrectAnswers;
                        // var it = options[Math.floor(Math.random() * options.length)];
                        // console.log(element.correctAnswer);
                        // console.log(shuffledArray);
                    })
                    setQuizData(result);
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false);
            }
        }
        getQuestions()
    }, [])

    useEffect(() => {
        if (seconds > 0 && (selectedAnswer === null || selectedAnswer === undefined)) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            if (quizData.length - 1 !== questionCount) {
                // setSeconds(10);
                // setQuestionCount((prev) => prev + 1)
                if (selectedAnswer === null || selectedAnswer === undefined) {
                    console.log("this is running 2")
                    setCalculatingResult({
                        ...calculatingResult,
                        incorrectAnswer: calculatingResult.incorrectAnswer++,
                    })
                    setCalculatingResult({
                        ...calculatingResult,
                        totalTime: calculatingResult.totalTime + seconds,
                    })
                }
                setSelectedAnswer(quizData[questionCount].correctAnswer)
                setDisabledOtionTab(false)

                console.log(quizData, questionCount)
                console.log(calculatingResult)
            }
            setSeconds(0)
        }
    });

    async function onPressAnswer(userSelectedAnwer: any) {
        setSelectedAnswer(userSelectedAnwer)
        setDisabledOtionTab(true)
        setCalculateResult(userSelectedAnwer)
        setSeconds(0)
        console.log(calculatingResult)
    }
    async function setCalculateResult(userSelectedAnwer: any) {
        let i = 0;
        console.log("this is running :", i++)
        if (quizData.length - 1 !== questionCount) {
            if (userSelectedAnwer === quizData[questionCount].correctAnswer) {
                setCalculatingResult({
                    ...calculatingResult,
                    correctAnswer: calculatingResult.correctAnswer++,

                })
                setCalculatingResult({
                    ...calculatingResult,
                    totalTime: calculatingResult.totalTime + seconds,

                })

            } else {
                setCalculatingResult({
                    ...calculatingResult,
                    incorrectAnswer: calculatingResult.incorrectAnswer++,
                })
                setCalculatingResult({
                    ...calculatingResult,
                    totalTime: calculatingResult.totalTime + seconds,
                })
            }

        }
        console.log(calculatingResult)
    }
    const storeData = async () => {
        try {
            var data = await AsyncStorage.getItem('scoreboard');
            //@ts-expect-error
            console.log("JSON ", JSON.parse((data)))
            if (data !== null) {
                let parsedJson = JSON.parse(data);
                parsedJson = [...parsedJson, calculatingResult]
                await AsyncStorage.setItem('scoreboard', JSON.stringify(parsedJson));
            } else {
                await AsyncStorage.setItem('scoreboard', JSON.stringify([calculatingResult]));
            }
            // // var itemList = JSON.parse();
        } catch (error) {
            console.log(error)
        }
    };
    if (!loading) {
        console.log(calculatingResult)
        return (

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{ paddingTop: 25, flexDirection: "row", justifyContent: "space-between" }} >
                        <Text style={styles.title}>Timer </Text>
                        <Text style={styles.title}>{seconds}</Text>
                    </View>
                    {selectionTitle(`Q${questionCount}) ${quizData[questionCount].question}`)}
                    <View style={{ marginVertical: 10 }}></View>
                    {
                        quizData[questionCount].incorrectAnswers.map((e, index) =>
                            <TouchableOpacity key={index} onPress={() => { onPressAnswer(e) }} disabled={disabledOtionTab}>
                                <View style={{
                                    width: "100%",
                                    padding: 10, borderRadius: 5, marginVertical: 10,
                                    backgroundColor: getOptionTabColor(e)
                                }}
                                    lightColor="#eee"
                                    darkColor="rgba(255,255,255,0.1)" >
                                    <Text style={[styles.title, { fontSize: 14, fontWeight: "500" }]}>{`${index + 1}: ${e}`}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }

                    {(selectedAnswer !== null || quizData.length - 1 === questionCount) ? <TouchableOpacity onPress={async () => {
                        if (quizData.length - 1 === questionCount) {
                            await storeData()

                            // navigation.dispatch(CommonActions.reset({
                            //     index: 1, routes: [
                            //         {
                            //             name: Routes.RESULT,
                            //             params:calculatingResult
                            //         },
                            //     ]
                            // }));
                            navigation.pop();
                            //@ts-expect-error
                            navigation.navigate(Routes.RESULT, calculatingResult);
                        }
                        else {
                            setSelectedAnswer(null)
                            setDisabledOtionTab(false)
                            setSeconds(10)
                            setQuestionCount((prev) => prev + 1)
                        }

                    }} style={{ marginTop: 15 }}>
                        <View style={styles.btnContainer}
                            lightColor="#eee"
                            darkColor="rgba(255,255,255,0.1)" >
                            <Text style={[styles.title, { color: "#ffffff" }]}>{quizData.length - 1 === questionCount ? 'Finish' : 'Next'}</Text>
                        </View>
                    </TouchableOpacity> : null}
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
            <Text style={[styles.selectionTitle, , { fontSize: 14, }]}>{title}</Text>
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

    function getOptionTabColor(value: string) {
        if (selectedAnswer === null || selectedAnswer === undefined) {
            return "#eee";
        }
        else if (selectedAnswer === value && quizData[questionCount].correctAnswer === selectedAnswer) {
            return "#26c93f";
        }
        else if (quizData[questionCount].correctAnswer === value) {
            return "#26c93f";
        }
        else {
            return "#e32600";
        }
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

