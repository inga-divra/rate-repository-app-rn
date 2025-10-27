import { FlatList, View, StyleSheet } from 'react-native';
import Text from './Text'
//import theme from '../../assets/styles/theme';
import useCurrentUserReviews from '../hooks/useCurrentUserReviews';
import SingleReview from './SingleReview';


const styles = StyleSheet.create({
    separator: {
        height: 10,
    }
});

const ItemSeparator = () => <View style={styles.separator} />;


const MyReviews = () => {

    const { reviews, loading, error } = useCurrentUserReviews()

    if (loading) {
        return <Text>Loading...</Text>
    }
    if (error) {
        return <Text>{String(error.message)}</Text>
    }


    // Get the nodes from the edges array
    const reviewNodes = reviews ? reviews.edges.map(edge => edge.node) : [];
    return (
        <View >
            <FlatList
                data={reviewNodes}
                renderItem={({ item }) => <SingleReview item={item} showRepoName={true} />}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={ItemSeparator}
            />
        </View>
    );
}

export default MyReviews