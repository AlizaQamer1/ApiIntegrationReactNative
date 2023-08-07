const styles={
  container:{
    flex:1,
    backgroundColor:"white"

  },
    list: {
        marginTop:20,
        alignItems: 'left',
        backgroundColor: 'white',
       
      
     
      },
      listitem: {
        color: 'black',
        fontSize: 18,
        borderColor: '#ccc',
        backgroundColor: 'white',
        justifyContent: 'center',
        lineHeight: 26,
        marginHorizontal: 16,
        textAlign: 'left',
        textTransform: 'capitalize',
      },
      like:{

       color:"lightblue",
        marginHorizontal:10

      },
      comment:{
        color:"gray",
        marginHorizontal:10

      },
      likingcontainer:{
        flexDirection:"row",
        padding:10,
        borderWidth:1,
        borderColor:"gray",
        width:200,
        borderRadius:10,
        marginVertical:10,
        marginHorizontal: 26,
      },
      commentcontainer:{
        flexDirection:"row",
        padding:10,
        borderWidth:1,
        borderColor:"gray",
        width:200,
        borderRadius:10,
        marginHorizontal: 26,
      },
    

      titlecontainer:{
        flexDirection:"row",
      },
      heading:{
        
        paddingRight:25,
        fontWeight:"bold"

      },
      image:{
        width:70,
        height:70,
        borderRadius:50,
        backgroundColor:"#D3D3D3",
       marginHorizontal:16
        
      },
      body:{
        padding:10,
        textAlign:"justify",
        color:"gray",
        fontSize:14
       
      },
      title:{
        padding:10
      },
      usercontainer:{
        flexDirection:"row",
        marginBottom:10,
        marginHorizontal:6
       
      },
      username:{
        paddingTop:30,
        fontSize:18,
        fontWeight:"bold",
        color:"black"
      },
      comments:{
        borderWidth:1,
     
        borderColor:"gray",
        margin:26
      },
      horizontalline:{
        borderBottomColor:"black",
        borderBottomWidth:1
      }
}

export default styles