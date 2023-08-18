const styles = {
  detail: {
  
    backgroundColor: 'white',
    padding: 10,
 
  },
  image: {
    width: '90%',
    height: 270,
    marginHorizontal: 16,
    marginBottom: 20,
    marginTop:50

  },
  backicon:{
     
    width:25,
    height:25,
    marginTop:23
     

 },
  icon:{
    width:30,
    height:30

  },
  icons:{
    flexDirection:"row",
    textAlign:"center",
    justifyContent:"space-around",
    marginBottom: 20,

  },

  list: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'left',
    backgroundColor: 'white',
    marginHorizontal: 16,
  },
  listitem: {
    color: 'black',
    padding: 10,
    fontSize: 18,
    borderColor: '#ccc',
    backgroundColor: 'white',
    justifyContent: 'center',
    lineHeight: 26,
    textAlign: 'left',
    marginHorizontal: 16,
    textTransform: 'capitalize',
  },
  heading: {
    textTransform: 'uppercase',
    fontSize: 20,
  },
  categoryname: {
    color: '#2272a4',
  },
  ratingcontainer: {
    flexDirection: 'row',
  },
  pricecontainer: {
    flexDirection: 'row',
  },
  brandcontainer: {
    flexDirection: 'row',
  },
  instockcontainer: {
    flexDirection: 'row',
  },
  horizontalline: {
    borderTopWidth: 3,
    borderTopColor: '#C7C7CC',
    marginHorizontal: 16,
  },
  price: {
    textDecorationLine: 'line-through',
  },
  discountedprice: {
    color: 'red',
  },
  starcontainer:{
    
    padding:10
  },
  cartbutton:{
  marginTop:"-5%",
    marginRight:10,
    marginLeft:"auto",
   flexDirection:"row"
},
cartnumbering:{
    color:"teal",
    marginHorizontal:10,
    fontSize:18
}
};

export default styles;
