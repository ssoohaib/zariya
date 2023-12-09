import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ColorPallete from '../constants/ColorPallete';

function Congratulations() {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="party-popper" size={100} color={ColorPallete.darkBlue} />
      <Text style={styles.congratulationsText}>Congratulations!</Text>
      <Text style={styles.messageText}>You have accepted the request</Text>
    </View>
  );
};

export default Congratulations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  congratulationsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: ColorPallete.darkBlue,
    marginTop: 20,
  },
  messageText: {
    fontSize: 18,
    color: ColorPallete.darkBlue,
    marginTop: 10,
    textAlign: 'center',
  },
});


