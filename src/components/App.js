import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    Picker,
    TouchableHighlight
} from 'react-native';
import MessageList from './MessageList'
import TimerMixin from 'react-timer-mixin'
    

class App extends React.Component {
    mixins: [TimerMixin]
    state = {
        limit: 3,
        listId: 1,
        interval: 10,
        showMenu: false
    }
    resetMessageList = (limit) => {
        this.setState( prevState => ({ 
            limit: limit,
            listId: prevState.listId + 1
        }))
        this.toggleMenu()
    }

    componentDidMount() {
        this.setTimer()
    }
       
    componentWillUnmount() {
        clearTimeout(this.interval)
    }

    changeInterval = (interval) => {
        this.setState( prevState => ({ 
            interval: interval,
        }))
        this.toggleMenu()
        this.setTimer()
    }

    setTimer(){
        if (this.interval) clearInterval(this.interval);
        const _this = this
        this.interval = setInterval(() => {
            this.changeKey()
        }, this.state.interval*1000);
    }

    changeKey = () => {
        this.setState( prevState => ({ 
            listId: prevState.listId + 1
        }))
    }
    
    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        });
    }

    renderMenu() {
        if (this.state.showMenu) {
            return (
                <View style={styles.settings}>
                    <View style={styles.picker}>
                        <Text style={styles.settingLabel}>Limit</Text>
                        <Picker 
                            selectedValue={this.state.limit} 
                            onValueChange={(itemValue, itemIndex) => this.resetMessageList(itemValue)}>
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="10" value="10" />
                            <Picker.Item label="15" value="15" />
                            <Picker.Item label="20" value="20" />
                        </Picker>
                    </View>
                    <View style={styles.picker}>
                        <Text style={styles.settingLabel}>Interval</Text>
                        <Picker   
                            selectedValue={this.state.interval} 
                            onValueChange={(itemValue, itemIndex) => this.changeInterval(itemValue)}>
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="10" value="10" />
                            <Picker.Item label="15" value="15" />
                            <Picker.Item label="20" value="20" />
                        </Picker>
                    </View>
                </View>
            )
        } else {
            return null
        }
    }
    
    render() {
        return (
            <View style={styles.container}>    
                <TouchableHighlight style={styles.menuButton} onPress={this.toggleMenu}>
                    <Text style={styles.menuText}>Settings( Limit: {this.state.limit}, Interval: {this.state.interval} )</Text> 
                </TouchableHighlight>
                {this.renderMenu()}
                
                <MessageList 
                    style={styles.messages}
                    key={this.state.listId} 
                    list={this.state.listId} 
                    limit={this.state.limit} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    menuButton: {
        backgroundColor: 'blue',
        width:'100%',
        height: 40,
        padding:10
    },
    menuText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
    container: {
       marginTop: 30
    },
    picker: {
        flexDirection:'column',
        width: '50%',
        backgroundColor: '#dad9da'
    },
    settings: {
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
    },
    settingLabel: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    messages: {
        marginTop:20,
    }
})

export default App;
