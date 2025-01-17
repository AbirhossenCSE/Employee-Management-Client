import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProviders from './providers/AuthProviders';
const queryClient = new QueryClient()



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviders>
      <QueryClientProvider client={queryClient}>
        <div className='w-11/12 mx-auto'>
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProviders>
  </StrictMode>,
)
