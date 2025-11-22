import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Router } from './routes';
import { Toaster } from './utils/toast';

const App = () => {
  return (
    <>
      <RouterProvider router={Router} />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
        }}
      />
    </>
  );
};

export default App;