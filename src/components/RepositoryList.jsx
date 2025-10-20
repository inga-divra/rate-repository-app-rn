import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import Text from './Text'
import { useNavigate } from 'react-router-native';


const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const { repositories, loading, error } = useRepositories();
    const nav = useNavigate()

    const handleOpenSingleRepo = (id) => {
        nav(`/repository/${id}`)
    }

    if (loading) {
        return <Text>Loading...</Text>
    }
    if (error) {
        return <Text>{String(error.message)}</Text>
    }
    // Get the nodes from the edges array
    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];

    return (
        <View >
            <FlatList
                data={repositoryNodes}
                renderItem={({ item }) => <Pressable onPress={() => handleOpenSingleRepo(item.id)}>
                    <RepositoryItem item={item} />
                </Pressable>}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={ItemSeparator}
            />
        </View>
    );
};

export default RepositoryList;