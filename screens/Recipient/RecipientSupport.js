import { Linking, Pressable, Text, View } from "react-native";
import ImprovInput from "../../components/ImprovInput";
import { useState } from "react";
import ColorPallete from "../../constants/ColorPallete";

export default function RecipientSupport() {

    const [email, setEmail]=useState('')
    const [subject, setSubject]=useState('')
    const [body, setBody]=useState('')

    const [emailError, setEmailError]=useState(false)
    const [subjectError, setSubjectError]=useState(false)
    const [bodyError, setBodyError]=useState(false)

    const emailHandler = (email) => {
        setEmail(email);
    }
    const subjectHandler = (subject) => {
        setSubject(subject);
    }
    const bodyHandler = (body) => {
        setBody(body);
    }


    const composeEmail = () => {
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);
        const mailtoURL = `mailto:zariya@support.com?subject=${encodedSubject}&body=${encodedBody}`;
        Linking.openURL(mailtoURL);
    };
  return (
    <View style={{padding:16, flex:1, backgroundColor:ColorPallete.screenBg}}>
        <ImprovInput
            tag={"Email"}
            value={email}
            placeholder={"abc@gmail.com"}
            onChange={emailHandler}
            inputMode={"email"}
            outerStyle={{marginBottom:16}}
            inputStyle={{borderColor:'black'}}
            error={emailError}
        />
        <ImprovInput
            tag={"Subject"}
            value={subject}
            placeholder={"Payment Issue"}
            onChange={subjectHandler}
            inputMode={"text"}
            outerStyle={{marginBottom:16}}
            inputStyle={{borderColor:'black'}}
            error={subjectError}
        />
        <ImprovInput
            tag={"Message"}
            value={body}
            placeholder={"..."}
            onChange={bodyHandler}
            inputMode={"text"}
            outerStyle={{marginBottom:16, flex:1}}
            inputStyle={{borderColor:'black', flex:1}}
            multiline={true}
            error={bodyError}
        />
        <View style={{alignItems:'flex-end'}}>
            <Pressable onPress={composeEmail} style={{backgroundColor:ColorPallete.mediumBlue, padding:16, paddingHorizontal:32, borderRadius:8}}>
                <Text style={{color:ColorPallete.screenBg}}>Send</Text>
            </Pressable>
        </View>

    </View>
  )
}
