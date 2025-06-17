import { View, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import ChartScreen from './src/screen/ChartScreen';


export default function App() {
  return (
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <View>
            <ChartScreen/>
          </View>
        </SafeAreaView>
  );
}
