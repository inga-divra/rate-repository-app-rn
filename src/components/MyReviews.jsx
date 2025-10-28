import { FlatList, View, StyleSheet, Alert, Platform } from 'react-native';
import Text from './Text'
//import theme from '../../assets/styles/theme';
import useCurrentUserReviews from '../hooks/useCurrentUserReviews';
import SingleReview from './SingleReview';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations'


const styles = StyleSheet.create({
    separator: {
        height: 10,
    }
});

const ItemSeparator = () => <View style={styles.separator} />;


const MyReviews = () => {

    const { reviews, loading, error, refetch } = useCurrentUserReviews()
    const [deleteReview] = useMutation(DELETE_REVIEW)
    const nav = useNavigate()

    if (loading) {
        return <Text>Loading...</Text>
    }
    if (error) {
        return <Text>{String(error.message)}</Text>
    }

    /* HANDLE VIEW REPO */
    const handleViewRepo = (repoId) => {
        if (repoId) {
            nav(`/repository/${repoId}`)
        }
    }

    /* HANDLE DELETE REVIEW */
    const handleDeleteReview = async (reviewId) => {


        /* WEB */
        if (Platform.OS === 'web') {
            const ok = window.confirm('Delete review\n\nAre you sure you want to delete this review?')
            if (!ok) {
                return
            }
            try {
                await deleteReview({ variables: { id: reviewId } })
                await refetch()
            } catch (error) {
                console.log(error?.message);
            }
            return
        }
        /* MOB */
        Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: async () => {
                    try {
                        await deleteReview({ variables: { id: reviewId } })
                        await refetch()
                    } catch (error) {
                        console.log(error?.message);
                    }
                }
            },
        ]);

    }

    // Get the nodes from the edges array
    const reviewNodes = reviews ? reviews.edges.map(edge => edge.node) : [];
    return (
        <View >
            <FlatList
                data={reviewNodes}
                renderItem={({ item }) => {
                    return <SingleReview item={item} showRepoName={true} onViewRepo={handleViewRepo} onDeleteReview={handleDeleteReview} />
                }}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={ItemSeparator}
            />
        </View>
    );
}

export default MyReviews