import { CommonActions, useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import Routes from '../constants/Routes';
import { HomeScreenNavigationProp, RootStackParamList } from '../types';

export default function SplashScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    useEffect(() => {
        setTimeout(() => {
            navigation.dispatch(CommonActions.reset({
                index: 0, routes: [
                    {
                        name: Routes.HOME
                    },
                ]
            }));
        }, 1000);
    })
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trivia App</Text>
        </View>
    );
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
});
