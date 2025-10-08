import { Pressable, StyleSheet } from 'react-native'
import Text from './Text'

const styles = StyleSheet.create({
    tab: {
        marginLeft: 12
    }
})

const AppBarTab = ({ children, onPress }) => {
    return (
        <Pressable style={styles.tab} onPress={onPress}>
            <Text color='light' fontWeight='bold' fontSize='subheading'>{children}</Text>
        </Pressable>
    )
}

export default AppBarTab