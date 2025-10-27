import { View, StyleSheet, Pressable } from 'react-native'
import Text from './Text'
import theme from '../../assets/styles/theme'
import { format } from "date-fns";


const styles = StyleSheet.create({
    reviewContainer: {
        backgroundColor: 'white',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    reviewInfoContainer: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16

    },
    separator: {
        height: 10,
    },
    ratingNum: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ratingNumText: {
        color: theme.colors.primary,
    },
    ratingInfo: {
        flex: 1
    },
    formatDate: {
        marginBottom: 8
    },
    btnContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center'
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.colors.error,
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginHorizontal: 6,
        borderRadius: 6
    }
});


const SingleReview = ({ item, onViewRepo, onDeleteReview, showRepoName }) => {
    const formatDate = format(new Date(item?.createdAt), "dd.MM.yyyy");

    /* Title */
    const singleReviewTitle = showRepoName ? item?.repository?.fullName : item?.user?.username

    return (
        <View style={styles.reviewContainer}>
            <View style={styles.reviewInfoContainer}>
                <View style={styles.ratingNum}>
                    <Text style={styles.ratingNumText} fontWeight='bold' fontSize='subheading'>{item?.rating}</Text>
                </View>
                <View style={styles.ratingInfo}>
                    <Text color='textPrimary' fontWeight='bold' fontSize='subheading'>{singleReviewTitle}</Text>
                    <Text style={styles.formatDate} color='textSecondary' fontSize='subheading'>{formatDate}</Text>
                    <Text>{item?.text}</Text>
                </View>
            </View>

            {/* Buttons View & Delete */}
            {showRepoName && (<View style={styles.btnContainer}>
                <Pressable onPress={() => onViewRepo(item.repositoryId)} style={[styles.btn, { backgroundColor: '#0366d6' }]} >
                    <Text color='light' fontWeight="bold">View repository</Text>
                </Pressable>
                <Pressable onPress={() => onDeleteReview(item.id)} style={styles.btn}>
                    <Text color='light' fontWeight="bold">Delete review</Text>
                </Pressable>
            </View>
            )
            }

        </View >
    );
};

export default SingleReview