// HomeStyle.js
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '120%', // increased by 20%
    flex: 1,
    padding: 15,
  },
  contentsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contents1: {
    width: 186, // increased by 20%
    height: 186, // increased by 20%
    backgroundColor: '#E8F5E9',
    borderColor: 'black',
    borderRadius: 18, // increased by 20%
    marginTop: 35, // increased by 20%
    marginRight: 8.4, // increased by 20%
  },
  contents3: {
    width: 390, // increased by 20%
    height: 220, // increased by 20%
    backgroundColor: '#FFFDD0',
    borderColor: 'black',
    borderRadius: 18, // increased by 20%
    marginTop: 17, // increased by 20%
    alignItems: 'center',
  },
  contents4: {
    width: 390, // increased by 20%
    height: 96, // increased by 20%
    backgroundColor: '#FFD1DC',
    borderColor: 'black',
    borderRadius: 18, // increased by 20%
    marginTop: 17, // increased by 20%
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24, // increased by 20%
  },
  contents11: {
    width: 72, // increased by 20%
    height: 60, // increased by 20%
    borderRadius: 18, // increased by 20%
    backgroundColor: 'white',
    margin: 6, // increased by 20%
    marginTop: 8.4, // increased by 20%
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  contents21: {
    width: 156, // increased by 20%
    height: 60, // increased by 20%
    borderRadius: 18, // increased by 20%
    backgroundColor: 'white',
    margin: 10.8, // increased by 20%
    marginTop: 8.4, // increased by 20%
    padding: 12, // increased by 20%
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contents26: {
    width: 66, // increased by 20%
    height: 60, // increased by 20%
    borderRadius: 18, // increased by 20%
    backgroundColor: 'white',
    margin: 10.8, // increased by 20%
    marginTop: 10.8, // increased by 20%
    padding: 12, // increased by 20%
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contents31: {
    width: 144, // increased by 20%
    height: 144, // increased by 20%
    borderRadius: 18, // increased by 20%
    backgroundColor: 'white',
    margin: 10.8, // increased by 20%
    marginTop: 8.4, // increased by 20%
    padding: 12, // increased by 20%
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contents2: {
    width: 186, // increased by 20%
    height: 186, // increased by 20%
    backgroundColor: '#ADD8E6',
    borderColor: 'black',
    borderRadius: 18, // increased by 20%
    marginTop: 35, // increased by 20%
    marginLeft: 8.4, // increased by 20%
  },
  headerImage: {
    width: '100%',
    marginTop: 12, // increased by 20%
    height: 204, // increased by 20%
    borderRadius: 24, // increased by 20%
    marginBottom: 24, // increased by 20%
  },
  headerText: {
    fontSize: 57.6, // increased by 20%
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12, // increased by 20%
  },

  contactText: {
    color: '#212121',
    fontSize: 12, // increased by 20%
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },

  graphText: {
    color: '#212121',
    fontWeight: 'bold',
    margin: 6, // increased by 20%
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  police: {
    flexDirection: 'row',
    margin: 12, // increased by 20%
  },
  image: {
    width: 48, // increased by 20%
    height: 48, // increased by 20%
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 26.4, // increased by 20%
  },
  modalView: {
    margin: 24, // increased by 20%
    backgroundColor: 'white',
    borderRadius: 24, // increased by 20%
    padding: 42, // increased by 20%
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2.4, // increased by 20%
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.8, // increased by 20%
    elevation: 6,
  },
  modalText: {
    marginBottom: 18, // increased by 20%
    textAlign: 'center',
    fontSize: 19.2, // increased by 20%
  },
  image2: {
    width: 240, // increased by 20%
    height: 540, // increased by 20%
    marginBottom: 24, // increased by 20%
  },
  cancelButton: {
    backgroundColor: '#FF6347',
    borderRadius: 6, // increased by 20%
    padding: 12, // increased by 20%
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 15.6, // increased by 20%
  },
  navigationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 6, // increased by 20%
    width: 60, // increased by 20%
    height: 36, // increased by 20%
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12, // increased by 20%
  },
  navigationButtonText: {
    color: 'white',
  },
  image3: {
    width: 36, // increased by 20%
    height: 36, // increased by 20%
  },
  image4: {
    width: 84, // increased by 20%
    height: 84, // increased by 20%
  },
  serviceText: {
    fontSize: 12, // increased by 20%
    fontWeight: 'bold',
    margin: 6, // increased by 20%
  },
  activeServiceTitle: {
    fontSize: 19.2, // increased by 20%
    fontWeight: 'bold',
    color: '#F44336',
  },
  serviceTitle: {
    fontSize: 19.2, // increased by 20%
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: 'skyblue',
    width: 72, // increased by 20%
    height: 72, // increased by 20%
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12, // increased by 20%
  },
  stopButton: {
    backgroundColor: '#F44336',
    width: 72, // increased by 20%
    height: 72, // increased by 20%
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12, // increased by 20%
  },
  statusImage: {
    width: 60, // increased by 20%
    height: 60, // increased by 20%
    marginBottom: 6, // increased by 20%
  },
  imageBackground: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 60, // increased by 20%
    height: 72, // increased by 20%
  },
  newscontainer: {
    position: 'absolute',
    bottom: 24, // increased by 20%
    left: 156, // increased by 20%
    width: 240, // increased by 20%
    marginTop: 24, // increased by 20%
  },
  text: {
    fontSize: 12, // increased by 20%
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  fullScreenVideo: {
    width: '100%',
    height: '100%',
  },
  editButton: {
    position: 'absolute',
    top: 21.6, // increased by 20%
    right: 30, // increased by 20%
    paddingVertical: 2.4, // increased by 20%
    paddingHorizontal: 6, // increased by 20%
    borderRadius: 6, // increased by 20%
  },
  editButtonText: {
    color: 'grey',
    fontSize: 9.6, // increased by 20%
  },
  centeredViewText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 26.4, // increased by 20%
  },
  modalViewText: {
    margin: 24, // increased by 20%
    backgroundColor: 'white',
    borderRadius: 24, // increased by 20%
    padding: 42, // increased by 20%
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2.4, // increased by 20%
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.8, // increased by 20%
    elevation: 6,
  },
  buttonContainerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18, // increased by 20%
  },
  textInputText: {
    height: 48, // increased by 20%
    borderColor: 'gray',
    borderWidth: 1.2, // increased by 20%
    marginBottom: 12, // increased by 20%
    width: '100%',
    paddingHorizontal: 12, // increased by 20%
    borderStyle: 'dotted',
  },
  modalTextText: {
    marginBottom: 18, // increased by 20%
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 1.2, // increased by 20%
    padding: 12, // increased by 20%
  },
  modalTextText2: {
    marginBottom: 18, // increased by 20%
    textAlign: 'center',
    fontSize: 12, // increased by 20%
    color: 'red',
  },
  closeButton: {
    position: 'absolute',
    top: 12, // increased by 20%
    right: 12, // increased by 20%
  },
  closeButtonText: {
    fontSize: 28.8, // increased by 20%
    color: 'black',
  },
  sendButton: {
    borderRadius: 6, // increased by 20%
    padding: 7.2, // increased by 20%
    backgroundColor: '#FF6347',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  contactsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  addContact: {
    padding: 24, // increased by 20%
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 30, // increased by 20%
    marginTop: 12, // increased by 20%
  },
  addContactText: {
    color: '#000',
    fontSize: 19.2, // increased by 20%
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  contactContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactImage: {
    width: 42, // increased by 20%
    height: 42, // increased by 20%
    marginBottom: 3.6, // increased by 20%
  },
});

export default styles;
