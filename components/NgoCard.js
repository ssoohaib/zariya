import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import IconButton from './IconButton'
import ColorPallete from '../constants/ColorPallete'

export default function NgoCard(props) {

  return (
    <View style={styles.container}>
        <Pressable onPress={()=>props.onPress(props.title)}>
            <View style={styles.innerContainer}>
                <Image style={styles.image} source={{uri:props.imageUrl}}/>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.desc}>{props.desc.slice(0,131)}...</Text>
                    <View style={styles.btnContainer}>
                        <IconButton 
                            icon={'star'} 
                            bgColor={ColorPallete.lightBlue} 
                            iconColor={'black'}
                            style={{flex:0,marginRight:8,}}
                        />
                        <IconButton 
                            title={'Donate'} 
                            bgColor={ColorPallete.lightBlue} 
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
        backgroundColor:'white',
        borderRadius:8,
        overflow:'hidden',
        marginBottom:16,     
           
        
    },
    innerContainer:{

    },
    image:{
        width:'100%',
        height:200,
        borderRadius:8
    },
    infoContainer:{
        paddingHorizontal:16,
        paddingBottom:16,

        // borderWidth:1,
        // borderColor:'red',
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        marginTop:16,

    },
    desc:{
        lineHeight:18,
        marginTop:16,
        
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:16,

    }
})
