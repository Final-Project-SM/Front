import React, {createContext, useState, useContext} from 'react';

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [user, setUser] = useState({
    id: 's',
    name: '',
    age: '',
    gender: '',
    uid: '',
    phone: '',
    fcm: '',
    pid: ''
  });

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

// 훅을 만들어서 컴포넌트에서 쉽게 사용할 수 있도록 합니다.
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    console.log('UserContext Error');
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};