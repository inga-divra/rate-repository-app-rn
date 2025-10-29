import { FlatList, View, StyleSheet, Pressable, Platform } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import Text from './Text'
import { useNavigate } from 'react-router-native';
import { useEffect, useMemo, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import { TextInput } from 'react-native';
import theme from '../../assets/styles/theme';




const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    listHeaderContainer: {
        backgroundColor: theme.colors.textSecondary,
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    webSelect: {
        width: '100%',
        padding: 8,
        fontSize: 16,
        borderRadius: 6,
        backgroundColor: 'white',
        color: theme.colors.textSecondary,
        fontWeight: 500
    },
    searchRepoInput: {
        marginBottom: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 6,
        color: theme.colors.textSecondary,
        fontSize: 16,

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
    const [searchText, setSearchText] = useState('')
    const [debouncedSearch] = useDebounce(searchText, 500)
    const [order, setOrder] = useState('LATEST')
    const [repoVariables, setRepoVariables] = useState({
        first: 8,
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC'
    })

    /* ORDER CHANGE HERE */
    useEffect(() => {
        if (order === 'HIGHEST') {
            setRepoVariables({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' })
        } else if (order === 'LOWEST') {
            setRepoVariables({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' })
        } else {
            setRepoVariables({ orderBy: 'CREATED_AT', orderDirection: 'DESC' })
        }
    }, [order])

    /* DEBOUNCED SEARCH */
    useEffect(() => {
        setRepoVariables({
            orderBy: repoVariables.orderBy,
            orderDirection: repoVariables.orderDirection,
            searchKeyword: debouncedSearch,
            first: 8,
        })
    }, [debouncedSearch])


    const { repositories, loading, error, fetchMore } = useRepositories(repoVariables);
    const nav = useNavigate()
    const handleOpenSingleRepo = (id) => {
        nav(`/repository/${id}`)
    }




    /* LISTHEADER with useMemo */
    const ListHeader = useMemo(() => {
        return <View style={styles.listHeaderContainer}>
            <TextInput value={searchText} onChangeText={setSearchText} placeholder='Search repository...' style={styles.searchRepoInput} />
            <SelectRepo value={order} onChange={setOrder} style={styles.webSelect} />
        </View>
    }, [searchText, order])
    /*  */


    if (loading && !repositories) {
        return <Text>Loading...</Text>
    }
    if (error) {
        return <Text>{String(error.message)}</Text>
    }
    // Get the nodes from the edges array
    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];
    const onEndReach = () => {
        fetchMore();
    };
    return (
        <View >
            <FlatList
                data={repositoryNodes}
                renderItem={({ item }) => <Pressable onPress={() => handleOpenSingleRepo(item.id)}>
                    <RepositoryItem item={item} />
                </Pressable>}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={ItemSeparator}
                ListHeaderComponent={ListHeader}
                onEndReached={onEndReach}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
};

export default RepositoryList;