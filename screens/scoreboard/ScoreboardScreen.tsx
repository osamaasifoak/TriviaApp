import { CommonActions, useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from '../../components/Themed';
import { Table, TableWrapper, Cell, Row, Rows, Col, Cols } from 'react-native-table-component';
export default function ScoreboardScreen() {
    var tableHead = ['Date', 'Duration', 'Correct', 'Incorrect'];
    var tableData = [
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd']
    ]
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ paddingTop: 25, marginBottom: 10 }} >
                    <Text style={styles.title}>Score Board</Text>
                </View>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9', }}>
                    <Row data={tableHead} style={styles.header} textStyle={styles.headerText} />
                    <Rows data={tableData}  textStyle={styles.tableText} />
                </Table>

            </View>
        </SafeAreaView>
    );

    function selectionTitle(title: String) {
        return <View style={{ paddingTop: 10 }} >
            <Text style={styles.selectionTitle}>{title}</Text>
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
    },
    header: {
        height: 50,
        backgroundColor: '#242b38',
        borderRadius: 5,

    },
    headerText: {
        textAlign: 'center',
        fontWeight: '100',
        color: 'white',
    },
    tableText: {
        textAlign: 'center',
        fontWeight: '100',
        color: 'black',
    },
});

