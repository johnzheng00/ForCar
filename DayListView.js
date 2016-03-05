
'use strict';

Date.prototype.Format = function (fmt) { //javascript时间日期函数
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

var React = require('react-native');
var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Navigator,
  ActivityIndicatorIOS,
  ProgressBarAndroid,
  Text,
  Platform,
  View,
} = React;


//var navigator = new Navigator();
//var ImageView = require('./ImageView');
var TimerMixin = require('react-timer-mixin');
var RefreshableListView = require('react-native-refreshable-listview')

var API_URL = 'http://118.180.5.28:8080/ylc/student/get_days_v2?';


var days = new Array();

var DayListView = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(days),
    };
  },


componentWillMount: function() {
    this.loadData();
  },


  _urlForQueryAndPage: function(): string {
    return (
        API_URL
      );
  },



  loadData: function(){
    var sDate = new Date().Format('yyyy-MM-dd');
    var end = new Date();
    end.setDate(end.getDate()+7);
    var eDate = new Date(end).Format('yyyy-MM-dd');
    fetch(this._urlForQueryAndPage(),
    {
      method: "POST",
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify({
         "appVersion" : "9",
         startDate : sDate,
         endDate : eDate,
         coachId : this.props.user.student.coachId,
         issueDays : 3,
         orderCount : 7,
         type : "2",
         tokenId : this.props.user.student.tokenId,
         appType : "IOS"
      })

    }
    )
    .then((response) => response.json())
      .then((responseText) => {
          console.log(responseText);
        //
        // for (var i in responseText.list) {
        //   days.push(responseText.list[i]);
        // }

        this.setState({
         dataSource: this.getDataSource(responseText.list),
      });
      })
      .catch((error) => {
        console.warn(error);
      });

  },


  getDataSource: function(array: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(array);
  },

  render: function() {
    return (
      // ListView wraps ScrollView and so takes on its properties.
      // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.
      <RefreshableListView
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        loadData={this.loadData}

      />
    );
  },
// {"isAllOrder":"1","myTime":"","isSee":"1","reason":"","isNowPeriod":"1",
// "allOrderCount":7,"state":"1","nowOrderCount":7,"isMy":"0","date":"2016-02-27","isBlack":"0"}
  _renderRow: function(entity: object, sectionID: number, rowID: number) {
    var myTimeString ='';
    if (entity.myTime!=='') {
      myTimeString='已预约'+entity.myTime+' ';
    }
    var week = new Date(entity.date).getDay();
    week = week+"";
    var weeks = this._getWeek(Number(week));
    return (
      <TouchableHighlight
      onPress={()=>this._pressRow(entity)}
       underlayColor="transparent">
        <View >
          <View style={styles.row}>
            <Text style={styles.text} >
             日期: {entity.date}    {weeks}
            </Text>
            <Text style={styles.text1} >
             {myTimeString}
            </Text>
            <Text style={styles.text} >
             预约: {entity.nowOrderCount}/{entity.allOrderCount}
            </Text>
          </View>
            <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  },

   _getWeek: function(week: number): string{
     var weeks ='';
     switch (week) {
          case 1:weeks='星期一';break;
          case 2:weeks='星期二';break;
          case 3:weeks='星期三';break;
          case 4:weeks='星期四';break;
          case 5:weeks='星期五';break;
          case 6:weeks='星期六';break;
          case 0:weeks='星期日';break;

       default:

     }
     return weeks;
   },

  _pressRow: function(entity: object) {
    this.props.navigator.push({
      name:'TimeListView',
      user: this.props.user,
      date: entity.date,
    });
  },


});



var styles = StyleSheet.create({
  list:{
    marginTop: 30,
  },
  row: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  text: {
    color: '#000000',
    flex: 1,
  },

  text1: {
      marginTop:5,
      marginBottom:5,
      color: '#000000',
      flex: 1,
    },

  scrollSpinner: {
    marginVertical: 20,
  },
});

module.exports = DayListView;
