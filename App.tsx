import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListWork from './screens/ListWork';
import DetailJob from './screens/DetailJob';
import AddJob from './screens/AddJob';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="All" component={ListWork} />
                <Stack.Screen name="Add" component={AddJob} />
                <Stack.Screen name="Detail" component={DetailJob} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
