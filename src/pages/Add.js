import React from 'react'
import { Link } from "react-router-dom";
import { Button } from '../components/Buttons/Button';
import '../components/AddPage/Add.css';

export default function Add() {
  return (
    
     <div className='hero-container'>
      <h1>ADD TRAIL OR CAMP</h1>
      <p>Select what you want to add</p>
      <div className='hero-btns'>
        <Link to='/add-trail'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          ADD TRAIL
        </Button>
        </Link>
        <Link to="/add-camp">
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          ADD CAMP 
        </Button>
        </Link>
      </div>
    </div>
  )
}