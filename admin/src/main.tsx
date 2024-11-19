import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Admin from './Admin.tsx'
import './index.css'
import { ItemsProvider } from './Context/ItemsContext.tsx';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ItemsProvider>
      <Admin />
    </ItemsProvider>
    
  </StrictMode>
);
