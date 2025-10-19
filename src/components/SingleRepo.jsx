import { View } from 'react-native'
import Text from './Text'
import RepositoryItem from './RepositoryItem'
import { useParams } from 'react-router-native'
import { useQuery } from '@apollo/client'
import { GET_SINGLE_REPO } from '../graphql/queries'



const SingleRepo = () => {
    const { id } = useParams()
    const { loading, error, data } = useQuery(GET_SINGLE_REPO, { variables: { id } })

    if (loading) {
        return <Text>Loading...</Text>
    }
    if (error) {
        return <Text>{String(error.message)}</Text>
    }
    const singleRepo = data.repository
    return (
        <View>
            <RepositoryItem item={singleRepo} githubBtn />
        </View>
    )
}

export default SingleRepo