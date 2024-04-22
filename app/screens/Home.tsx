import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';

type RootStackParamList = {
    Home: undefined;
    Login: undefined;
};
type HomeScreenProps = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRoute = RouteProp<RootStackParamList, 'Home'>;

type HomeProps = {
    navigation: HomeScreenProps;
    route: HomeScreenProps;
};

function Home({navigation}: HomeProps): React.JSX.Element {
    return (
        <SafeAreaView>
            <Text>Este es Home</Text>
            <Button title="Navegar" onPress={() => navigation.navigate('Home')} />
        </SafeAreaView>
    );
}

export default Home;