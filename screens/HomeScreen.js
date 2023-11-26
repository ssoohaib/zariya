import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({navigation}) {
    return (
      <View style={styles.container}> 
        <Button title='Med' onPress={()=>navigation.navigate('MedicineDonation')} />
        <Button title='Food' onPress={()=>navigation.navigate('FoodDonation')} />
        <Button title='Clo' onPress={()=>navigation.navigate('ClothesDonation')} />
        <Button title='Rat' onPress={()=>navigation.navigate('RationDonation')} />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});