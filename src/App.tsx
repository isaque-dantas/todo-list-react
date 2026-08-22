// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import {Theme} from "@radix-ui/themes";
import {BrowserRouter, Route, Routes} from "react-router";
import {TaskInteractiveViewerPage} from "./features/task-interactive-viewer/pages/TaskInteractiveViewerPage.tsx";
import {HeaderProvider} from "./shared/components/HeaderProvider.tsx";
import {NotFoundPage} from "./shared/pages/NotFoundPage.tsx";
import {TaskViewerPage} from "./features/task-viewer/pages/TaskViewerPage.tsx";
import {TaskItemAdderPage} from "./features/task-item-form/pages/TaskItemAdderPage.tsx";
import {TaskItemEditorPage} from "./features/task-item-form/pages/TaskItemEditorPage.tsx";
import {TaskGroupAdderPage} from "./features/task-group-form/pages/TaskGroupAdderPage.tsx";
import {TaskGroupEditorPage} from "./features/task-group-form/pages/TaskGroupEditorPage.tsx";
import {LoginPage} from "./features/user/pages/LoginPage.tsx";
import {SignUpPage} from "./features/user/pages/SignUpPage.tsx";

export default function App() {
  return (
    <Theme>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route element={<HeaderProvider/>}>
            <Route index element={<TaskViewerPage/>}/>

            <Route path="/tarefas/adicionar" element={<TaskItemAdderPage/>}/>
            <Route path="/tarefas/:id/editar" element={<TaskItemEditorPage/>}></Route>

            <Route path="/grupos/adicionar" element={<TaskGroupAdderPage/>}/>
            <Route path="/grupos/:id/editar" element={<TaskGroupEditorPage/>}></Route>

            <Route path="/cadastro" element={<SignUpPage/>}></Route>

            <Route path="/ver-tarefas-interativas" element={<TaskInteractiveViewerPage/>}/>
            <Route path="*" element={<NotFoundPage/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Theme>
  )
}
