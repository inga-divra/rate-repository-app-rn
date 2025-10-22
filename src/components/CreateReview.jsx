import { Formik } from 'formik';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../../assets/styles/theme'
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

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

const reviewSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Repository owner name is required'),
    repositoryName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .min(0, 'Rating between 0 and 100')
        .max(100, 'Rating between 0 and 100')
        .required('Rating is required')
        .typeError('Only numbers are allowed'),
    text: yup
        .string()
        .optional()
})

const CreateReview = () => {
    const [createReview] = useMutation(CREATE_REVIEW)
    const nav = useNavigate()

    const onSubmit = async (values, { resetForm }) => {
        const { ownerName, repositoryName, rating, text } = values;

        try {
            const { data } = await createReview({
                variables: { ownerName: ownerName, repositoryName: repositoryName, rating: Number(rating), text: text }
            });
            const repoId = data?.createReview?.repositoryId;
            resetForm()
            if (repoId) {
                nav(`/repository/${repoId}`)
            }

        } catch (e) {
            console.log(e);
        }
    };

    return (

        <Formik
            validationSchema={reviewSchema}
            validateOnMount

            initialValues={{ ownerName: '', repositoryName: '', rating: '', text: '' }}

            onSubmit={onSubmit}>

            {({ handleChange, handleSubmit, handleBlur, values, errors, touched, isValid }) => (

                <View style={styles.formContainer}>

                    {/* Owner name */}
                    <TextInput
                        style={[styles.formInput, touched.ownerName && errors.ownerName && styles.errorInput]}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder='Repository owner name'
                        value={values.ownerName}
                        returnKeyType='next'
                        onChangeText={handleChange('ownerName')}
                        onBlur={handleBlur('ownerName')}
                    />
                    {/* owner name error */}
                    {touched.ownerName && errors.ownerName ? <Text style={styles.errorText} fontSize='subheading'>{errors.ownerName}</Text> : null}

                    {/* Repo name */}
                    <TextInput
                        style={[styles.formInput, touched.repositoryName && errors.repositoryName && styles.errorInput]}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder='Repository name'
                        value={values.repositoryName}
                        returnKeyType='next'
                        onChangeText={handleChange('repositoryName')}
                        onBlur={handleBlur('repositoryName')}
                    />
                    {/* Repo error */}
                    {touched.repositoryName && errors.repositoryName ? <Text style={styles.errorText} fontSize='subheading'>{errors.repositoryName}</Text> : null}

                    {/* Rating */}
                    <TextInput
                        style={[styles.formInput, touched.rating && errors.rating && styles.errorInput]}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder='Rating between 0 and 100'
                        value={values.rating}
                        keyboardType='numeric'
                        inputMode='numeric'
                        returnKeyType='done'
                        onChangeText={handleChange('rating')}
                        onBlur={handleBlur('rating')}
                        onSubmitEditing={handleSubmit}
                    />
                    {/* Rating error */}
                    {touched.rating && errors.rating ? <Text style={styles.errorText} fontSize='subheading'>{errors.rating}</Text> : null}

                    {/* Review text */}
                    <TextInput
                        style={[styles.formInput, touched.text && errors.text && styles.errorInput]}
                        placeholder='Review'
                        value={values.text}
                        onChangeText={handleChange('text')}
                        onBlur={handleBlur('text')}
                        textAlignVertical='top'

                    />

                    {/* Button */}
                    <Pressable style={styles.formBtn} onPress={handleSubmit} disabled={!isValid /* || loading */}>
                        <Text color='light' fontWeight='bold' fontSize='subheading'>Create a review</Text>
                    </Pressable>

                </View>
            )}
        </Formik >
    )

};

export default CreateReview;