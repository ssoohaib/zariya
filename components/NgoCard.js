import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import IconButton from './IconButton'
import ColorPallete from '../constants/ColorPallete'

export default function NgoCard(props) {

  return (
    <View style={styles.container}>
        <Pressable onPress={()=>props.onPress(props.id)}>
            <View style={styles.innerContainer}>
                <Image style={styles.image} source={{uri:props.imageUrl}}/>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.desc}>{props.desc.slice(0,68)}...</Text>
                    <View style={styles.btnContainer}>
                        <IconButton 
                            icon={'star'} 
                            // bgColor={ColorPallete.lightBlue} 
                            iconColor={ColorPallete.mediumBlue}
                            style={{flex:0,marginRight:8,borderWidth:1,borderColor:ColorPallete.mediumBlue}}
                        />
                        <IconButton 
                            title={'Donate'} 
                            bgColor={ColorPallete.mediumBlue} 
                            iconColor={ColorPallete.screenBg}
                            style={{flex:1,height:'100%'}}
                            textStyle={{fontSize:18}}
                        />
                    </View>
                </View>
            </View>
        </Pressable>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        // backgroundColor:'white',
        borderRadius:8,
        overflow:'hidden',
        marginBottom:16,     

        // borderColor:'#8b8888',
        // borderWidth:1,
           
        
    },
    innerContainer:{

    },
    image:{
        width:'100%',
        height:200,
        borderRadius:16
    },
    infoContainer:{
        paddingHorizontal:8,
        paddingBottom:20,

        // borderWidth:1,
        // borderColor:'red',
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        marginTop:12,

    },
    desc:{
        lineHeight:18,
        marginTop:12,
        
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:12,

    }
})
