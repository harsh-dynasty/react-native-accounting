import React from 'react'
import { 
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Modal
    
} from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("mydatabase.db");

import DeleteSVG from '../assets/DeleteSVG'
export default class Entries extends React.Component{
  constructor(props){
    super(props)
    this.state={
      deletePopup:false,
      deleteCustomerId:'',
      deleteCustomerName:'',
      searchInput:'',
      customers:[
        // {name:"Harsh Soni",id:1},
        // {name:"Harsh Soni",id:2},
        // {name:"Aaditya Soni",id:3},
        // {name:"Harsh Soni",id:4},
        // {name:"Aadhya Soni",id:5},
        // {name:"Harsh Soni",id:6},
        // {name:"Harsh Soni",id:7},
        // {name:"Jay Soni",id:8}
      ]
    }
    this.deleteCustomer=this.deleteCustomer.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.deleteBtnClicked=this.deleteBtnClicked.bind(this)
  }
  componentDidMount(){
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists customers (id text, name text);"
      );
      tx.executeSql("select * from customers", [], (_, { rows: { _array } }) =>{
           
            this.setState({customers:_array})
          });
        
    });
  }
  handleChange(text){
    this.setState({searchInput:text})
  }
  deleteBtnClicked(id,name){
      this.setState({deleteCustomerId:id,deletePopup:true,deleteCustomerName:name})
      
  }
  
  deleteCustomer(){
    
    this.setState({deletePopup:false,customers:this.state.customers.filter(customer=>customer.id!=this.state.deleteCustomerId)})
    db.transaction(tx => {
      tx.executeSql(
        `delete from customers where id=?`,[this.state.deleteCustomerId]
      );   
    });
    db.transaction(tx => {
      tx.executeSql(
        `delete from data where id=?`,[this.state.deleteCustomerId]
      );   
    });
  }
    render(props){
      const regex = new RegExp(this.state.searchInput,'i')
        return(
            <View>
            
              <Modal
                animationType="slide"
                
                transparent={true}
                visible={this.state.deletePopup}
                
              >
            
          <View style={styles.popup}>
            
            <Text>Are you sure you want to delete {this.state.deleteCustomerName}?</Text>
            <View style={[styles.row,{justifyContent:'space-around',width:"50%"}]}>
            <Button
              onPress={()=>{this.setState({deletePopup:false})}}
              title="Cancel"
              color="#5BC0DE"
              
            />
            <Button
              onPress={()=>{this.deleteCustomer()}}
              title="Delete"
              color="#df4759"
              
            />
            
          </View>
          </View>
        </Modal>
        
         <View style={{paddingTop:65}}>
            <View style={{position:'absolute',paddingTop:30,backgroundColor:'coral',width:"100%"}}>
              <Text style={[styles.font]}>Entries</Text>
            </View>
            <TextInput style={{width:"100%",paddingHorizontal:30,fontSize:16,height:40,backgroundColor:'#C0C0C0',fontWeight:'bold'}} placeholder="Search customers" onChangeText={(text)=>this.handleChange(text)}/>
            <ScrollView style={{width:"100%",marginBottom:130}}>
            {this.state.customers.map(customer=>{
                if(regex.test(customer.name))
                return(
                  <Link to={"/table/"+customer.id} underlayColor="grey" key={customer.id}>
                    <View style={styles.item} key={customer.id}>
                <Text style={styles.title}>{customer.name}</Text>
               
                <TouchableOpacity onPress={(e)=>this.deleteBtnClicked(customer.id,customer.name)}><DeleteSVG/></TouchableOpacity>
              </View>
              </Link>)
              })}
            </ScrollView>
            
  
        
       
          </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
  popup:{
      backgroundColor:"white",
      display:"flex",
      alignItems:'center',
      alignSelf:'center',
      borderRadius:10,
      padding:20,
      top:"40%",
     
  },
    container: {
      fontFamily:'monochrome',
      flex: 1,
     
      alignItems: 'center', 
     
      paddingTop:'30%',
  
    },
    row:{
      flexDirection:'row',
      justifyContent:'center',
     
      width:'100%',
      margin:15
    },
    column:{
      flexDirection:'column'
    },
    input:{
      width:"80%",
      borderRadius:15,
      paddingLeft:15
    },
    font:{
      fontWeight:'bold',
      color:'white',
      fontSize:20,
      textAlign:'center',
      paddingBottom:10,
      fontFamily:'monospace'
    },
    item: {
      backgroundColor: '#fed8b1',
      padding: 20,
      marginVertical: 5,
      marginHorizontal: 16,
      width:"93%",
      borderRadius:15,
      flexDirection:'row',
      justifyContent:'space-between'
    },
    title: {
      fontSize: 15,
    },
    
  
  });
  