import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import ColorPallete from '../../constants/ColorPallete';
import { updatePassword } from '../../utilities/RecipientFetches'; 
import { AuthContext } from "../../context/AuthContext";
import { useContext } from 'react';


export default function UpdatePassword() {
    const { currentUser } = useContext(AuthContext); 
    const [password, setPassword] = useState(''); 
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleSave = async () => {
        if (newPassword !== confirmNewPassword) {
            setPasswordsMatch(false);
            return;
        }
    
        console.log("Password:", password);
    
        let payload = {
            userType: "recipient",
            id: currentUser._id,
            password: password,
        };
    
        try {
            await updatePassword({ ...payload });
            Alert.alert(
                "Success",
                "Password updated successfully",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            setCurrentPassword('');
                            setNewPassword('');
                            setConfirmNewPassword('');
                            setPasswordsMatch(true);
                        }
                    }
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error("Error updating password:", error);
            Alert.alert(
                "Error",
                "Failed to update password. Please try again later.",
                [
                    {
                        text: "OK",
                        onPress: () => {}
                    }
                ],
                { cancelable: false }
            );
        }
    };
    

    const handleCancel = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setPasswordsMatch(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Current Password"
                secureTextEntry={true}
                value={currentPassword}
                onChangeText={setCurrentPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry={true}
                value={newPassword}
                onChangeText={(text) => {
                    setNewPassword(text);
                    setPassword(text); 
                }}
            />
            <TextInput
                style={[styles.input, !passwordsMatch && styles.errorInput]}
                placeholder="Confirm New Password"
                secureTextEntry={true}
                value={confirmNewPassword}
                onChangeText={(text) => {
                    setConfirmNewPassword(text);
                    setPassword(text);
                    setPasswordsMatch(text === newPassword);
                }}
            />
            {!passwordsMatch && <Text style={styles.errorText}>Passwords do not match</Text>}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                    <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        color: ColorPallete.mediumBlue,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    button: {
        width: '45%',
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        borderColor: ColorPallete.mediumBlue,
        borderWidth: 1,
    },
    cancelButtonText: {
        color: ColorPallete.mediumBlue,
    },
    saveButton: {
        backgroundColor: ColorPallete.mediumBlue,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
