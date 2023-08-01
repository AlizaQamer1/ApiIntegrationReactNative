const styles = {
  detail: {
  
    backgroundColor: 'white',
    padding: 10,
  },
  image: {
    width: '90%',
    height: 270,
    marginHorizontal: 16,
    marginVertical: 20,

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
  }
};

export default styles;
