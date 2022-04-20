import { Box, Container, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, Text, Button, VStack, Heading } from '@chakra-ui/react'
import React from 'react'
import sound from './ss.wav';
import useSound from 'use-sound'
import UIfx from 'uifx'
import { toast } from 'react-toastify';


function TicketShedule() {

    
    const [play, { stop, pause }] = useSound(sound);
    const data1 = JSON.parse(localStorage.getItem('tkt'))
    const [tickets, setTickets] = React.useState([])
    const [newTickets, setNewTickets] = React.useState([])
    const [recheck, setRecheck] = React.useState(true)
    const [ reception, setReception ] = React.useState([])
    const [ billing, setBilling ] = React.useState([])
    const [ vital, setVital ] = React.useState([])
    const [ synlab, setSynlab ] = React.useState([])
    const [ pharmacy, setPharmacy ] = React.useState([])

    const beep = new UIfx(sound)

    const sst = () => {
        beep.play()
        console.log('first playdd')
    }


    // let tkcCount = tickets.length
    const getNewTickets = () => {
        console.log('first')

        fetch('http://127.0.0.1:9000/api/mails')
            .then(res => res.json())
            .then(data => {
                console.log('All Data',data)
                setNewTickets(data.mails)    
                setBilling(data.billing)
                setReception(data.reception)
                setPharmacy(data.pharmacy)
                setVital(data.vital)
                setSynlab(data.synlab) 
            })

        console.log('rec', reception)
        console.log('rec', vital)
        console.log('rec', pharmacy)
        console.log('rec', tickets)


    }

    React.useEffect(() => {
        getNewTickets()

        const timer = setInterval(getNewTickets, 10000);
        console.log('checking')

        return () => clearInterval(timer);
    }, [])

    
    React.useEffect(() => {
        console.log("compare newTickewts with the tickets")  
        //compare newTickewts with the tickets
        console.log("oldTicket", tickets, "  newTickets", newTickets)
        if (newTickets.length > tickets.length){
            setTickets(newTickets)
            sst()
            toast('New Ticket', {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
       
    }, [newTickets])


    return (
      
        <Container>
            {/* <Button onClick={sst} > Play </Button> */}


            <Table variant='striped' colorScheme='teal'>
                <Thead>
                    <Tr>
                        <Th>Reception</Th>
                        <Th>Billing</Th>
                        <Th>Synlab</Th>
                        <Th>Vital</Th>
                        <Th>Pharmacy</Th>
                    </Tr>
                </Thead>
                <Tbody>

                    {
                        tickets?.map(item => {
                            return (
                                <Tr key={item.id}>
                                    <Td>{item.reception}</Td>
                                    <Td>{item.billing}</Td>
                                    <Td>{item.synlab}</Td>
                                    <Td>{item.vital}</Td>
                                    <Td>{item.pharmacy}</Td>
                                </Tr>
                            )
                        })

                    }
                </Tbody>
            </Table>

        </Container>
    )
}

export default TicketShedule