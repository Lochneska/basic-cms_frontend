import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'

import React from 'react'
import ReactDOM from 'react-dom/client'
import MainView from './views/MainView.tsx'
import ContentView from './views/ContentView.tsx'
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ContentFormView from './views/ContentFormView.tsx'
import ArchiveAccordion from './views/ArchiveView.tsx'
import './style.css';


const queryClient = new QueryClient();

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<MainView />} />
            <Route path="content/:contentId" element={<ContentView/>}/>
            <Route path="updatecontent/:contentId" element={<ContentFormView/>}/>
            <Route path="createcontent" element={<ContentFormView/>}/>
            <Route path="viewarchive/:contentId" element={<ArchiveAccordion/>}/>
        </Route>
    ))


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <RouterProvider router={router} />
            </ChakraProvider>
        </QueryClientProvider>
    </React.StrictMode>
)
