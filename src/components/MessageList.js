import React from 'react'
import PropTypes from 'prop-types'
import { 
    View, 
    Text, 
    StyleSheet,
    FlatList,
} from 'react-native'
import MessageItem from './MessageItem'
import ajax from '../ajax';

export default class MessageList extends React.Component {

    state = {
        messages: [],
    }

    async componentDidMount(){
        await this.loadMessages()
    }

    async loadMessages() {
        let messages = await ajax.fetchMessages(this.props.limit);
        this.setState({messages: messages})
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps) {
            await this.loadMessages()
        }
    }

    keyExtractor = (item, index) => item.id;

    render() {
        return (
            <View style={styles.list}>
                <FlatList
                    data={this.state.messages} 
                    keyExtractor={this.keyExtractor}
                    renderItem={
                        ({item}) => <MessageItem item={item} />
                    } 
                />
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    list: {
        width: '100%',
        height:'95%',
        paddingTop: 10,
    }
})
