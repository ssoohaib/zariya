import { Image, Pressable, StyleSheet, View } from 'react-native'

export default function ImageButton(props) {
  return (
    <View>
        <Pressable onPress={()=>props.onPress(props.screen)}>
            <View>
                <Image 
                    source={{uri:'https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbo-luii4yLWODrM9dmDXGhLjv1lm9NqRDZTDH5WQ0RxIQ_YCuhzNCsolCfb8OadEWRrvxedBSIXSBknwBF1nNdG__RXmzV0w=w1919-h910'}}
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