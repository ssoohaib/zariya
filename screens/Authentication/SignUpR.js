import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useContext, useState } from "react";
import ColorPallete from "../../constants/ColorPallete";
import ImprovInput from "../../components/ImprovInput";
import { MaterialIcons } from "@expo/vector-icons";
import ImagePickerComp from "../../components/ImagePickerComp";
import { signUp } from "../../utilities/AuthFetches";
import { AuthContext } from "../../context/AuthContext";

export default function SignUpR({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setCurrentUserAndToken } = useContext(AuthContext);

  const emailHandler = (email) => {
    setEmail(email);
  };

  const passwordHandler = (pass) => {
    setPassword(pass);
  };

  const switchScreen = async () => {
    navigation.navigate('SignUpRDetails',{
      email:email,
      password:password
    });
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
              <Text style={styles.btnTitle}>Sign up with Google</Text>
            </View>
          </Pressable>
          <Pressable>
            <View style={styles.btnContainer}>
              <Image
                style={[styles.btnImg, {}]}
                source={require("../../assets/images/apple-logo.png")}
              />
              <Text style={styles.btnTitle}>Sign up with Apple</Text>
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
            />
            <ImprovInput
              tag={"Password"}
              value={password}
              onChange={passwordHandler}
              secureTextEntry={true}
              inputStyle={styles.inputStyle}
            />

            <Pressable onPress={switchScreen}>
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
                  Sign Up
                </Text>
              </View>
            </Pressable>

            <Pressable onPress={() => navigation.goBack()}>
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
                Already have an Account?{" "}
                <Text style={{ color: ColorPallete.mediumBlue }}>Sign In.</Text>
              </Text>
            </Pressable>
            <View style={{ height: 40 }}></View>
          </View>
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
  title: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  imageContainerr: {
    zIndex: -9,
    marginBottom: 16,
  },
});
