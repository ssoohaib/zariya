import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import { useContext, useState } from "react";
import ColorPallete from "../../constants/ColorPallete";
import ImprovInput from "../../components/ImprovInput";
import { MaterialIcons } from "@expo/vector-icons";
import ImagePickerComp from "../../components/ImagePickerComp";
import { signIn, signUp, getAllNgos } from "../../utilities/AuthFetches";
import { AuthContext } from "../../context/AuthContext";
import { SelectList } from 'react-native-dropdown-select-list'
import MyIp from "../../ip";	


export default function SignUpRDetails({ navigation, route }) {
  const [orgTitle, setOrgTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [cause, setCause] = useState("");
  const [causes, setCauses] = useState([]);
  const [logo, setLogo] = useState("");
  const [causeImages, setCauseImages] = useState([]);
  const [verificationImages, setVerificationImages] = useState([]);

  const [orgTitleError, setOrgTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [causesError, setCausesError] = useState(false);
  const [causeImagesError, setCauseImagesError] = useState(false);
  const [verificationImagesError, setVerificationImagesError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { AUTHCHECKENABLED, setCurrentUserAndToken, setAllDonorsHandler, setAllRecipientsHandler } = useContext(AuthContext);

  const orgTitleHandler = (title) => {
    setOrgTitle(title);
  };

  const descriptionHandler = (desc) => {
    setDescription(desc);
  };

  const causeHandler = (cause) => {
    setCause(cause);
  };

const addCauseHandler = () => {
    if (causes.length + 1 <= 10 && cause.length > 0 && !causes.includes(cause)) {
        setCausesError(false);
        setCauses((prev) => [...prev, cause]);
        setCause("");
    }
};

  const removeCauseHandler = (index) => {
    setCauses((prev) => prev.filter((i, count) => count != index));
  };

  const validator = () => {
    const isOrgTitleValid = orgTitle.length > 0;
    const isDescriptionValid = description.length > 0;
    const isCausesValid = causes.length > 0;
    const isCauseImagesValid = causeImages.length > 0;
    const isVerificationImagesValid = verificationImages.length > 0;

    if (!isOrgTitleValid) setOrgTitleError(true);
    else setOrgTitleError(false);
    if (!isDescriptionValid) setDescriptionError(true);
    else setDescriptionError(false);
    if (!isCausesValid) setCausesError(true);
    else setCausesError(false);
    if (!isCauseImagesValid) setCauseImagesError(true);
    else setCauseImagesError(false);
    if (!isVerificationImagesValid) setVerificationImagesError(true);
    else setVerificationImagesError(false);

    return isOrgTitleValid && isDescriptionValid && isCausesValid;
  }

  const handleLoading = () => {
    setIsLoading(!isLoading);
  }

  const switchScreen = async () => {
    // console.log(':::::::::::::',causeImages, verificationImages, logo)
    // return
    if (AUTHCHECKENABLED && !validator()) {
      return;
    }

    let payload = {
      userType: "recipient",
      email: route.params.email,
      password: route.params.password,
      title: orgTitle,
      description: description,
      city: city,
      causes: causes,
      logo: logo,
      verificationImages: verificationImages,
      causesImages: causeImages,
      recipientApproval:true
    }

    const formData = new FormData();
    formData.append('payload', JSON.stringify(payload));    
    
    causeImages.forEach((image, index) => {
      formData.append('images', {
        uri: image,
        // type: image.type,
        name: 'cause-' + route.params.email + index + '.jpg',
      });
    });
    verificationImages.forEach((image, index) => {
      formData.append('images', {
        uri: image,
        // type: image.type,
        name: 'verify-' + route.params.email + index + '.jpg',
      });
    });
    formData.append('images', {
      uri: logo[0],
      // type: logo.type,
      name: 'logo-' + route.params.email + '.jpg',
    });

    handleLoading();
    // console.log('----',formData.getAll('images'))

    // return
    // Signup---------------------------------------------------------
    await fetch(`http://${MyIp}:5000/signup`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error uploading image:', error));

    // ---------------------------------------------------------------
    navigation.navigate("OnHold");
    // const result = await signIn(route.params.email, route.params.password);
    // setCurrentUserAndToken(result.user, result.token);
    // console.log(`[SignIn] -> ${result.user.email} - ${result.user.id}`)

    // const allDonors = await getAllNgos(result.token, result.user.id);
    // setAllRecipientsHandler(allDonors);
    // setAllDonorsHandler(allDonors);
    // console.log(`[SignIn] -> ${allDonors.length} donors fetched`)

    // handleLoading();
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
          <View>
            <ImprovInput
              tag={"Title"}
              value={orgTitle}
              onChange={orgTitleHandler}
              liveLength={true}
              maxLength={50}
              inputStyle={styles.inputStyle}
              error={orgTitleError}
            />
            <ImprovInput
              tag={"Description"}
              value={description}
              onChange={descriptionHandler}
              liveLength={true}
              maxLength={500}
              multiline={true}
              inputStyle={[styles.inputStyle, { paddingVertical: 40 }]}
              error={descriptionError}
            />
            <View style={{marginTop:8, marginBottom:16}}>
              <SelectList 
                setSelected={(val) => setCity(val)} 
                data={['Multan', 'Lahore','Islamabad']} 
                save="value"
                search={false}
                placeholder="Select City"
              />
            </View>            
            <View style={styles.causesContainer}>
              <View style={styles.causesTop}>
                <ImprovInput
                  tag={"Cause"}
                  value={cause}
                  onChange={causeHandler}
                  inputStyle={styles.inputStyle}
                  outerStyle={{ flex: 1, marginRight: 8 }}
                />
                <Pressable
                  onPress={addCauseHandler}
                  style={{ flex: 0.2, position: "relative", top: 4 }}
                >
                  <View
                    style={[
                      styles.btnContainer,
                      {
                        paddingVertical: 17,
                      },
                    ]}
                  >
                    <MaterialIcons
                      name="add-circle-outline"
                      size={24}
                      color={ColorPallete.mediumBlue}
                    />
                  </View>
                </Pressable>
              </View>
              <View
                style={[
                  styles.causesListContainer,
                  !causes.length && {
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  causesError && { borderWidth: 1, borderColor: "red" },
                ]}
              >
                {!causes.length ? (
                  <>
                    <Text style={[styles.subtitle, { marginBottom: 0 }]}>
                      No causes added.
                    </Text>
                    <Text
                      style={{
                        marginTop: 4,
                        fontWeight: "bold",
                        color: ColorPallete.lightTextColor,
                      }}
                    >
                      (Max 10)
                    </Text>
                  </>
                ) : (
                  causes.map((i, count) => (
                    <View
                      key={count}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ marginRight: 8 }}>{count + 1}</Text>
                        <Text style={{ fontWeight: "bold" }}>{i}</Text>
                      </View>
                      <Pressable
                        onPress={() => removeCauseHandler(count)}
                        style={{
                          padding: 4,
                          backgroundColor: ColorPallete.mediumBlue,
                          borderRadius: 8,
                        }}
                      >
                        <Text
                          style={{
                            color: ColorPallete.screenBg,
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                        >
                          <MaterialIcons
                            name="remove-circle-outline"
                            size={24}
                            color={ColorPallete.screenBg}
                          />
                        </Text>
                      </Pressable>
                    </View>
                  ))
                )}
              </View>
            </View>

            <ImagePickerComp
              title={"Logo"}
              images={logo}
              setter={setLogo}
              imageLimit={1}
              minImages={1}
              // error={verificationImagesError}
            />
            <ImagePickerComp
              title={"Verification Documents"}
              images={verificationImages}
              setter={setVerificationImages}
              imageLimit={2}
              minImages={1}
              error={verificationImagesError}
            />
            <ImagePickerComp
              title={"Causes Images"}
              images={causeImages}
              setter={setCauseImages}
              imageLimit={3}
              minImages={1}
              error={causeImagesError}
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
                {isLoading && <ActivityIndicator size="small" color={'white'} />}
              </View>
            </Pressable>

            <View style={{ height: 70 }}></View>
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
