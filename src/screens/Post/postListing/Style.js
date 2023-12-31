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
        marginHorizontal: 10,
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
        paddingHorizontal:10,
        paddingBottom:10
      },
      button: {
        backgroundColor: "rgba(0, 128, 128, 0.8)", 
        color: "white",
        padding: 10,
        paddingLeft: 30,
        marginHorizontal: 20,
        marginVertical:5,
        width: 150,
        borderRadius: 10,
        
      },
      commentbutton:{
        backgroundColor:"lightblue",
        marginLeft:"-2%"

      },
      buttonText:{
        color:"black",
        fontSize:16,
      
      },
      titlecontainer:{
        flexDirection:"row",
        padding:10,
        alignItems:"center",
       
      },
      heading:{
        textAlign:"justify",
        paddingRight:32,
        fontWeight:"bold"

      },
      image:{
        width:70,
        height:70,
        borderRadius:50,
       
        backgroundColor:"#D3D3D3",
        
      },
      body:{
        padding:10,
        textAlign:"justify",
       
      },
      addpostbutton:{
        width:100,
        marginHorizontal:20
      }
}

export default styles