import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../assets/styles/theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 30,
        backgroundColor: theme.colors.appBarBg,
        paddingBottom: 35,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

});

const handleOnPress = () => {
    console.log('You pressed me :D');

}
const AppBar = () => {
    return <View style={styles.container}>
        <AppBarTab to='/' onPress={handleOnPress}>Repositories</AppBarTab>
        <AppBarTab to='/signin' onPress={handleOnPress}>Sign in</AppBarTab>
    </View>;
};

export default AppBar;