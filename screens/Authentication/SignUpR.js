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
import { AuthContext } from "../../context/AuthContext";

export default function SignUpR({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { AUTHCHECKENABLED } = useContext(AuthContext);

  const emailHandler = (email) => {
    setEmail(email);
  };

  const passwordHandler = (pass) => {
    setPassword(pass);
  };

  const validator = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(password);

    if (!isEmailValid) setEmailError(true);
    else setEmailError(false);
    if (!isPasswordValid) setPasswordError(true);
    else setPasswordError(false);

    return isEmailValid && isPasswordValid;
  };

  const switchScreen = async () => {
    if (AUTHCHECKENABLED && !validator()) {
      return;
    }
    navigation.navigate("SignUpRDetails", {
      email: email,
      password: password,
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
            source={{uri:'https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihZkVW9Zs8ryvd58g8AhjaPhzcXv3Q87nXnBgXyp2u8PJq4usCm8hUES2BVkz0K08pi7d62Formr7a_FpFUAxZU97GooJ5WVrjM=w1919-h910'}}
          />
        </View>

        <View style={styles.bottom}>
          <Pressable>
            <View style={styles.btnContainer}>
              <Image
                style={styles.btnImg}
                source={{uri:'https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihZvwPBjT1NaLlgi3GcG_rvOmRjAc1ejW45GSwrYxSNhPwL3vRO6QAVuJPxgTOeAic0gj95nbtMxp0i9ljvaDaLVD1SkxXfCL6s=w1919-h910-rw-v1'}}
              />
              <Text style={styles.btnTitle}>Sign up with Google</Text>
            </View>
          </Pressable>
          <Pressable>
            <View style={styles.btnContainer}>
              <Image
                style={[styles.btnImg, {}]}
                source={{uri:'https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbhb6PKcYWblRnWkKRAdjBU31S1xfWvfoVufZxMHqLiRjDxXxK9tL9ZhX9PDOlyzTM8Jay0T4el_0khEACmEDuUjrxF_qu0lA=w1919-h910-rw-v1'}}
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
              error={emailError}
            />
            <ImprovInput
              tag={"Password"}
              value={password}
              onChange={passwordHandler}
              secureTextEntry={true}
              inputStyle={styles.inputStyle}
              error={passwordError}
              msg={"Must contain:\n-8 characters\n-1 number\n-1 !@#$%^&*."}
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
                  Next
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
    marginTop: 8,
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
