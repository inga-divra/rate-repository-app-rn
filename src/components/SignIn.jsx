import { Formik } from 'formik';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../../assets/styles/theme'
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

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
    errorInput: {
        borderColor: '#d73a4a'
    },
    errorText: {
        color: '#d73a4a',
        marginBottom: 12
    }
});

const signInSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required'),
})

const SignIn = () => {
    const [signIn] = useSignIn()

    const onSubmit = async (values, { resetForm }) => {
        const { username, password } = values;

        try {
            const { data } = await signIn({ username, password });
            console.log(data);
            resetForm()
        } catch (e) {
            console.log(e);
        }
    };

    return (

        <Formik
            validationSchema={signInSchema}
            validateOnMount

            initialValues={{ username: '', password: '' }}

            onSubmit={onSubmit}>

            {({ handleChange, handleSubmit, handleBlur, values, errors, touched, isValid }) => (

                <View style={styles.formContainer}>
                    <TextInput
                        style={[styles.formInput, touched.username && errors.username && styles.errorInput]}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder='Username'
                        textContentType='username'
                        value={values.username}
                        returnKeyType='next'
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                    />

                    {/* Username error */}
                    {touched.username && errors.username ? <Text style={styles.errorText} fontSize='subheading'>{errors.username}</Text> : null}

                    <TextInput
                        style={[styles.formInput, touched.password && errors.password && styles.errorInput]}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder='Password'
                        textContentType='password'
                        secureTextEntry
                        value={values.password}
                        returnKeyType='done'
                        onChangeText={handleChange('password')}
                        onSubmitEditing={handleSubmit}
                        onBlur={handleBlur('password')}
                    />

                    {/* Password error */}
                    {touched.password && errors.password ? <Text style={styles.errorText} fontSize='subheading'>{errors.password}</Text> : null}

                    {/* Button */}
                    <Pressable style={styles.formBtn} onPress={handleSubmit} disabled={!isValid}>
                        <Text color='light' fontWeight='bold' fontSize='subheading'>Sign In</Text>
                    </Pressable>

                </View>
            )}
        </Formik >
    )




};

export default SignIn;