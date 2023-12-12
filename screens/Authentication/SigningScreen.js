import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import ColorPallete from "../../constants/ColorPallete";
import ImprovInput from "../../components/ImprovInput";
import AuthenticationModal from "../../components/AuthenticationModal"
import { MaterialIcons } from '@expo/vector-icons';
import ImagePickerComp from "../../components/ImagePickerComp";
import * as ImagePicker from 'expo-image-picker';


export default function SigningScreen({navigation}) {
    const [mode,setMode]=useState('SignIn')

    const [isModalVisible, setModalVisible] = useState(false);

    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    
    const [firstName, setFirstName]=useState('')
    const [lastName, setLastName]=useState('')
    
    const [orgTitle, setOrgTitle]=useState('')
    const [description, setDescription]=useState('')
    const [cause, setCause]=useState('')
    const [causes, setCauses]=useState([])
    const [causeImages, setCauseImages]=useState([])
    const [verificationImages, setVerificationImages]=useState([])

    const modeHandler = (mode)=>{
        setMode(mode)
        toggleModal()
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const emailHandler = (email)=>{
        setEmail(email)
    }

    const passwordHandler = (pass)=>{
        setPassword(pass)
    }

    const firstNameHandler = (fn)=>{
        setFirstName(fn)
    }

    const lastNameHandler = (ln)=>{
        setLastName(ln)
    }

    const orgTitleHandler = (title)=>{
        setOrgTitle(title)
    }

    const descriptionHandler = (desc)=>{
        setDescription(desc)
    }

    const causeHandler = (cause)=>{
        setCause(cause)
    }

    const addCauseHandler = ()=>{
        if (causes.length+1<=10){
            setCauses(prev=>[...prev,cause])
            setCause('')
        }
    }

    const removeCauseHandler = (index) =>{
        setCauses(prev=>prev.filter((i, count)=>count!=index))
    }

    const switchScreen = (screen)=>{
        console.log(screen)
        navigation.navigate(screen)
    }

    const pickImage = async (forImage) => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
            if (forImage=='Verification Images'){
                setVerificationImages(prev=>[...prev,result.assets[0].uri])
            }else{
                setCauseImages(prev=>[...prev,result.assets[0].uri])
            }
        }
    };


  return (
    <ScrollView 
        style={{
            paddingTop:48, 
            backgroundColor:ColorPallete.mediumBlue,
        }} 
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{
            flexGrow:1,
        }}
    >

        <View style={styles.container}>

            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../../assets/images/logo-white.png')} />
            </View>

            <View style={styles.bottom}>
                {
                    mode != 'Org' &&
                    <>
                        <Pressable>
                            <View style={styles.btnContainer}>
                                <Image style={styles.btnImg} source={require('../../assets/images/google-logo.png')} />
                                {
                                    mode=='SignIn'?
                                    <Text style={styles.btnTitle}>Sign in with Google</Text>
                                    :<Text style={styles.btnTitle}>Sign up with Google</Text>
                                }
                            </View>
                        </Pressable>
                        <Pressable>
                            <View style={styles.btnContainer}>
                                <Image style={[styles.btnImg, {}]} source={require('../../assets/images/apple-logo.png')} />
                                {
                                    mode=='SignIn'?
                                    <Text style={styles.btnTitle}>Sign in with Apple</Text>
                                    :<Text style={styles.btnTitle}>Sign up with Apple</Text>
                                }
                            </View>
                        </Pressable>

                        <View style={styles.divider}>
                            <View style={styles.dividerLeft}></View>
                            <Text style={styles.dividerText}>Or continue with</Text>
                            <View style={styles.dividerRight}></View>
                        </View>
                    </>
                }

                <View>
                    {
                        mode == 'SignUp' &&
                        <View style={{flexDirection:'row'}}>
                            <ImprovInput
                                tag={'First Name'}
                                value={firstName}
                                onChange={firstNameHandler}
                                inputStyle={[styles.inputStyle]}
                                outerStyle={{flex:1, marginRight:8,}}
                            />
                            <ImprovInput
                                tag={'Last Name'}
                                value={lastName}
                                onChange={lastNameHandler}
                                inputStyle={[styles.inputStyle]}
                                outerStyle={{flex:1}}
                            />
                        </View>
                    }

                    <ImprovInput
                        tag={'Email'}
                        value={email}
                        onChange={emailHandler}
                        inputMode={'email'}
                        inputStyle={styles.inputStyle}
                    />
                    <ImprovInput
                        tag={'Password'}
                        value={password}
                        onChange={passwordHandler}
                        secureTextEntry={true}
                        inputStyle={styles.inputStyle}
                    />

                    {
                        mode == "SignIn" &&
                        <Pressable onPress={()=>switchScreen('ForgotPassword')}>
                            <Text style={[styles.dividerText,{marginHorizontal:0, marginTop:8, marginBottom:16}]}>Forgot password?</Text>
                        </Pressable>
                    }

                    {
                        mode == "Org" &&
                        <>
                            <View style={styles.divider}>
                                <View style={styles.dividerLeft}></View>
                                <Text style={styles.dividerText}>Fill following</Text>
                                <View style={styles.dividerRight}></View>
                            </View>
                            <ImprovInput
                                tag={'Title'}
                                value={orgTitle}
                                onChange={orgTitleHandler}
                                liveLength={true}
                                maxLength={50}
                                inputStyle={styles.inputStyle}
                            />
                            <ImprovInput
                                tag={'Description'}
                                value={description}
                                onChange={descriptionHandler}
                                liveLength={true}
                                maxLength={500}
                                multiline={true}
                                inputStyle={[styles.inputStyle,{paddingVertical:40}]}
                            />
                            <View style={styles.causesContainer}>
                                <View style={styles.causesTop}>
                                    <ImprovInput
                                        tag={'Cause'}
                                        value={cause}
                                        onChange={causeHandler}
                                        maxLength={20}
                                        inputStyle={styles.inputStyle}
                                        outerStyle={{flex:1, marginRight:8,}}
                                    />
                                    <Pressable onPress={addCauseHandler} style={{flex:.2,position:'relative',top:4}}>
                                        <View style={[styles.btnContainer, { backgroundColor:ColorPallete.mediumBlue, paddingVertical:20}]}>
                                            <MaterialIcons name="add-circle-outline" size={24} color={ColorPallete.screenBg} />
                                        </View>
                                    </Pressable>
                                </View>
                                <View style={[styles.causesListContainer, !causes.length && {alignItems:"center", justifyContent:'center'}]}>
                                    {
                                        !causes.length ?
                                        <>
                                            <Text style={[styles.subtitle, {marginBottom:0}]}>No causes added.</Text>
                                            <Text style={{ marginTop:4, fontWeight:'bold', color:ColorPallete.lightTextColor}}>(Max 10)</Text>
                                        </>
                                        :
                                        causes.map((i, count)=>(
                                            <View key={count} style={{flexDirection:'row', justifyContent:'space-between', marginBottom:4}}>
                                                <View style={{flexDirection:'row'}}>
                                                    <Text style={{marginRight:8}}>{count+1}</Text>
                                                    <Text style={{fontWeight:'bold'}}>{i}</Text>
                                                </View>
                                                <Pressable onPress={()=>removeCauseHandler(count)} style={{padding:4, backgroundColor:ColorPallete.mediumBlue, borderRadius:8,}}>
                                                    <Text style={{color:ColorPallete.screenBg, fontSize:12, fontWeight:'bold'}}>Remove</Text>
                                                </Pressable>
                                            </View>
                                        ))
                                    }
                                </View>
                            </View>

                            <ImagePickerComp
                                title={'Verification Documents'}
                                images={verificationImages}
                                setter={setVerificationImages}
                                imageLimit={2}
                            />
                            <ImagePickerComp
                                title={'Causes Images'}
                                images={causeImages}
                                setter={setCauseImages}
                                imageLimit={3}
                            />
                        </>
                    }

                    <Pressable onPress={mode!="SignIn" ? ()=>switchScreen('Verification'):null } style={mode !='SignIn' && {marginTop:8}}>
                        <View style={[styles.btnContainer, { backgroundColor:ColorPallete.mediumBlue, paddingVertical:20}]}>
                            {
                                mode == 'SignIn' ?
                                <Text style={[styles.btnTitle, {color:ColorPallete.screenBg}]}>Sign In</Text>
                                :<Text style={[styles.btnTitle, {color:ColorPallete.screenBg}]}>Sign Up</Text>
                            }
                        </View>
                    </Pressable>

                    <Pressable onPress={ mode=='SignUp' || mode=='Org'?  ()=>setMode('SignIn'):toggleModal}>
                        {
                            mode == 'SignIn' ?
                            <Text style={[styles.dividerText,{marginHorizontal:0, marginTop:8, marginBottom:32, textAlign:'center'}]}>
                                Don't have an Account? <Text style={{color:ColorPallete.mediumBlue}}>Register.</Text>
                            </Text>
                            :
                            <Text style={[styles.dividerText,{marginHorizontal:0, marginTop:8, marginBottom:32, textAlign:'center'}]}>
                                Already have an Account? <Text style={{color:ColorPallete.mediumBlue}}>Sign In.</Text>
                            </Text>
                        }
                    </Pressable>
                </View>
                {
                    mode == "Org" &&
                    <View style={{height:48}}></View>
                }
                <AuthenticationModal 
                    modeHandler={modeHandler}
                    isModalVisible={isModalVisible} 
                    toggleModal={toggleModal} 
                />    
            </View>   
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:ColorPallete.mediumBlue,      
    },
    subtitle:{
        fontSize:16,
        fontWeight:'bold',
        color:ColorPallete.mediumBlue,
        marginBottom:8,
    },
    imageContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:"center",
        
    },
    image:{
        height:150,
        width:160
    },
    bottom:{
        paddingHorizontal:16,
        paddingTop:32,
        borderTopLeftRadius:16,
        borderTopRightRadius:16,
        backgroundColor:ColorPallete.screenBg,

    },
    inputStyle:{
        borderRadius:8, 
        paddingVertical: Platform.OS =="android"? 12:20, 
        marginBottom:8
    },
    btnContainer:{
        backgroundColor:ColorPallete.screenBgTwo,
        paddingVertical:12,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'center',
        borderRadius:8,
        marginBottom:8,
        
    },
    btnImg:{
        height:20,
        width:20,
        margin:8,

    },
    btnTitle:{
        fontWeight:'bold',
        
    },
    divider:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:16,
        
    },
    dividerLeft:{
        flex:1,
        maxHeight:1,
        borderColor:ColorPallete.lightTextColor,
        borderWidth:1
    },
    dividerText:{
        marginHorizontal:8,
        color:ColorPallete.lightTextColor,
        fontWeight:'bold'
    },  
    dividerRight:{
        flex:1,
        maxHeight:2,
        borderColor:ColorPallete.lightTextColor,
        borderWidth:1

    },
    causesContainer:{
        marginBottom:16, 

    },
    causesTop:{
        flexDirection:'row',
        alignItems:'center',
        
    },
    causesListContainer:{
        minHeight:100,
        marginTop:8,
        backgroundColor:ColorPallete.lightBlue,
        padding:8,
        borderRadius:8,

    },
    title:{
        marginBottom:8,
        fontWeight:'bold',

    },
    imageContainerr:{
        zIndex:-9,
        marginBottom:16,

    },
    imagesContainer:{
        flexDirection:'row',
    },
    singleImageContainer:{
        height:82,
        width:82,
        borderWidth:1,
        borderStyle:'dashed',
        marginRight:8,

        alignItems:'center',
        justifyContent:"center"
    },
    singleImage:{
        height:80,
        width:80,
        
    },
})
