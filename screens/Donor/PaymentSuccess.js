import { Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import ColorPallete from '../../constants/ColorPallete';

export default function PaymentSuccess({route}) {
    const data=route.params
    console.log(route.params)

  return (
    <View style={styles.container}>
        {/* <Text style={{fontSize:24, fontWeight:'bold'}}>Zariya</Text> */}

        <View style={{borderWidth:0, width:'80%', padding:16, borderRadius:8}}>
            <View style={{alignItems:'center', marginBottom:16}}>
                <View style={{backgroundColor:ColorPallete.mediumBlue, borderRadius:'100%', padding:20}}>
                    <MaterialIcons name="check" size={36} color={ColorPallete.screenBg} />
                </View>
            </View>
            <Text style={{textAlign:'center', fontWeight:'bold', fontSize:28}}>Rs. {data.amount}</Text>
            <Text style={{textAlign:'center', fontWeight:'bold', fontSize:20, marginTop:4}}>{data.userName} <Text style={{fontWeight:'normal'}}>to</Text>{'\n'}{data.ngoName}</Text>

            <View style={{marginTop:16}}>
                <View>
                    <Text style={styles.tag}>Causes</Text>
                    <View style={{flexDirection:'row'}}>
                        {
                            data.causes.map(cause=>{
                                return <Text style={styles.text}>{cause} </Text>
                            })
                        }
                    </View>
                </View>
                <View>
                    <Text style={styles.tag}>Type</Text>
                    <Text style={styles.text}>{data.paymentType}</Text>
                </View>
                {
                    data.paymentType==='Subscription' &&
                    <View>
                        <Text style={styles.tag}>Duration</Text>
                        <Text style={styles.text}>{data.duration}</Text>
                    </View>
                }
                <View>
                    <Text style={styles.tag}>Date & Time (PKT)</Text>
                    <Text style={styles.text}>06 May 2024, 11:51 AM</Text>
                </View>
                <View>
                    <Text style={styles.tag}>Reference Number</Text>
                    <Text style={styles.text}>Zariya-09873</Text>
                </View>
            </View>
        </View>

        {/* <Pressable style={{backgroundColor:ColorPallete.mediumBlue, padding:16, width:'80%', borderRadius:8, marginTop:16}}>
            <Text style={{color:ColorPallete.screenBg, textAlign:'center', fontSize:16}}>Back to Home</Text>
        </Pressable> */}

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:ColorPallete.screenBg,
    },
    tag:{
        marginTop:8
    },
    text:{
        fontWeight:'bold'
    }
})
