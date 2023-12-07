import { View, Text, StyleSheet } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import IconButton from '../components/IconButton';

function DonationDetail() {
  return (
    <View>
      <SliderBox>
        <Image />
      </SliderBox>
      <View>
        <Text>800g</Text>
        <Text>7per</Text>
        <Text>24hr</Text>
      </View>
      <View>
        <Text>Weighs</Text>
        <Text>Serving</Text>
        <Text>Expiry</Text>
      </View>
      <View>
        <Text>Chicken Biryani</Text>
        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
          an unknown printer took a galley of type and scrambled it to make a type
          specimen book.</Text>
      </View>
      <IconButton
        title={'Accept'}
        bgColor={ColorPallete.mediumBlue}
        iconColor={ColorPallete.screenBg}
        style={{ flex: 1, height: '100%' }}
        textStyle={{ fontSize: 15 }}
      />
    </View>
  )
}

export default DonationDetail;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    marginBottom: 5,
    backgroundColor: 'white',
    width: '100%',
  },
  dataContainer: {
    flexDirection: 'row',
  },
  descContainer: {
    flexDirection: 'row',
  },
    

});