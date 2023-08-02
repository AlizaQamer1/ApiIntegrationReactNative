const styles={
    container:{
        backgroundColor:"white",
        flex:1
      
        
    },
    list: {
       marginTop:50,
        flex: 1,
        alignItems: 'left',
        backgroundColor: 'white',
        marginHorizontal: 16,
     
      },
      listitem: {
        color: 'black',
        fontSize: 18,
        borderColor: '#ccc',
        backgroundColor: 'white',
        justifyContent: 'center',
        lineHeight: 26,
        textAlign: 'left',
     
        textTransform: 'capitalize',
      },
      starcontainer:{
       
        marginHorizontal:10

      },
      likingcontainer:{
        flexDirection:"row",
        padding:10,
        borderWidth:1,
        borderColor:"gray",
        width:200,
        borderRadius:10,
        margin:10
      },
      commentcontainer:{
        flexDirection:"row",
        padding:10,
        borderWidth:1,
        borderColor:"gray",
        marginHorizontal:10,
        width:200,
        borderRadius:10,
      },
    

      titlecontainer:{
        flexDirection:"row",
        padding:10
      },
      heading:{
        
        paddingRight:25,
        fontWeight:"bold"

      },
      image:{
        width:70,
        height:70,
        borderRadius:50,
        backgroundColor:"rgba(250,250,250)",
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
      }
}

export default styles