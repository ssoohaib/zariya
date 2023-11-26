import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import IconButton from '../components/IconButton';
import NgoCard from '../components/NgoCard';
import colorPallete from '../constants/ColorPallete'

export default function HomeScreen({navigation}) {

  const switchScreenHandler = (screen) =>{
    navigation.navigate(screen)
  }

  const ngoScreenHandler = (title)=>{
    navigation.navigate('NgoDetails',{
      title:title
    })
  }


    return (
      <ScrollView style={styles.container}> 
        <View style={styles.logContainer}>
          <Image style={styles.logo} source={require('../assets/images/logo-black.png')} />
        </View>
        <View style={styles.categoryContainer}>
          <Text style={styles.subtitle}>Category</Text>
          <View style={styles.buttonsContainer}>
            <IconButton 
              title={'Food'} 
              icon={'food-fork-drink'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{marginRight:4}}
              onPress={switchScreenHandler}
              screen={'Food'}
            />
            <IconButton 
              title={'Clothes'} 
              icon={'tshirt-crew'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{marginHorizontal:4}}  
              onPress={switchScreenHandler}
              screen={'Clothes'}
            />
            <IconButton 
              title={'Medicine'} 
              icon={'medical-bag'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{marginHorizontal:4}}  
              onPress={switchScreenHandler}
              screen={'Medicine'}
            />
            <IconButton 
              title={'Ration'} 
              icon={'food-variant'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue}
              style={{marginLeft:4}}
              onPress={switchScreenHandler}
              screen={'Ration'}
            />
          </View>
        </View>
        <View style={styles.ngoContainer}>
          <View style={styles.ngoSearchContainer}>
            <Text style={styles.subtitle}>Donate</Text>
            <IconButton 
              // title={'Ration'} 
              icon={'magnify'} 
              bgColor={colorPallete.lightBlue} 
              iconColor={colorPallete.darkBlue} 
              style={{flex:0}}
              onPress={switchScreenHandler}
              screen={'Search'}
            />
          </View>
          <View style={styles.ngoListContainer}>
            <NgoCard 
              title={'Alkhidmat Foundation'}
              onPress={ngoScreenHandler}
              desc={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda autem ducimus ipsum at, voluptatibus eum repellendus voluptatum, est iure eveniet esse! Unde dicta dolorum adipisci quasi quis odit temporibus. Amet!'}
              imageUrl={'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
            />
            <NgoCard 
              title={'Alkhidmat Foundationn'}
              onPress={ngoScreenHandler}
              desc={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda autem ducimus ipsum at, voluptatibus eum repellendus voluptatum, est iure eveniet esse! Unde dicta dolorum adipisci quasi quis odit temporibus. Amet!'}
              imageUrl={'https://images.unsplash.com/photo-1530490125459-847a6d437825?q=80&w=1785&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
            />
            <NgoCard 
              title={'Alkhidmat Foundation'}
              onPress={ngoScreenHandler}
              desc={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda autem ducimus ipsum at, voluptatibus eum repellendus voluptatum, est iure eveniet esse! Unde dicta dolorum adipisci quasi quis odit temporibus. Amet!'}
              imageUrl={'https://images.unsplash.com/photo-1636202339022-7d67f7447e3a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
            />
          </View>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingTop:48,
      paddingHorizontal:16,
      
      // borderWidth:1,
      // borderColor:'red',
    },
    logContainer:{
      alignItems:'center',

    },
    logo:{
      width:100,
      height:55,

    },
    categoryContainer:{

    },
    subtitle:{
      fontSize:18,
      fontWeight:'bold',
      marginTop:8,
      marginBottom:16,

    },
    buttonsContainer:{
      flexDirection:'row',

    },
    ngoContainer:{
      
    },
    ngoSearchContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginVertical:8,

    },
    ngoListContainer:{

    }
});