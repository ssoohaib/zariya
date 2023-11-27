import { Image, Pressable, StyleSheet, View } from 'react-native'

export default function ImageButton(props) {
  return (
    <View>
        <Pressable onPress={()=>props.onPress(props.screen)}>
            <View>
                <Image 
                    source={require('../assets/images/user.png')}
                    style={[
                        styles.default,
                        props.style
                    ]}
                />
            </View>
        </Pressable>
    </View>
  )
}

const styles=StyleSheet.create({
    default:{
        height:50,
        width:50,
        borderRadius:16,
    }
})