import { StyleSheet, Text, View } from 'react-native';
import { UserSupport } from "../../dummy_data/dummy_data";

export default function SupportTextScreen(props) {


  //const selectedSupport = UserSupport.find(i=>i.id===route.params.id)

    return (
      <View style={styles.container}> 
            <View style={styles.innerContainer}>
              <View style={styles.topContainer}>
                <Text>YES</Text>
              </View>

            </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#bfc0c2',
        alignItems: 'center',
        justifyContent: 'center',

    },
    innerContainer:{
      backgroundColor:'white',
      height:'95%',
      width:'95%',
      borderRadius:10
    },
    topContainer:{
      // backgroundColor:'black',
      // height:'25%',
      // width:'100%',
      // borderRadius:10
    }
});