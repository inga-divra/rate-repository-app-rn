import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../assets/styles/theme';
import AppBarTab from './AppBarTab';
import { ME } from '../graphql/queries';
import { useApolloClient, useQuery } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import Text from './Text'
import { useNavigate } from 'react-router-native';
const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 30,
        backgroundColor: theme.colors.appBarBg,
        paddingBottom: 35,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    signOutBtn: {
        marginLeft: 12,
        fontWeight: '300',
    }
});


const handleOnPress = () => {
    console.log('You pressed me :D');
}

const AppBar = () => {
    const { data } = useQuery(ME, { fetchPolicy: 'cache-and-network' })


    const apolloClient = useApolloClient()
    const authStorage = useAuthStorage()
    const nav = useNavigate()

    const userLoggedIn = data?.me

    const handleLogout = async () => {

        await authStorage.removeAccessToken()
        await apolloClient.resetStore()
        nav('/')
        console.log('You logged out!');
    }

    return <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>

            <AppBarTab to='/' onPress={handleOnPress}>Repositories</AppBarTab>

            {userLoggedIn ?

                <Pressable onPress={handleLogout} style={styles.signOutBtn}>
                    <Text color='light' style={styles.signOutBtn} fontSize='subheading'>Sign out</Text>
                </Pressable> :

                <AppBarTab to='/signin' onPress={handleOnPress}>Sign in</AppBarTab>}

        </ScrollView>
    </View>;
};

export default AppBar;