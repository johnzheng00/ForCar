
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
var data = {
  "appVersion" : "9",
  "ydate" : "2016-02-19",
  "timeList" : [
    {
      "stateStr" : "å è½½ä¸­",
      "content" : "",
      "subjectStr" : "ç§ç®äº  ç§ç®ä¸",
      "endTime" : "09:30",
      "orderId" : "",
      "date" : "2016-02-19",
      "subjectCode" : "",
      "orderCount" : 1,
      "startTime" : "08:00",
      "state" : ""
    },
    {
      "stateStr" : "å è½½ä¸­",
      "content" : "",
      "subjectStr" : "ç§ç®äº  ç§ç®ä¸",
      "endTime" : "11:00",
      "orderId" : "",
      "date" : "2016-02-19",
      "subjectCode" : "",
      "orderCount" : 1,
      "startTime" : "09:30",
      "state" : ""
    },
    {
      "stateStr" : "å è½½ä¸­",
      "content" : "",
      "subjectStr" : "ç§ç®äº  ç§ç®ä¸",
      "endTime" : "12:30",
      "orderId" : "",
      "date" : "2016-02-19",
      "subjectCode" : "",
      "orderCount" : 1,
      "startTime" : "11:00",
      "state" : ""
    },
    {
      "stateStr" : "å è½½ä¸­",
      "content" : "",
      "subjectStr" : "ç§ç®äº  ç§ç®ä¸",
      "endTime" : "14:30",
      "orderId" : "",
      "date" : "2016-02-19",
      "subjectCode" : "",
      "orderCount" : 1,
      "startTime" : "13:00",
      "state" : ""
    },
    {
      "stateStr" : "å è½½ä¸­",
      "content" : "",
      "subjectStr" : "ç§ç®äº  ç§ç®ä¸",
      "endTime" : "16:00",
      "orderId" : "",
      "date" : "2016-02-19",
      "subjectCode" : "",
      "orderCount" : 1,
      "startTime" : "14:30",
      "state" : ""
    },
    {
      "stateStr" : "å è½½ä¸­",
      "content" : "",
      "subjectStr" : "ç§ç®äº  ç§ç®ä¸",
      "endTime" : "17:30",
      "orderId" : "",
      "date" : "2016-02-19",
      "subjectCode" : "",
      "orderCount" : 1,
      "startTime" : "16:00",
      "state" : ""
    },
    {
      "stateStr" : "å è½½ä¸­",
      "content" : "",
      "subjectStr" : "ç§ç®ä¸",
      "endTime" : "19:00",
      "orderId" : "",
      "date" : "2016-02-19",
      "subjectCode" : "3",
      "orderCount" : 1,
      "startTime" : "17:30",
      "state" : ""
    }
  ],
  "coachId" : "ff8080814f3f96ec014f48dcc25e0d1d",
  "type" : "2",
  "appType" : "IOS",
  "tokenId" : "ff808081529ba3850152efba99a3523a"
};

var comfirmData=
{
  "coachId" : "ff8080814f3f96ec014f48dcc25e0d1d",
  "appType" : "IOS",
  "type" : "2",
  "address" : "",
  "startTime" : "13:00",
  "endTime" : "14:30",
  "reason" : "",
  "orderId" : "",
  "subjectCode" : "2",
  "tokenId" : "ff808081529ba3850152efba99a3523a",
  "appVersion" : "9",

  "setState" : "2",
  "setDate" : "2016-02-22"
}

var React = require('react-native');
var RefreshableListView = require('react-native-refreshable-listview')

var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Navigator,
  ActivityIndicatorIOS,
  ProgressBarAndroid,
  Text,
  Alert,
  Platform,
  View,
} = React;

//var navigator = new Navigator();
//var ImageView = require('./ImageView');
var TimerMixin = require('react-timer-mixin');

var API_URL = 'http://118.180.5.28:8080/ylc/student/get_time_v2?';
var API_URL_ORDER = 'http://118.180.5.28:8080/ylc/student/confirm_order_v2?';


var days = new Array();

var TimeListView = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    data.ydate=this.props.date;
    data.tokenId = this.props.user.student.tokenId;
    data.coachId = this.props.user.student.coachId;
    comfirmData.tokenId = this.props.user.student.tokenId;
    comfirmData.coachId = this.props.user.student.coachId;
    comfirmData.setDate = this.props.date;

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
    fetch(this._urlForQueryAndPage(),
    {
      method: "POST",
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify(data)

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

  comfirmOrder: function(startTime: string, endTime: string){
    comfirmData.startTime=startTime;
    comfirmData.endTime=endTime;

    fetch(API_URL_ORDER,
    {
      method: "POST",
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify(comfirmData)

    }
    )
    .then((response) => response.json())
      .then((responseText) => {
          console.log(responseText);
        //
        // for (var i in responseText.list) {
        //   days.push(responseText.list[i]);
        // }
        Alert.alert(
                '提示',
                responseText.msg,
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed!')},
                ]
              );

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
        loadData={this.loadData}
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />

    );
  },
// {"isEvaluation":"0","startTime":"09:30","isPay":"0","reason":"",
// "studentName":"","state":"2","nowOrderCount":1,"isMy":"0","subjectCode":"","orderCount":1}
  _renderRow: function(entity: object, sectionID: number, rowID: number) {
    if(entity.state==='1')
      return (
      <TouchableHighlight
      onPress={()=>this._pressRow(data.timeList[rowID].startTime, data.timeList[rowID].endTime)}
       underlayColor="transparent">
        <View >
          <View style={styles.row}>
            <Text style={styles.text} >
            {data.timeList[rowID].startTime}-{data.timeList[rowID].endTime}
            </Text>
            <Text style={styles.btn}>预约</Text>
          </View>
            <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
    else
    return (

          <View >
            <View style={styles.row}>
              <Text style={styles.text} >
              {data.timeList[rowID].startTime}-{data.timeList[rowID].endTime}
              </Text>
              <Text >不能预约</Text>
            </View>
              <View style={styles.separator} />
          </View>
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

  _pressRow: function(startTime: string, endTime: String) {
    this.comfirmOrder(startTime, endTime);
  },
});



var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#efeff4',
    flexWrap:'wrap',
  },
  list:{
    marginTop: 30,
  },
  title:{
    marginTop: 30,
    height: 40,
    flex: 1,
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

  btn:{
    flex:1,height:20,width:50,
    color:'white',fontWeight:'bold',backgroundColor:'#4cc0e0',
    textAlign:'center',borderRadius:5
},

});

module.exports = TimeListView;
