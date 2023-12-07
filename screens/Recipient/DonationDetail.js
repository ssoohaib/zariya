import { View, Text, StyleSheet, Image } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import AcceptDonationBtn from '../../components/AcceptDonationBtn';
import ColorPallete from '../../constants/ColorPallete';
import { useNavigation } from '@react-navigation/native';

function DonationDetail() {

  const navigation = useNavigation();
  const switchScreenHandler = (screen) => {
    navigation.navigate(screen)
  }

  const image = [require('../../assets/images/biryani.png')]
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../../assets/images/biryani.png')} />
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.data}>800g</Text>
        <Text style={styles.data}>7per</Text>
        <Text style={styles.data}>24hr</Text>
      </View>
      <View style={styles.descContainer}>
        <Text style={styles.desc}>Weighs</Text>
        <Text style={styles.desc}>Serving</Text>
        <Text style={styles.desc}>Expiry</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemName}>Chicken Biryani</Text>
        <Text style={styles.itemDesc}>Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
          an unknown printer took a galley of type and scrambled it to make a type specimen book. It
          has survived not only five centuries, but also the leap into electronic typesetting, remaining
          essentially unchanged. </Text>
      </View>
      <View style={styles.btn}>
        <AcceptDonationBtn onPress={() => donationdetail(props.id)}>Accept</AcceptDonationBtn>

      </View>
    </View>
  )
}

export default DonationDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  image: {
    height: 300,
    width: 300,
    resizeMode: 'contain',
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 40,
  },
  data: {
    fontWeight: 'bold',
    color: ColorPallete.darkBlue,
    textAlign: 'center',
    fontSize: 20,
  },
  descContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  desc: {
    fontWeight: '800',
    fontSize: 15,
    textAlign: 'center',
    color: '#ED986B',
  },
  textContainer: {
    marginTop: 30,
    marginLeft: 16,
    marginRight: 16,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 24,
    color: ColorPallete.darkBlue
  },
  itemDesc: {
    fontWeight: '300',
    fontSize: 14,
    marginTop: 10,
    color: ColorPallete.darkBlue,
  },
  btn: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 30,
  }
});