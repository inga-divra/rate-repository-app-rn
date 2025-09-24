import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>I love coding, coffee and cats! 💻☕😸</Text>
      <StatusBar style='auto' />
      <View style={styles.imgContainer}>
        <Image
          source={require('./assets/ai-cat.png')}
          style={styles.image}
          resizeMode='contain'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  imgContainer: {
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: 200,
  },
});
