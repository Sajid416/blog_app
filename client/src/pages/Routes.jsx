import { BrowserRouter, createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import App from '../App';
import Blog from './Blog';
import About from './About';
import Contact from './Contact';
import Add from './Add';
import Services from './Services';
import All from '../category/All';
import DetailsPage from '../category/DetailsPage';
const router=createBrowserRouter([
    {
        path:"/",
        Component:App,
        children:[
            {
            index:true,
            Component:Home,
            },
             {
            path:"/details/:id",
            Component:DetailsPage,
            }, 
             {
              path:"services",
              Component:Services,
            },
            {
              path:"add",
              Component:Add,
            },
            {
                path:"about" ,
                Component:About,
            },
            {
                path:"contact",
                Component:Contact,
            },
            {
                path:"all",
                Component:All,
            },           
          
           ]
    },
    
]);
export default router;