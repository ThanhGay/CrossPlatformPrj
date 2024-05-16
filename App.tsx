import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllStudent from './screens/AllStudent';
import AddStudent from './screens/AddStudent';
import DetailStudent from './screens/DetailStudent';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="All" component={AllStudent} />
                <Stack.Screen name="Add" component={AddStudent} />
                <Stack.Screen name="Detail" component={DetailStudent} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
