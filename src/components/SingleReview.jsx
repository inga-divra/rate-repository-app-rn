import { View, StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../../assets/styles/theme'
import { format } from "date-fns";


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 16,
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 16,
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
    }
});


const SingleReview = ({ item }) => {
    const formatDate = format(new Date(item?.createdAt), "dd.MM.yyyy");
    return (
        <View style={styles.container}>
            <View style={styles.ratingNum}>
                <Text style={styles.ratingNumText} fontWeight='bold' fontSize='subheading'>{item?.rating}</Text>
            </View>
            <View style={styles.ratingInfo}>
                <Text color='textPrimary' fontWeight='bold' fontSize='subheading'>{item?.user?.username}</Text>
                <Text style={styles.formatDate} color='textSecondary' fontSize='subheading'>{formatDate}</Text>
                <Text>{item?.text}</Text>
            </View>
        </View>
    )
}

export default SingleReview