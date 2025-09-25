import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 30,
        backgroundColor: theme.colors.appBarBg,
        paddingBottom: 35,
        marginBottom: 30
    },

});

const handleOnPress = () => {
    console.log('You pressed me :D');

}
const AppBar = () => {
    return <View style={styles.container}>
        <AppBarTab onPress={handleOnPress}>Repositories</AppBarTab>

    </View>;
};

export default AppBar;