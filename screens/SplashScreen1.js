import { View, StyleSheet, Image } from 'react-native';

function SplashScreen1() {
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/images/logo-black.png')} />
    </View>
  )
}

export default SplashScreen1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 250,
        width: 250,
        marginTop: 250,
        marginLeft: 60,
    },
});