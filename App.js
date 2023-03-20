import React, { Component } from "react";
import BottomTabNavigator from "./components/BottomTabNavigator"
import {Rajdhani_600SemiBold}from '@expo-google-fonts/rajdhani';
import *as Font from "expo-font"



export default class App extends Component {
  constructor(){
 super() 
 this.state={
   fontLoaded:false
 }
}
async loadFont(){
  await Font.loadAsync({
    Rajdhani_600SemiBold:Rajdhani_600SemiBold
  })
  this.setState({fontLoaded:true})
}
  componentDidMount(){
    this.loadFont()
  }
  render() {
   const{fontLoaded}=this.state
   if(fontLoaded){return <BottomTabNavigator />;}
return null

  }
}
