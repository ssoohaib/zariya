import { useContext } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import ColorPallete from "../../constants/ColorPallete";
import { unsubscribe } from "../../utilities/DonorApis";


export default function SubscriptionScreen() {
    const { currentUser, modifyCurrentUser, token } = useContext(AuthContext)

    const handleUnsubscribe = async (ngoId)=> {
        const newSubscribedNgos = currentUser.subscribedNgos.find(ngo => ngo.ngoId == ngoId)
        newSubscribedNgos.subscriptionStatus = 'In-Active'

        modifyCurrentUser({
            ...currentUser,
            subscribedNgos: [...currentUser.subscribedNgos]
        })

        const result = await unsubscribe(token, currentUser._id, ngoId)
    }

    const renderCard = (itemData)=>{

        return(
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.topLeft}>
                        <View>
                            <Text style={styles.title}>{itemData.item.ngoName}</Text>
                            <Text style={styles.subtitle}><Text style={styles.subsubtitle}>Rs. </Text>{itemData.item.amount}</Text>
                            {
                                itemData.item.causes.map((cause, index)=>{
                                    return(
                                        <Text key={index} style={[styles.subsubtitle, {marginVertical:2}]}>{cause}</Text>
                                    )
                                })
                            }    
                        </View>
                    </View>
                    <View>
                        <Text style={styles.title}>{itemData.item.duration}</Text>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.bottomLeft}>
                    {
                        itemData.item.subscriptionStatus=='Active' &&
                        <>
                            <Text style={styles.subsubtitle}>Renews on</Text>
                            <Text style={styles.subtitle}>10-12-2023</Text>
                        </>    
                    }
                    </View>
                    <View style={styles.bottomRight}>
                        <Text style={styles.status}>{itemData.item.subscriptionStatus}</Text>
                    </View>
                </View>
                {
                    itemData.item.subscriptionStatus=='Active' &&
                    <Pressable onPress={()=>handleUnsubscribe(itemData.item.ngoId)} style={{marginTop:8}}>
                        <Text style={{color:'red', fontSize:16, }}>Unsubscribe</Text>
                    </Pressable>
                }
            </View>
        )
    }

  return (
    <View style={{flex:1, backgroundColor:ColorPallete.screenBg, padding:16}}>
    {
        currentUser.subscribedNgos.length==0 ?
        <Text style={{color:ColorPallete.darkBlue, fontSize:18, fontWeight:'bold', textAlign:'center', marginTop:16}}>No Subscriptions</Text>
        :<FlatList
            data={currentUser.subscribedNgos}
            renderItem={renderCard}
            keyExtractor={(item)=>item._id}
        />
    }
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        // borderWidth:1,
        borderColor:ColorPallete.lightTextColor,
        borderRadius:16,
        padding:16,
        marginBottom:12,

        // backgroundColor:'#F5F5F5',
        backgroundColor:ColorPallete.fLightColor,
    },
    top:{
        flexDirection:'row',
        justifyContent:'space-between',
        // alignItems:'center',
        borderBottomWidth:.5,
        borderColor:ColorPallete.lightTextColor,
        paddingBottom:12,
        
        

    },
    topLeft:{
        flexDirection:'row',
        // justifyContent:'flex-start'
        alignItems:'flex-start'
        
    },
    topLeftIcon:{
        backgroundColor:ColorPallete.mediumBlue,
        padding:8,
        justifyContent:"center",
        alignItems:'center',
        marginRight:8,
        borderRadius:8,
    },
    topRight:{

    },
    bottom:{
        paddingTop:12,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

    },
    bottomLeft:{

    },
    bottomRight:{
        backgroundColor:ColorPallete.mediumBlue,
        padding:8,
        // paddingHorizontal:8,
        borderRadius:8,
    },
    title:{
        fontSize:16,
        fontWeight:'bold',
        marginBottom:4,
        color:ColorPallete.darkBlue,

    },
    subtitle:{
        fontWeight:'bold',
        color:ColorPallete.mediumBlue,
        fontSize:15,

    },
    subsubtitle:{
        color:ColorPallete.lightTextColor,
        fontSize:14,

    },
    status:{
        color:ColorPallete.screenBg,
        fontWeight:'bold',
        
    }

})