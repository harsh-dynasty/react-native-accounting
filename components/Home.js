
import React from 'react';
import { 
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ScrollView,
    Modal,
    KeyboardAvoidingView,
    TouchableOpacity
    
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import {Radio} from 'native-base'



import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("mydatabase.db");

export default class Home extends React.Component {
  constructor(props){
        super(props)
        // SQLite.DEBUG = true;
        this.state={
           error:false,
            date:new Date,
            credit:false,
            newCustomer:false,
            customerName:"",
            customerId:'',
            amount:'',
            description:"",
            customerBtnClicked:false,
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
        this.handleRadio=this.handleRadio.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.submit=this.submit.bind(this)
        this.submitBtnClicked=this.submitBtnClicked.bind(this)
      
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
  db.transaction(tx => {
    tx.executeSql(
      "create table if not exists customers (id text, name text);"
    );
    tx.executeSql(
      "create table if not exists data (id text, date text, description text, type text, amount int);"
    );
    // tx.executeSql("select * from customers", [], (_, { rows: { _array } }) =>{
         
    //       this.setState({customers:_array})
    //     });
      
  });
  this.update()
  
}
update(){
  
  db.transaction(tx => {
   
    tx.executeSql("select * from customers", [], (_, { rows: { _array } }) =>{

          this.setState({customers:_array})
        });
      
  });

}
  // backAction(){
  //   this.setState({customerBtnClicked:false})
    
  // }
  // componentDidMount(){
  //   BackHandler.addEventListener("hardwareBackPress", this.backAction);
  // }
  submit(){
    if(this.state.customerName!="" && this.state.amount!="") 
      this.submitBtnClicked()
    else
      this.setState({error:true})
  }
submitBtnClicked(){
  // console.log("clicked")
  var type=this.state.credit?"credit":"debit"
  var id=this.state.customerId;
    var date=String(this.state.date)
    var description=this.state.description
    var amount=this.state.amount
    var customerName=this.state.customerName
        
    if(this.state.newCustomer){
      console.log("clicked")
      id=new Date
      id=String(id).split(" ").slice(1,5).join("")
     
      db.transaction(tx => {
        tx.executeSql(`insert into customers values (?,?);`,[id,customerName]);
      });
      
    }
    db.transaction(tx => {
      tx.executeSql(`insert into data values (?,?,?,?,?);`,[id,date,description,type,amount]);
    });
    this.update()
    this.setState({
      amount:"",
      description:"",
      customerName:""
    })
  }

  handleRadio(name){
    if(name=="credit"){
      this.setState({credit:true})
    }
    if(name=="debit"){
      this.setState({credit:false})
    }
    if(name=="oldCustomer"){
      this.setState({newCustomer:false,customerName:''})
    }
    if(name=="newCustomer"){
      this.setState({newCustomer:true,customerName:''})
    }
  }
  handleChange(text){
    this.setState({searchInput:text})
  }
  render(props){
    const regex = new RegExp(this.state.searchInput,'i')
    return (
      <KeyboardAvoidingView behavior='position'>
        <ScrollView keyboardShouldPersistTaps='handeled'>
        <View style={{display:'flex',alignItems:'center',paddingTop:100}}>
         
        <Modal
                animationType="slide"
                presentationStyle="fullScreen"
                
                visible={this.state.customerBtnClicked}
                
              >
            
          <View style={styles.popup}>
    
          <TextInput style={{width:"100%",paddingHorizontal:30,paddingTop:20,fontSize:16,height:60,backgroundColor:'#C0C0C0',fontWeight:'bold'}} placeholder="Search customer" onChangeText={(text)=>this.handleChange(text)}/>
          <Button
              title="Cancel"
              onPress={(event) => this.setState({customerBtnClicked:false})}
            />
          <ScrollView style={{width:"100%",marginBottom:100,minHeight:"70%"}}>
            {this.state.customers.map(customer=>{
                if(regex.test(customer.name))
                return(
                  <TouchableOpacity onPress={()=>this.setState({customerBtnClicked:false,customerId:customer.id,customerName:customer.name})}>
                    <View style={styles.item}>
                      
                      <Text style={styles.title}>{customer.name}</Text>
                      
               
               
                     
                    </View>
                    </TouchableOpacity>
              )
              })}
            </ScrollView>
           
          </View>
        </Modal>
        <Modal
                animationType="slide"
                
                transparent={true}
                visible={this.state.error}
                
              >
            
          <View style={styles.error}>
            
            <Text style={{color:"white"}}>Incomplete Fields?</Text>
            <View style={{margin:20}}>
           
            <Button
              onPress={()=>{this.setState({error:false})}}
              title="Ok"
              color="#df4759"
              
            />
            
          </View>
          </View>
        </Modal>
          <View style={{position:'absolute',paddingTop:30,backgroundColor:'coral',width:"100%"}}>
            <Text style={[styles.font]}>Accounting</Text>
          </View>
          <Text>Select Date</Text>
          <DatePicker
            style={{width: 200}}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(d)=>{this.setState({date:d})}}
            />
         
       
         
          
          <View style={styles.row}>
           
          <Radio
                color={"#f0ad4e"}
                selectedColor={"coral"}
                selected={!this.state.newCustomer}
                onPress={()=>{this.handleRadio("oldCustomer")}}
              />
              <Text>Select Existing Customer</Text>
              </View>
              <View style={styles.row}>
               
              <Radio
                color={"#f0ad4e"}
                selectedColor={"coral"}
                selected={this.state.newCustomer}
                onPress={()=>{this.handleRadio("newCustomer")}}
              />
              <Text>Create a new customer</Text>
              </View>
           {this.state.newCustomer? 
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1 ,...styles.input}}
            onChangeText={text =>this.setState({customerName:text})}
            placeholder="Create New Customer"
            />:
            
            <Button
              title="Select Existing Customer"
              onPress={(event) => this.setState({customerBtnClicked:true,searchInput:''})}
            />}

            <Text>{this.state.customerName}</Text>
            <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1 ,...styles.input}}
            onChangeText={text =>this.setState({description:text})}
            placeholder="Description"
            />
      <View style={styles.row}><Text>Credit</Text>
          <Radio
                color={"#f0ad4e"}
                selectedColor={"coral"}
                selected={this.state.credit}
                onPress={()=>{this.handleRadio("credit")}}
              />
      
      <Text>Debit</Text>
              <Radio
                color={"#f0ad4e"}
                selectedColor={"coral"}
                selected={!this.state.credit}
                onPress={()=>{this.handleRadio("debit")}}
              /> 
      </View>
      
               
              <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 ,...styles.input}}
            onChangeText={text =>this.setState({amount:text})}
            keyboardType="numeric"
            placeholder="Amount"
            />
            <View style={{...styles.row,marginBottom:70}}>
            <Button
             
              color='green'   
              title="Add Entry"
              onPress={() =>{ this.submit() }}
            />
            
           
      </View>
      
        
      
     
     
        </View>
        
        
        </ScrollView>
        </KeyboardAvoidingView>
      );
  }
  
}

const styles = StyleSheet.create({
  container: {
    fontFamily:'monochrome',
    flex: 1,
   
    alignItems: 'center', 
   
    paddingTop:'30%',

  },
  item: {
    backgroundColor: '#fed8b1',
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 16,
    width:"93%",
    borderRadius:15,
    flexDirection:'row',
    justifyContent:'center'
  },
  title: {
    fontSize: 15,
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
  popup:{
    display:'flex',
    
  },
  error:{
    backgroundColor:"white",
    display:"flex",
    alignItems:'center',
    alignSelf:'center',
    borderRadius:10,
    padding:20,
    top:"40%",
    backgroundColor:'grey',
    
},
  

});
