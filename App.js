import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';

// Hardcoded credentials
const userName = 'adminme';
const Password = 'Password123!';

export default function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [switchValue, setSwitchValue] = useState(false);
    const [passwordValid, setPasswordValid] = useState(true);
    const [usernameLength, setUsernameLength] = useState(0);
    const [loginStatus, setLoginStatus] = useState('');
    const [themeEmoji, setThemeEmoji] = useState('🐵'); // Default to light theme emoji

    useEffect(() => {
        // Validate password
        const validatePassword = () => {
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumber = /\d/.test(password);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

            setPasswordValid(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar);
        };

        validatePassword();
    }, [password]);

    useEffect(() => {
        // Update username length
        setUsernameLength(username.length);
    }, [username]);

    useEffect(() => {
        // Update theme emoji based on theme
        setThemeEmoji(switchValue ? '🙈' : '🐵');
    }, [switchValue]);

    const handleLogin = () => {
        if (username === userName && password === Password) {
            setLoginStatus('🎉 Login Successful!');
        } else {
            setLoginStatus('🚫 Login Failed. Check your username or password.');
        }
    };

    return (
        <SafeAreaView style={[styles.safeArea, switchValue ? styles.darkTheme : styles.lightTheme]}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <Image
                        source={switchValue ? require('./assets/logo-white.png') : require('./assets/logo-black.png')}
                        style={styles.image}
                    />
                    <Text style={switchValue ? styles.titleBlack : styles.title}>Sign In to X</Text>

                    <TextInput
                        value={username}
                        placeholder='Username or Email'
                        onChangeText={newValue => setUsername(newValue)}
                        style={styles.textInput}
                    />
                    {usernameLength < 6 && <Text style={styles.warning}>Username must be at least 6 characters</Text>}
                    {usernameLength > 20 && <Text style={styles.warning}>Username must be no more than 20 characters</Text>}
                    <TextInput
                        value={password}
                        placeholder='Password'
                        onChangeText={newValue => setPassword(newValue)}
                        style={styles.textInput}
                        secureTextEntry={true}
                    />
                    {!passwordValid && <Text style={styles.warning}>Password must include uppercase, lowercase, number, and special character</Text>}
                    {loginStatus !== '' && <Text style={styles.loginStatus}>{loginStatus}</Text>}
                    <TouchableOpacity onPress={handleLogin} style={switchValue ? styles.buttonWhite : styles.button }>
                        <Text style={switchValue ? styles.buttonTextBlack : styles.buttonText }>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSwitchValue(!switchValue)} style={switchValue ? styles.buttonWhite : styles.button}>
                        <Text style={switchValue ? styles.buttonTextBlack : styles.buttonText}>{themeEmoji}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <StatusBar style="auto" backgroundColor={switchValue ? 'black' : 'white'} translucent={true} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    lightTheme: {
        backgroundColor: 'white',
    },
    darkTheme: {
        backgroundColor: 'black',
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
    },
    container: {
        width: '100%',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontStyle: 'Roman',
        fontSize: 32,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: 'black',
        marginBottom: 20,
    },
    titleBlack: {
        fontStyle: 'Roman',
        fontSize: 32,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: 'white',
        marginBottom: 20,
    },
    image: {
        width: 70,
        height: 70,
        marginBottom: 20,
    },
    textInput: {
        width: '100%',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 16,
        backgroundColor: 'lightgrey',
        marginBottom: 20,
    },
    button: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 16,
        backgroundColor: 'black',
        marginBottom: 20,
    },
        buttonWhite: {
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 16,
            backgroundColor: 'white',
            marginBottom: 20,
        },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },

    buttonTextBlack: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
    warning: {
        color: 'red',
        marginBottom: 10,
    },
    loginStatus: {
        color: 'green',
        marginBottom: 10,
    },
});
