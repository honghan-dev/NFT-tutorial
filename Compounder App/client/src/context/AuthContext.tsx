// import React, { createContext, useContext, useState, useEffect } from 'react';

// type AuthProviderProps = {
//   children: React.ReactNode;
// }

// // Create the AuthContext with initial values
// export const AuthContext = createContext<{ user: User | null }>({ user: null });

// // AuthProvider component that wraps your application
// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<User | null>(null);

//   // You can use Firebase Auth or your preferred authentication method to set the user
//   useEffect(() => {
//     // Example: Firebase Auth state change listener
//     const unsubscribe = onAuthStateChanged((user: User) => {
//       if (user) {
//         setUser();
//       } else {
//         setUser(null);
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
// };

