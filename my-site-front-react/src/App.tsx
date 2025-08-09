import { useEffect, useState } from 'react'
import './App.css'
import AppRoutes from './router';

function App() {

  useEffect(() => {
    console.info(
      "%c bili-fe-mirror %c v" + "2.0.2",
      "padding: 2px 6px; border-radius: 3px 0 0 3px; color: #fff; background: #FF6699; font-weight: bold;",
      "padding: 2px 6px; border-radius: 0 3px 3px 0; color: #fff; background: #FF9999; font-weight: bold;"
    );
  }, []);
  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
