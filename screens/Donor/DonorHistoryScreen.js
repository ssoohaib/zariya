import { StyleSheet, Text, View } from 'react-native';
import NotFound from '../../components/NotFound';

export default function DonorHistoryScreen({navigation}) {

  const history=[]

  const switchScreen = (screen)=>{
    navigation.navigate(screen)
  }

    return (
      <>
        {
          history.length < 1 ?
          <NotFound
            title={'No History Found'}
            desc={"Make some donations to see your history. All your donations will arrive here."}
            btnTitle={'Back to Home'}
            btnFunctions={switchScreen}
            screen={"Home"}
            btnTitleStyle={{fontSize:15,fontWeight:'bold'}}
          />
          :
          <View>

          </View>
        }
      </>

      
    );
}

const styles = StyleSheet.create({
    
});