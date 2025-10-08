import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Text from './Text'
import theme from '../../assets/styles/theme'
import convert from '../utils/convert'

const styles = StyleSheet.create({
    profileContainer: {
        display: 'flex',
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginBottom: 8
    },
    profileInfo: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 16,
    },
    profileHeader: {
        display: 'flex',
        flex: 1,
        gap: 8
    },
    profileImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        borderRadius: 8,
        marginRight: 12

    },
    profileBtn: {
        backgroundColor: theme.colors.primary,
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
        alignSelf: 'flex-start',
    },

    statsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statsInfo: {
        display: 'flex',
        alignItems: 'center',
    }
});

const RepositoryItem = ({ item }) => {
    return (
        <View style={styles.profileContainer}>
            {/* Image and profile info */}
            <View style={styles.profileInfo}>
                <Image
                    source={{ uri: item.ownerAvatarUrl }} style={styles.profileImage} />
                <View style={styles.profileHeader}>
                    <Text color='textPrimary' fontWeight='bold' fontSize='subheading'>{item.fullName}</Text>
                    <Text>{item.description}</Text>
                    <TouchableOpacity style={styles.profileBtn}>
                        <Text color='light' fontWeight='bold' fontSize='subheading'>{item.language}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Stats info  */}
            <View style={styles.statsContainer}>
                <View style={styles.statsInfo}>
                    <Text color='textPrimary' fontWeight='bold' fontSize='subheading'>
                        {convert(item.stargazersCount)}
                    </Text>
                    <Text>Stars</Text>
                </View>
                <View style={styles.statsInfo}>
                    <Text color='textPrimary' fontWeight='bold' fontSize='subheading'>
                        {convert(item.forksCount)}
                    </Text>
                    <Text>Forks</Text>
                </View>
                <View style={styles.statsInfo}>
                    <Text color='textPrimary' fontWeight='bold' fontSize='subheading'>
                        {item.reviewCount}
                    </Text>
                    <Text>Reviews</Text>
                </View>
                <View style={styles.statsInfo}>
                    <Text color='textPrimary' fontWeight='bold' fontSize='subheading'>
                        {item.ratingAverage}
                    </Text>
                    <Text>Rating</Text>
                </View>
            </View>


        </View >
    )
}

export default RepositoryItem