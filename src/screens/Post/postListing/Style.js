const styles={
    container:{
        backgroundColor:"white",
        flex:1,
      
        
    },
    horizontalline:{
        borderBottomWidth:2,
        borderBottomColor:"black",
        marginHorizontal:16

    },
    list: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'left',
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginTop:10,
        marginBottom:10
      },
      listitem: {
        color: 'black',
        fontSize: 18,
        borderColor: '#ccc',
        backgroundColor: 'white',
        justifyContent: 'center',
        lineHeight: 26,
        textAlign: 'left',
        marginHorizontal: 16,
        textTransform: 'capitalize',
      },
      starcontainer:{
       
        marginLeft:16
      },
      likingcontainer:{
        flexDirection:"row",
        padding:10
      },
      button: {
        backgroundColor: "rgba(0, 128, 128, 0.8)", 
        color: "white",
        padding: 10,
        paddingHorizontal: 35,
        marginHorizontal: 20,
        marginVertical:5,
        width: 150,
        borderRadius: 10,
        
      },
      buttonText:{
        color:"black",
        fontSize:16
      },
      titlecontainer:{
        flexDirection:"row",
        padding:10
      },
      heading:{
        paddingTop:10,
        paddingRight:25,
        fontWeight:"bold"

      },
      image:{
        width:70,
        height:70,
        borderRadius:50,
       marginHorizontal:0
        
      },
      body:{
        padding:10,
        textAlign:"justify",
       
      }
}

export default styles