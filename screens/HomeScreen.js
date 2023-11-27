import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import IconButton from '../components/IconButton';
import NgoCard from '../components/NgoCard';
import colorPallete from '../constants/ColorPallete'
import ImageButton from '../components/ImageButton';
import InputBar from '../components/InputBar';

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
        <View style={styles.headerContainer}>
          <View style={styles.headerUpper}>
            <Image style={styles.logo} source={require('../assets/images/logo-white.png')} />
            <View style={styles.userContainer}>
              <View style={styles.userTextContainer}>
                <Text style={styles.userGreet}>Hi,</Text>
                <Text style={styles.userName}>Ligma</Text>
              </View>
              <ImageButton
                style={styles.userImage}
                onPress={switchScreenHandler}
                screen={'Profile'}
              />
            </View>
          </View>
          <View style={styles.lowerHeader}>
            <InputBar 
              placeHolder={'Search NGOs, Causes'}
              bgColor={colorPallete.mediumBlue}
              icon={'magnify'}
              iconColor={'white'}

            />
          </View>
        </View>
        <View style={styles.categoryContainer}>
          <Text style={styles.subtitle}>Donate</Text>
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
            <Text style={styles.subtitle}>Browse</Text>
            <IconButton 
              // icon={'magnify'} 
              title={'See All'}
              // bgColor={colorPallete.screenBgTwo} 
              iconColor={'#8b8888'} 
              style={{flex:0}}
              onPress={switchScreenHandler}
              screen={'NgosList'}
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
      // paddingTop:48,
      // paddingHorizontal:16,
      backgroundColor:'white'
      
      // borderWidth:1,
      // borderColor:'red',
    },
    headerContainer:{
      // paddingVertical:48,
      paddingTop:48,
      paddingBottom:32,
      paddingHorizontal:16,

      // flexDirection:'row',
      // justifyContent:'space-between',
      // alignItems:'center',
      backgroundColor:colorPallete.mediumBlue,
      borderBottomStartRadius:16,
      borderBottomEndRadius:16,

      // borderWidth:1,
      // borderColor:'red',
    },
    headerUpper:{
      flexDirection:'row',
      width:'100%',
      justifyContent:'space-between',
      alignItems:'center',

      // borderWidth:1,
      // borderColor:'red',
    },
    logo:{
      width:70,
      height:'100%',

      // borderWidth:1,
      // borderColor:'red',

    },
    userContainer:{
      flexDirection:"row",

      // borderWidth:1,
      // borderColor:'red',

    },
    userTextContainer:{
      marginRight:8,
      justifyContent:'center',

      // borderWidth:1,
      // borderColor:'red',
    },
    userGreet:{
      color:colorPallete.screenBg,
      textAlign:'right',
      // width:'100%',

      // borderWidth:1,
      // borderColor:'red',

    },
    userName:{
      fontSize:16,
      fontWeight:'bold',
      color:colorPallete.screenBg,

      // borderWidth:1,
      // borderColor:'red',

    },
    userImage:{
      height:40,
      width:40,
      borderRadius:20,
      borderWidth:4,
      borderColor:colorPallete.darkBlue,

    },
    lowerHeader:{
      marginTop:16,

      // borderWidth:1,
      // borderColor:'red',

    },
    categoryContainer:{
      paddingHorizontal:16,


    },
    subtitle:{
      fontSize:18,
      fontWeight:'bold',
      // marginTop:8,
      // marginBottom:16,
      marginVertical:16,
    },
    buttonsContainer:{
      flexDirection:'row',

    },
    ngoContainer:{
      paddingHorizontal:16,
      
    },
    ngoSearchContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      // marginVertical:8,

    },
    ngoListContainer:{

    }
});