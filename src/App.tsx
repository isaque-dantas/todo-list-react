// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import {Theme} from "@radix-ui/themes";
import {BrowserRouter, Route, Routes} from "react-router";
import {TaskViewerPage} from "./features/todo-viewer/pages/TaskViewerPage.tsx";
import {HeaderProvider} from "./shared/components/HeaderProvider.tsx";
import {NotFoundPage} from "./shared/pages/NotFoundPage.tsx";

export default function App() {
  return (
    <Theme>
      <BrowserRouter>
        <Routes>
          <Route element={<HeaderProvider/>}>
            <Route index element={<TaskViewerPage/>}/>
            <Route path="*" element={<NotFoundPage/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Theme>
  )
}
