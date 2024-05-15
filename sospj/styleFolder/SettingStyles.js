import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8F5E9', // Matching with the common color scheme
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold', // Section titles are bold for emphasis
    color: '#2E7D32', // Consistent dark green
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures components align properly
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333', // A soft gray for text
  },
  socialIcons: {
    flexDirection: 'row',
  },
  socialIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  image2: {
    width: 250,
    height: 400,
    marginBottom: 20, // 이미지 아래에 여유 공간 추가
  },
  cancelButton: {
    backgroundColor: '#FF6347',
    borderRadius: 5,
    padding: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 13,
  },
  navigationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green', // 이쁜 파란색 배경
    borderRadius: 5, // 원형 버튼
    width: 50, // 버튼 크기
    height: 30, // 버튼 크기
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  navigationButtonText: {
    color: 'white', // 텍스트 색상
  },
  centeredView2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView2: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image22: {
    width: 250,
    height: 250,
    marginBottom: 20, // 이미지 아래에 여유 공간 추가
  },
});

export default styles;
