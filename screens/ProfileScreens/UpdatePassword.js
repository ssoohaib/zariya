import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function UpdatePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleSave = () => {
        if (newPassword !== confirmNewPassword) {
            setPasswordsMatch(false);
            return;
        }

        // Implement password update logic here
        console.log("Current Password:", currentPassword);
        console.log("New Password:", newPassword);
        console.log("Confirm New Password:", confirmNewPassword);
    };

    const handleCancel = () => {
        // Implement cancel logic here
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
                onChangeText={setNewPassword}
            />
            <TextInput
                style={[styles.input, !passwordsMatch && styles.errorInput]}
                placeholder="Confirm New Password"
                secureTextEntry={true}
                value={confirmNewPassword}
                onChangeText={(text) => {
                    setConfirmNewPassword(text);
                    setPasswordsMatch(text === newPassword);
                }}
            />
            {!passwordsMatch && <Text style={styles.errorText}>Passwords do not match</Text>}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
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
        backgroundColor: '#ff6961',
    },
    saveButton: {
        backgroundColor: '#77dd77',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
