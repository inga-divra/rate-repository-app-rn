import { View, StyleSheet, FlatList } from 'react-native'
import Text from './Text'
import RepositoryItem from './RepositoryItem'
import { useParams } from 'react-router-native'
import { useQuery } from '@apollo/client'
import { GET_SINGLE_REPO } from '../graphql/queries'
import SingleReview from './SingleReview'

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepo = () => {
    const { id } = useParams()
    const { loading, error, data, fetchMore } = useQuery(GET_SINGLE_REPO, { variables: { id, first: 3 }, fetchPolicy: 'cache-and-network' })


    /* HANDLE FETCH MORE */
    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                id,
                first: 3,
                after: data.repository.reviews.pageInfo.endCursor,
            },
        });
    };



    if (loading) {
        return <Text>Loading...</Text>
    }
    if (error) {
        return <Text>{String(error.message)}</Text>
    }
    const singleRepo = data.repository
    // Get the nodes from the edges array
    const reviewNodes = singleRepo.reviews
        ? singleRepo.reviews.edges.map(edge => edge.node)
        : [];


    return (
        <View style={{ flex: 1 }}>
            <RepositoryItem item={singleRepo} githubBtn ItemSeparatorComponent={ItemSeparator} />
            <FlatList
                data={reviewNodes}
                renderItem={({ item }) => <SingleReview item={item} />}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={ItemSeparator}
                onEndReached={handleFetchMore}
                onEndReachedThreshold={0.5}
            />
        </View>
    )
}

export default SingleRepo