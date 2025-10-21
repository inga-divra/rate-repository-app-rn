import { StyleSheet } from 'react-native'
import Text from './Text'
import { Link, useLocation } from 'react-router-native'

const styles = StyleSheet.create({
    tab: {
        marginLeft: 12,
        marginRight: 12
    }
})

const AppBarTab = ({ children, to }) => {
    const { pathname } = useLocation()
    const isActive = pathname === to

    return (
        <Link to={to} style={styles.tab} >
            <Text color='light' fontWeight={isActive ? 'bold' : 'normal'} fontSize='subheading'>{children}</Text>
        </Link>
    )
}

export default AppBarTab