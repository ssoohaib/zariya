import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import ColorPallete from '../constants/ColorPallete'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {toggleFav} from '../utilities/DonorApis'


export default function NgoCard(props) {
    const {currentUser, modifyCurrentUser, token} = useContext(AuthContext);

    const handleToggleFav = async ()=>{

        const isFav=currentUser.favouriteNgos.find(id=>id===props.id)
        if (isFav){
            const newFavList=currentUser.favouriteNgos.filter(id=>id!==props.id)
            modifyCurrentUser({
                ...currentUser,
                favouriteNgos:newFavList
            })
            
        }else{
            modifyCurrentUser({
                ...currentUser,
                favouriteNgos:[...currentUser.favouriteNgos, props.id]
            })
        }
        const result = await toggleFav(token, currentUser._id, props.id)

    }

  return (
    <View style={[styles.container, props.containerStyle]}>
        <Pressable onPress={()=>props.onPress(props.id)}>
            <View style={styles.innerContainer}>
                <Image style={[styles.image, props.imageStyle]} source={{uri:props.imageUrl}}/>
                <View style={styles.infoContainer}>
                    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Pressable onPress={handleToggleFav} style={[styles.favContainer, props.imageStyle && {top:-150}]}>
                        {
                            props.isFav === true ? 
                            <MaterialCommunityIcons name={'star'} size={16} color={ColorPallete.mediumBlue} />
                            :<MaterialCommunityIcons name={'star-outline'} size={16} color={ColorPallete.mediumBlue} />
                        }
                        </Pressable>
                    </View>
                    {props.descShow && <Text style={styles.desc}>{props.desc.slice(0,props.descLength)}...</Text>}
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
        // overflow:'hidden',
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
        alignItems:'center',
        borderRadius:100,

    },
    favContainer:{
        backgroundColor:ColorPallete.screenBg,
        borderRadius:100,
        overflow:'hidden',
        padding:4,
        position:'relative',
        top:-200
        // position:'absolute',
        // top:-270,
        // left:330,
        // top:-275,
        // left:292,
        
    }
})
