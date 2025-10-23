import { Formik } from 'formik';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../../assets/styles/theme'
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { CREATE_USER } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
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

const signUpSchema = yup.object().shape({
    username: yup
        .string()
        .min(5, 'Username must be between 5 and 30 characters long')
        .max(30, 'Username must be between 5 and 30 characters long')
        .required('Username is required'),

    password: yup
        .string()
        .min(5, 'Password must be between 5 and 50 characters long')
        .max(50, 'Password must be between 5 and 50 characters long')
        .required('Password is required'),
    passwordConfirm: yup.string()
        .required('Password confirmation is required')
        .test('match', 'Passwords do not match', function (value) {
            return value === this.parent.password;
        })
})

const SignUp = () => {
    const [createUser] = useMutation(CREATE_USER)
    const [signIn] = useSignIn()
    const nav = useNavigate()

    const onSubmit = async (values, { resetForm }) => {
        const { username, password } = values;
        try {
            await createUser({ variables: { username, password } })
            await signIn({ username, password })
            resetForm()
            nav('/')
        } catch (e) {
            console.log(e);
        }
    };

    return (

        <Formik
            validationSchema={signUpSchema}
            validateOnMount

            initialValues={{ username: '', password: '', passwordConfirm: '' }}

            onSubmit={onSubmit}>

            {({ handleChange, handleSubmit, handleBlur, values, errors, touched, isValid }) => (
                /* USER */
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

                    {/* PASSWORD */}
                    <TextInput
                        style={[styles.formInput, touched.password && errors.password && styles.errorInput]}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder='Password'
                        textContentType='password'
                        secureTextEntry
                        value={values.password}
                        returnKeyType='next'
                        onChangeText={handleChange('password')}
                        onSubmitEditing={handleSubmit}
                        onBlur={handleBlur('password')}
                    />
                    {/* Password error */}
                    {touched.password && errors.password ? <Text style={styles.errorText} fontSize='subheading'>{errors.password}</Text> : null}

                    {/* PASSWORD CONFIRMATION*/}
                    <TextInput
                        style={[styles.formInput, touched.passwordConfirm && errors.passwordConfirm && styles.errorInput]}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder='Password confirmation'
                        textContentType='password'
                        secureTextEntry
                        value={values.passwordConfirm}
                        returnKeyType='done'
                        onChangeText={handleChange('passwordConfirm')}
                        onSubmitEditing={handleSubmit}
                        onBlur={handleBlur('passwordConfirm')}
                    />
                    {/* Password error */}
                    {touched.passwordConfirm && errors.passwordConfirm ? <Text style={styles.errorText} fontSize='subheading'>{errors.passwordConfirm}</Text> : null}

                    {/* Button */}
                    <Pressable style={styles.formBtn} onPress={handleSubmit} disabled={!isValid}>
                        <Text color='light' fontWeight='bold' fontSize='subheading'>Sign Up</Text>
                    </Pressable>

                </View>
            )}
        </Formik >
    )




};

export default SignUp;