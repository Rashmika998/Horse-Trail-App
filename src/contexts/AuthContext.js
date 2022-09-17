import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../utils/firestore"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password, fName, lName, telNo) {
    auth.createUserWithEmailAndPassword(email, password).then(cred=>{
      return db.collection('users').doc(cred.user.uid).set({
        firstName:fName,
        lastName: lName,
        mobileNo: telNo,
        type: 'user'
      })
    })
  }

  async function signupAdmin(email, password, fName, lName, telNo) {
    auth.createUserWithEmailAndPassword(email, password).then(cred=>{
      db.collection('users').doc(cred.user.uid).set({
        firstName:fName,
        lastName: lName,
        mobileNo: telNo,
        type: 'admin'
      }) 
    })
    await logout();
  }


  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    signupAdmin,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}