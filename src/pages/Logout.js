import React, { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { Alert } from "react-bootstrap"

export default function Logout() {
  const {logout} = useAuth()
  const [error, setError] = useState("")
  let navigate = useNavigate();
  async function handleLogout() {
    setError("")
    try {
      await logout()
      navigate("/login", { replace: true });
    } catch {
      setError("Failed to log out")
    }
  }
  useEffect(() => {
    handleLogout();
  },[]);

  return (
   <>
   {error && <Alert variant="danger">{error}</Alert>}
   </>
  )
}
