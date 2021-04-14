import React from "react";
import { StyleSheet, Text, View,TouchableOpacity,Pressable, AppRegistry} from "react-native";

import { NativeRouter, Route, Link } from "react-router-native";
import TableComponent from './components/TableComponent'

import Home from './components/Home'
import Entries from './components/Entries'
import {StatusBar} from 'react-native'
import HouseSVG from './assets/HouseSVG'
import EntrySVG from './assets/EntrySVG'


// import SQLite from 'react-native-sqlite-storage';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("mydatabase.db");
class App extends React.Component{ 
  constructor(props) {
    super(props);
    // SQLite.DEBUG = true;
    
  }
  
  render(){
    return(
      <NativeRouter>
       
      <View style={styles.container}>
        <StatusBar
            animated={true}
            backgroundColor="coral"
           />
           
             <Route path="/" exact component={Home}/>
             <Route path="/entries" exact component={Entries}/>
             <Route path="/table/:id" exact component={TableComponent}/>
             
             
     
      <View style={styles.navbar}>
      
           <Link underlayColor="coral" to="/">
             <View style={styles.row}><HouseSVG style={styles.svg}/><Text style={[styles.navText]}>Home</Text></View>
             </Link>
           
           
             <Link underlayColor="coral" to='/entries'>
             <View style={styles.row}><EntrySVG style={styles.svg}/><Text style={[styles.navText]}>Entries</Text></View>
             </Link>
          
        
        
        
      </View>
      </View>
     
      </NativeRouter>)
  }
  
}

const styles=StyleSheet.create({
  container:{
      height:"100%"
  },
  navbar:{
      display:"flex",
      flexDirection:"row",
      justifyContent:'space-evenly',
      alignItems:'center',
      height:50,
      width:"100%",
      backgroundColor:'coral',
      position:'absolute',
      bottom:0,
      color:'white'
  },
  navText:{
      color:'white',
      fontWeight:'bold',
      fontFamily:'monospace',
      
     
  },
  svg:{
    width:25,
    height:25,
    marginRight:5
  },
  row:{
    display:"flex",
    flexDirection:'row',
    alignItems:'center'
  },
  
})

export default App

