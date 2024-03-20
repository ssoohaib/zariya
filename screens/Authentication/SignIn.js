import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useContext,  useState } from "react";
import ColorPallete from "../../constants/ColorPallete";
import ImprovInput from "../../components/ImprovInput";
import AuthenticationModal from "../../components/AuthenticationModal";
import { signIn, getAllNgos } from "../../utilities/AuthFetches";
import { AuthContext } from "../../context/AuthContext";

export default function SignIn({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError]=useState(false)
  const [passwordError, setPasswordError]=useState(false)

  const [isLoading, setIsLoading] = useState(false);

  const { AUTHCHECKENABLED, setCurrentUserAndToken, setAllDonorsHandler, setAllRecipientsHandler } = useContext(AuthContext);

  const modeHandler = (mode) => {
    toggleModal();
    if (mode==='DONOR')
      navigation.navigate('SignUp')
    else if (mode==='RECIPIENT')
      navigation.navigate('SignUpR')
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const emailHandler = (email) => {
    setEmail(email);
  };

  const passwordHandler = (pass) => {
    setPassword(pass);
  };

  const handleLoading = () => {
    setIsLoading(!isLoading);
  }

  const validator = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 8;

    if (!isEmailValid)
      setEmailError(true);
    else
      setEmailError(false);
    if (!isPasswordValid) 
      setPasswordError(true);
    else
      setPasswordError(false);

    return isEmailValid && isPasswordValid;
  };
  

  const switchScreen = async () => {
    if (AUTHCHECKENABLED && !validator()) {
      return;
    }
    handleLoading();
    const result = await signIn(email, password);
    setCurrentUserAndToken(result.user, result.token);
    console.log(`[SignIn] -> ${result.user.email} - ${result.user.id}`)

    const allDonors = await getAllNgos(result.token, result.user.id);
    setAllRecipientsHandler(allDonors);
    setAllDonorsHandler(allDonors);
    console.log(`[SignIn] -> ${allDonors.length} donors fetched`)

    handleLoading();
  };
  

  return (
    <ScrollView
      style={{
        paddingTop: 48,
        backgroundColor: ColorPallete.mediumBlue,
      }}
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/images/logo-white.png")}
          />
        </View>

        <View style={styles.bottom}>
          <Pressable>
            <View style={styles.btnContainer}>
              <Image
                style={styles.btnImg}
                source={require("../../assets/images/google-logo.png")}
              />
              <Text style={styles.btnTitle}>Sign in with Google</Text>
            </View>
          </Pressable>

          <Pressable>
            <View style={styles.btnContainer}>
              <Image
                style={[styles.btnImg, {}]}
                source={require("../../assets/images/apple-logo.png")}
              />
              <Text style={styles.btnTitle}>Sign in with Apple</Text>
            </View>
          </Pressable>

          <View style={styles.divider}>
            <View style={styles.dividerLeft}></View>
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.dividerRight}></View>
          </View>

          <View>
            <ImprovInput
              tag={"Email"}
              value={email}
              onChange={emailHandler}
              inputMode={"email"}
              inputStyle={styles.inputStyle}
              error={emailError}
            />
            <ImprovInput
              tag={"Password"}
              value={password}
              onChange={passwordHandler}
              secureTextEntry={true}
              inputStyle={styles.inputStyle}
              error={passwordError}
            />
            <Pressable>
              <Text
                style={[
                  styles.dividerText,
                  { marginHorizontal: 0, marginTop: 8, marginBottom: 16 },
                ]}
              >
                Forgot password?
              </Text>
            </Pressable>

            <Pressable onPress={switchScreen} style={""}>
              <View
                style={[
                  styles.btnContainer,
                  {
                    backgroundColor: ColorPallete.mediumBlue,
                    paddingVertical: 20,
                  },
                ]}
              >
                <Text
                  style={[styles.btnTitle, { color: ColorPallete.screenBg }]}
                >
                  Sign In{' '}
                </Text>
                {isLoading && <ActivityIndicator size="small" color={'white'} />}
              </View>
            </Pressable>

            <Pressable onPress={toggleModal}>
              <Text
                style={[
                  styles.dividerText,
                  {
                    marginHorizontal: 0,
                    marginTop: 8,
                    marginBottom: 32,
                    textAlign: "center",
                  },
                ]}
              >
                Don't have an Account?{" "}
                <Text style={{ color: ColorPallete.mediumBlue }}>
                  Register.
                </Text>
              </Text>
            </Pressable>
          </View>
          <AuthenticationModal
            modeHandler={modeHandler}
            isModalVisible={isModalVisible}
            toggleModal={toggleModal}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPallete.mediumBlue,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: ColorPallete.mediumBlue,
    marginBottom: 8,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 150,
    width: 160,
  },
  bottom: {
    paddingHorizontal: 16,
    paddingTop: 32,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: ColorPallete.screenBg,
  },
  inputStyle: {
    borderRadius: 8,
    paddingVertical: Platform.OS == "android" ? 12 : 20,
    marginBottom: 8,
  },
  btnContainer: {
    backgroundColor: ColorPallete.screenBgTwo,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 8,
  },
  btnImg: {
    height: 20,
    width: 20,
    margin: 8,
  },
  btnTitle: {
    fontWeight: "bold",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  dividerLeft: {
    flex: 1,
    maxHeight: 1,
    borderColor: ColorPallete.lightTextColor,
    borderWidth: 1,
  },
  dividerText: {
    marginHorizontal: 8,
    color: ColorPallete.lightTextColor,
    fontWeight: "bold",
  },
  dividerRight: {
    flex: 1,
    maxHeight: 2,
    borderColor: ColorPallete.lightTextColor,
    borderWidth: 1,
  },
  causesContainer: {
    marginBottom: 16,
  },
  causesTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  causesListContainer: {
    minHeight: 100,
    marginTop: 8,
    backgroundColor: ColorPallete.lightBlue,
    padding: 8,
    borderRadius: 8,
  },
  title: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  imageContainerr: {
    zIndex: -9,
    marginBottom: 16,
  },
  imagesContainer: {
    flexDirection: "row",
  },
  singleImageContainer: {
    height: 82,
    width: 82,
    borderWidth: 1,
    borderStyle: "dashed",
    marginRight: 8,

    alignItems: "center",
    justifyContent: "center",
  },
  singleImage: {
    height: 80,
    width: 80,
  },
});
