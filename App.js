import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from './localdb';
import db from './localdb'
console.log(db["the"].chunks)

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      chunks: [],
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#9c8210'}
          centerComponent={{
            text: 'Monkey Chunky',
            style: { color: '#fff', fontSize: 20 },
          }}
        />
        <Image
        style={styles.imageIcon}
        source={{
          uri: 'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png',

        }}/>
        <TextInput
          style={styles.inputBox}
          onChangeText={text => {
            this.setState({ text: text,
            isSearchPressed:false,
            word:"Loading...",
            lexicalCategory: '',
            examples: [],
            definition:"",
            });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ chunks: db[this.state.text].chunks });
          }}>
          <Text style={styles.buttonText}>GO</Text>
        </TouchableOpacity>
        <View>
        {this.state.chunks.map(item=> {
          return(
            <TouchableOpacity
            style={styles.searchButton}
            >
         <Text style={styles.displayText}>{item}</Text>
          </TouchableOpacity>
           );
         })}
         </View>
      </View>
    );
  }
}
getWord=(word)=>{
  var searchKeyword=word.toLowerCase();
  var url="https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
  return fetch(url)
  .then((data)=>{
   if(data.status===200){
     return data.json()
   } else{
    return null
   }
  })
  .then((response)=>{
    var responseObject=response;
    if(responseObject){
      var wordData=responseObjects.definitions[0];
      var definition=wordData.description
      var lexicalCategory=wordData.wordType
      var word=dictionary[text]["word"]
      var lexicalCategory=dictionary[text]["lexicalCategory"]
      var definition=dictionary[text]["definition"]
      this.setState({
        "word":this.state.text,
        "definition":definition,
        "lexicalCategory":lexicalCategory,
      })
    }
  })
 
}else{
  this.setState({
    "word":this.state.text,
    definition:"notFound",
  });
};
if(this.isSearchPressed.isNotAvailable.localdb){
  text("Sorry, Word Not Found");
}
getWord=(text)=>{
  var text=text.toLowerCase()
  try{
  var word =dictionary[text]["word"]
  var lexicalCategory=dictionary[text]["lexicalCategory"]
  var definition=dictionary[text]["definition"]
  this.setState({
    word:word,
    lexicalCategory:lexicalCategory,
    definition:definition,
  })
  } 
  catch(err){
    text("Sorry This Word Is Not Avaqilable For Now");
    this.setState({
      'text':'',
      isSearchPressed:false,
    })

    
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 200,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  displayText: {
    textAlign: 'center',
    fontSize: 30,
  },
  imageIcon:{
    width:150,
    height:150,
    marginLeft:95,
  },
  chunkButton:{ width: '60%', height: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10, margin: 5, backgroundColor: 'red' }
});
