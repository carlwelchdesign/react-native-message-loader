import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
    View, 
    Text, 
    Image,
    StyleSheet
} from 'react-native'

export default class MessageItem extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired
    }

    formatDate(date){
        const d = new Date(date);
        return d.toLocaleString()
    }
    render() {
        return (
            <View style={styles.messagebox}>
                <Text style={styles.date}element={Text}>{this.formatDate(this.props.item.created_at)}</Text>
                <Text style={styles.username}>{this.props.item.user.name}</Text>
                <Text>{decodeURI(this.props.item.text)}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    messagebox: {

        width: 400,
        paddingTop: 50,
        paddingBottom: 50,
        paddingRight: 20,
        paddingLeft: 20,
        margin: 10,
        marginTop: 0,
        width: '95%',
        backgroundColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 1,
        
    },
    date: {
        fontStyle: 'italic',
        fontSize: 12
    },
    username: {
        fontWeight: 'bold',
        fontSize: 15,
        paddingBottom: 20,
    }
})
