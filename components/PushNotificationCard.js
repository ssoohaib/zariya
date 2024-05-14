import { Text, View } from 'react-native'
import ColorPallete from '../constants/ColorPallete'

export default function PushNotificationCard(props) {
  return (
    <View style={{position:'absolute', top:40, left:6, width:'96%', borderRadius:8, backgroundColor:'black', paddingHorizontal:16, paddingTop:20}}>
        <Text style={{color:ColorPallete.screenBg, fontWeight:'bold', marginBottom:4}}>{props.title}</Text>
        <Text style={{color:ColorPallete.screenBg}}>{props.body}</Text>
        <View style={{alignItems:'center', marginTop:12, paddingBottom:12}}>
        <View style={{width:50, height:4, borderRadius:100, backgroundColor:ColorPallete.screenBg}}></View>
        </View>
    </View>
  )
}
