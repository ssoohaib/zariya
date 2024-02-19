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
import { signUp } from "../../utilities/AuthFetches";
import { AuthContext } from "../../context/AuthContext";

export default function SigningScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { setCurrentUserAndToken } = useContext(AuthContext);

  const emailHandler = (email) => {
    setEmail(email);
  };

  const passwordHandler = (pass) => {
    setPassword(pass);
  };

  const firstNameHandler = (fn) => {
    setFirstName(fn);
  };

  const lastNameHandler = (ln) => {
    setLastName(ln);
  };

  const switchScreen = async () => {
    let payload = {
      userType: "donor",
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    signUp({ ...payload });
    navigation.goBack();

    // navigation.navigate(screen)
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
            <View style={{ flexDirection: "row" }}>
              <ImprovInput
                tag={"First Name"}
                value={firstName}
                onChange={firstNameHandler}
                inputStyle={[styles.inputStyle]}
                outerStyle={{ flex: 1, marginRight: 8 }}
              />
              <ImprovInput
                tag={"Last Name"}
                value={lastName}
                onChange={lastNameHandler}
                inputStyle={[styles.inputStyle]}
                outerStyle={{ flex: 1 }}
              />
            </View>

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
