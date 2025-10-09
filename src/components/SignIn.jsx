import { Formik } from 'formik';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../../assets/styles/theme'

const styles = StyleSheet.create({
    formContainer: {
        padding: 20,
        backgroundColor: theme.colors.textLight
    },
    formInput: {
        backgroundColor: theme.colors.textLight,
        borderRadius: 8,
        padding: 15,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: theme.colors.textSecondary,
        fontSize: 16,
        color: theme.colors.primary,
        width: '100%',
        letterSpacing: 2,
    },
    formBtn: {
        backgroundColor: theme.colors.primary,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },

});
const SignIn = () => {
    return (

        <Formik
            initialValues={{ username: '', password: '' }}

            onSubmit={(values, { resetForm }) => {
                console.log(values);
                resetForm();
            }}>

            {({ handleChange, handleSubmit, values }) => (
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.formInput}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder='Username'
                        textContentType='username'
                        value={values.username}
                        returnKeyType='next'
                        onChangeText={handleChange('username')}
                    />
                    <TextInput
                        style={styles.formInput}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder='Password'
                        textContentType='password'
                        secureTextEntry
                        value={values.password}
                        returnKeyType='done'
                        onChangeText={handleChange('password')}
                        onSubmitEditing={handleSubmit}
                    />
                    <Pressable style={styles.formBtn} onPress={handleSubmit}>
                        <Text color='light' fontWeight='bold' fontSize='subheading'>Sign In</Text>
                    </Pressable>
                </View>
            )}
        </Formik >
    )




};

export default SignIn;