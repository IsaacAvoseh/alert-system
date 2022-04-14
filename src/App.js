
import './App.css';
import TicketShedule from './TicketShedule';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
    <ChakraProvider>
      <TicketShedule />  
    
    </ChakraProvider>
    
   </>
  );
}

export default App;
