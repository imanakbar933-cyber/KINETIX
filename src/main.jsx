import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Home from "./pages/App.jsx";
import Members from './pages/Members.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
    <Members />
  </StrictMode>
)
