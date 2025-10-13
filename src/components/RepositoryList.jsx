import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import Text from './Text'
const styles = StyleSheet.create({
    listContainer: {

    },
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const { repositories, loading, error } = useRepositories();

    if (loading) {
        <Text>Loading...</Text>
    }
    if (error) {
        <Text>{String(error.message)}</Text>
    }
    // Get the nodes from the edges array
    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];

    return (
        <View style={styles.listContainer}>
            <FlatList
                data={repositoryNodes}
                renderItem={({ item }) => <RepositoryItem item={item} />}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={ItemSeparator}
            />
        </View>
    );
};

export default RepositoryList;