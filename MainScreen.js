'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;


var userInfo;

var MainScreen = React.createClass({


  getInitialState: function() {

      return {
        username: null,
        pwd: null,
        json: null,
     userInfo: null,
   };
  },


// componentWillMount: function() {
//     this.login();
//   },

_handlePress(event) {
  console.log('Pressed!');
  this.props.navigator.push({name:'DayListView'});
},

 _handlePressed: function() {
   console.log('Pressed!');
    this.props.navigator.push({name:'DayListView'});
 },


  render: function() {
    return (
    <ScrollView
      automaticallyAdjustContentInsets={false}
      onScroll={() => { console.log('onScroll!'); }}
      scrollEventThrottle={200}

      keyboardDismissMode='interactive'
      keyboardDismissMode='on-drag'
      style={{backgroundColor:'#efeff4'}}
      >

    <View style={styles.container}>





    <Text style={[styles.phoneTitle]}> 越练车登陆 </Text>
    {/* this will be phone cell row*/}
    <View style={{flex:1,flexDirection:'row',marginTop:100,height:60,backgroundColor:'white',justifyContent:'flex-start',alignItems:'center',width:ScreenWidth}}>
      <Text style={[styles.subTitle,styles.minSpaceLeft]}>
        用户名
      </Text>

      <View style={[styles.maxSpaceLeft]}>
          <TextInput
          onChangeText={(text) => this.setState({username: text})}
            style={{height: 60,width:160}}
            placeholder = '请输入用户名'
            />
      </View>
    </View>
    <View style={{flex:1,flexDirection:'row',marginTop:10,height:60,backgroundColor:'white',justifyContent:'flex-start',alignItems:'center',width:ScreenWidth}}>
      <Text style={[styles.subTitle,styles.minSpaceLeft]}>
        密    码
      </Text>

      <View style={[styles.maxSpaceLeft]}>
          <TextInput
            onChangeText={(text) => this.setState({pwd: text})}
            style={{height: 60,width:160}}
            placeholder = '请输入密码'
            secureTextEntry={true}
            />
      </View>
    </View>


      {/* login button */}

<View style={{flex:2,width:300,backgroundColor:'red'}}>
<TouchableHighlight
    underlayColor='#f3f3f3'
    onPress={this.login}
  >

    <Text

    style={styles.login>
      登录
    </Text>

</TouchableHighlight>
</View>


    </View>
</ScrollView>
)
  },

  login: function(){

      fetch("http://118.180.5.28:8080/ylc/student/student_login_v2?",
      {
        method: "POST",
        headers:{ "Content-Type": "application/json"},
        body: JSON.stringify({
          phone : "13568241131",//this.state.username,
          appType: "IOS",
          appVersion : "9",
          pwd : "f9962bc5140f88863ddb97e79b122726"
        })

      }
      )
      .then((response) => response.json())
        .then((responseText) => {
          console.log(responseText);
          if (responseText.ret==='0') {
              this.props.navigator.push({
                name:'DayListView',
                user: responseText,
              });
          }

            // console.log(responseText);
            // this.setState({
            // json: responseText,
            // userInfo: responseText.student,
          //});
        })
        .catch((error) => {
          console.warn(error);
        });

    },
});

const styles = StyleSheet.create({

  welcome: {
    fontSize: 10,
    margin: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000000',
    height:18,
  },
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#efeff4',
    flexWrap:'wrap',
  },

  cellRow:{
    flex: 1,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'flex-start',
  },

  phoneTitle:{
    marginTop:120,
    fontSize:22,
    fontWeight:'bold',
  },

  subTitle:{
    fontSize:16,
    fontWeight:'bold',
  },

  minSpaceLeft:{
    marginLeft:12,
  },
  maxSpaceLeft:{
    marginLeft:50,
  },
  login:{
    flex:0,height:40,position:'absolute',
    left:12,right:12,top:12,color:'white',
    fontWeight:'bold',backgroundColor:'#4cc0e0',
    textAlign:'center',paddingTop:10,
  }
});

//AppRegistry.registerComponent('ForCar', () => ForCar);
module.exports = MainScreen;
