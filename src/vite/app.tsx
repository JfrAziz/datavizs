import "./tailwind.css"
import React from 'react'
import ReactDOM from 'react-dom/client'
import Datavizs from "../app/datavizs"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Datavizs />
  </React.StrictMode>,
)
