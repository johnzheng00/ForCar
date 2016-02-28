'use strict';

import React, {
  AppRegistry,
  Component,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';


var Login = require('./MainScreen');
var DayListView = require('./DayListView');
var TimeListView = require('./TimeListView');


var ForCar = React.createClass({

  configureScene(route) {
    return Navigator.SceneConfigs.FloatFromRight;
  },

  renderScene(router, navigator) {
    var Component = null;
    this._navigator = navigator;
    switch (router.name) {
      case "Login":
        Component = Login;
        break;
      case "DayListView":
        Component = DayListView;
        break;
      case "TimeListView":
        Component = TimeListView;
        return <Component
         user={router.user}
         date={router.date}
         navigator = {
          navigator
        }
        />
      default: //default view
        //Component = DefaultView;
    }

    return <Component
     user={router.user}
     navigator = {
      navigator
    }
    />
  },

  componentDidMount() {
    var navigator = this._navigator;
  },

  render() {
          return (
              <Navigator
                  initialRoute={{name: 'Login'}}
                  configureScene={this.configureScene}
                  renderScene={this.renderScene} />
          );
      }

});

AppRegistry.registerComponent('ForCar', () => ForCar);
