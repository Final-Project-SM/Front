import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    padding: 20,
    backgroundColor: '#E8F5E9', // Light green background
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#388E3C', // Dark green
    marginBottom: 10,
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  slogan: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666', // Gray color for the slogan
    marginBottom: 20,
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#388E3C', // Dark green button
    width: '70%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButtonText: {
    color: '#ffffff', // White text
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: '#388E3C', // Dark green border
    borderWidth: 2,
    width: '70%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#388E3C',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
});

export default styles;
