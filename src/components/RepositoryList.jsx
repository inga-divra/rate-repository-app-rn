import { FlatList, View, StyleSheet, Pressable, Platform } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import Text from './Text'
import { useNavigate } from 'react-router-native';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';


const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    webSelect: {
        width: '100%',
        padding: 8,
        fontSize: 16
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const SelectRepo = ({ value, onChange }) => {
    /* WEB */
    if (Platform.OS === 'web') {
        return <View>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={styles.webSelect}
            >
                <option value='LATEST'>Latest repositories</option>
                <option value='HIGHEST'>Highest rated repositories</option>
                <option value='LOWEST'>Lowest rated repositories</option>
            </select>
        </View>
    }
    /* MOB */
    return <View>
        <Picker
            prompt='Select an item...'
            selectedValue={value}
            onValueChange={onChange}
        >
            <Picker.Item label='Latest repositories' value='LATEST' />
            <Picker.Item label='Highest rated repositories' value='HIGHEST' />
            <Picker.Item label='Lowest rated repositories' value='LOWEST' />
        </Picker>
    </View>

}
const RepositoryList = () => {

    const [order, setOrder] = useState('LATEST')
    const [repoVariables, setRepoVariables] = useState({
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC'
    })

    /* ORDER CHANGE HERE */
    useEffect(() => {
        if (order === 'HIGHEST') {
            setRepoVariables({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' })
        }
        if (order === 'LOWEST') {
            setRepoVariables({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' })
        } else {
            setRepoVariables({ orderBy: 'CREATED_AT', orderDirection: 'DESC' })
        }
    }, [order])



    const { repositories, loading, error } = useRepositories(repoVariables);
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
                ListHeaderComponent={<SelectRepo value={order} onChange={setOrder} />}
            />
        </View>
    );
};

export default RepositoryList;