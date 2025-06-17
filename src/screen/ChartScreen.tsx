import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';



const ChartScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View><Text>React native app</Text></View>
      </ScrollView>
    </View>
  );
};

export default ChartScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9F9F9',
    },
    scrollContent: {
      padding: 16,
      paddingBottom: 32,
    },
    section: {
      marginBottom: 24,
    },
  });