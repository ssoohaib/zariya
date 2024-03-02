import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import IconButton from './IconButton'
import ColorPallete from '../constants/ColorPallete'

export default function NgoCard(props) {

  return (
    <View style={[styles.container, props.containerStyle]}>
        <Pressable onPress={()=>props.onPress(props.id)}>
            <View style={styles.innerContainer}>
                <Image style={[styles.image, props.imageStyle]} source={{uri:props.imageUrl}}/>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.desc}>{props.desc.slice(0,props.descLength)}...</Text>
                    {
                        !props.imageStyle &&
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
                                style={{flex:1,}}
                                textStyle={{fontSize:18}}
                            />
                        </View>
                    }
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
        paddingBottom:8,

        // borderWidth:1,
        // borderColor:'red',
    },
    title:{
        fontSize:16,
        fontWeight:'bold',
        marginTop:12,

    },
    desc:{
        lineHeight:18,
        marginTop:8,
        fontSize:14,
        
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:12,

    }
})
