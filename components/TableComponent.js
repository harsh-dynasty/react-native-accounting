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
    Switch
    
} from 'react-native';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("mydatabase.db");

import DatePicker from 'react-native-datepicker'
import { Table, Row, Rows } from 'react-native-table-component';
export default class Entries extends React.Component{
  constructor(props){
    super(props)
    this.state={
      date:"",
      isEnabled:false,
      customerName:'',
      od:'',
      tableHead: ['Date', 'Description', 'Credit', 'Debit'],
      tableData: [
       
      ]
        
      
    }
    this.update=this.update.bind(this)
  }
  componentDidMount(){
    var today = new Date();
      var dd = today.getDate();

      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear();
      if(dd<10) 
      {
          dd='0'+dd;
      } 

      if(mm<10) 
      {
          mm='0'+mm;
      } 
     
    
      today = dd+'-'+mm+'-'+yyyy;
      this.setState({date:today})
      this.update()
    
  }
 
  update(){
   
    var id=this.props.match.params.id;
    this.setState({customerId:id})
    db.transaction(tx => {
      tx.executeSql("select name from customers where id=?", [id], (_, { rows: { _array } }) =>{
           
        this.setState({customerName:_array[0].name})
       });
    })
    db.transaction(tx => {
      tx.executeSql(`select * from data where id=? ;`, [id], (_, { rows: { _array } }) =>{
           
        var amt=Number(this.state.od)
          var newArray=_array.map(obj=>{
           
           
             var credit="";
             var debit="";
            
             if(obj.type=="credit"){
              credit=obj.amount
              amt=amt-credit
            }
            else{
              debit=obj.amount
              amt=amt+debit
            }
            //  return [obj.date,obj.description,credit,debit]

             if(this.state.isEnabled){
               if(this.state.date==obj.date)
                  return [obj.date,obj.description,credit,debit]
             }else{
                  return [obj.date,obj.description,credit,debit]
             }
           })
           this.setState({tableData:newArray,od:amt})
     
       });
    })
    
  }
 
    render(){
      
        return(
            <View>
            
             
        
         <View style={{paddingTop:65}}>
            <View style={[{position:'absolute',paddingTop:30,backgroundColor:'coral',width:"100%"}]}>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
              <Text style={[styles.font]}>{this.state.customerName}</Text>
              <Text style={[styles.font]}>{this.state.od}₹</Text>
              </View>
            </View>
            <View style={[styles.row,{justifyContent:'space-evenly',alignItems:"center",paddingHorizontal:20}]}>
            <Switch
        trackColor={{ false: "black", true: "coral" }}
        thumbColor={this.state.isEnabled ? "black" : "coral"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={()=>{this.setState({isEnabled:!this.state.isEnabled,od:0});this.update()}}
        value={this.state.isEnabled}
      />
      {this.state.isEnabled?
      <View style={[styles.row,{justifyContent:'space-evenly',alignItems:"center",height:30}]}>
      <Text>Filter by Date</Text>

      
<DatePicker
style={{width: 200}}
date={this.state.date}
mode="date"
placeholder="select date"
format="DD-MM-YYYY"
confirmBtnText="Confirm"
cancelBtnText="Cancel"
onDateChange={(d)=>{this.setState({date:String(d),od:0}); this.update()}}
/>
      </View>:
      <View style={[styles.row,{justifyContent:'space-evenly',alignItems:"center",height:30}]}>
      <Text>Not filtered by Dates</Text>
      </View>
    }
      
            </View>
            <ScrollView style={{width:"100%",marginBottom:240}}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={this.state.tableData} textStyle={styles.text}/>
        </Table>
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
    head: { height: 40, backgroundColor: '#f1f8ff'},
    text: { margin: 6 }
  
  });
  