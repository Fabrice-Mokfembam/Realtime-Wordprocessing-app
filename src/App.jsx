import React, { useState, useEffect } from "react";
import TextEditor from "./components/TextEditor";

import { createBrowserRouter,RouterProvider } from "react-router-dom";

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element:<TextEditor/>
    }, {
      path: '/documents/:name',
      element:<TextEditor/>
    }
  ])

  return (
    <RouterProvider  router={router}/>
  );
}

export default App;
