import { Image, StyleSheet, Text, View } from 'react-native';
import IconButton from '../components/IconButton';

export default function HomeScreen({navigation}) {

  const switchScreenHandler = (screen) =>{
    navigation.navigate(screen)
  }


    return (
      <View style={styles.container}> 
        <View style={styles.logContainer}>
          <Image style={styles.logo} source={require('../assets/images/logo.png')} />
        </View>
        <View style={styles.categoryContainer}>
          <Text style={styles.subtitle}>Category</Text>
          <View style={styles.buttonsContainer}>
            <IconButton 
              title={'Food'} 
              icon={'food-fork-drink'} 
              bgColor={''} 
              iconColor={''}
              style={{marginRight:4}}
              onPress={switchScreenHandler}
            />
            <IconButton 
              title={'Clothes'} 
              icon={'tshirt-crew'} 
              bgColor={''} 
              iconColor={''} 
              style={{marginHorizontal:4}}  
              onPress={switchScreenHandler}
            />
            <IconButton 
              title={'Medicine'} 
              icon={'medical-bag'} 
              bgColor={''} 
              iconColor={''} 
              style={{marginHorizontal:4}}  
              onPress={switchScreenHandler}
            />
            <IconButton 
              title={'Ration'} 
              icon={'food-variant'} 
              bgColor={''} 
              iconColor={''} 
              style={{marginLeft:4}}
              onPress={switchScreenHandler}
            />
          </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingTop:48,
      paddingHorizontal:16,
      
      borderWidth:1,
      borderColor:'red',
    },
    logContainer:{
      alignItems:'center',

      borderWidth:1,
      borderColor:'red',
    },
    logo:{
      width:100,
      height:50,

      borderWidth:1,
      borderColor:'red',
    },
    categoryContainer:{

    },
    subtitle:{
      fontSize:18,
      fontWeight:'bold',
      marginVertical:8,

    },
    buttonsContainer:{
      flexDirection:'row'
    }
});