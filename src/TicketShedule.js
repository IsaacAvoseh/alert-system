import { Box, Container, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, Text, Button, VStack, Heading, Select } from '@chakra-ui/react'
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
    const [reception, setReception] = React.useState([])
    const [billing, setBilling] = React.useState([])
    // const [billing, setBilling] = React.useState([])
    const [newBilling, setNewBilling] = React.useState([])
    const [vital, setVital] = React.useState([])
    const [synlab, setSynlab] = React.useState([])
    const [pharmacy, setPharmacy] = React.useState([])
    const [users, setUsers] = React.useState([])
    const [dsisplay, setDisplay] = React.useState(true)
    const [data, setData] = React.useState([])
    const [appoved, setAppoved] = React.useState([])
    const [newAppoved, setNewAppoved] = React.useState([])
    const [dispenced, setDispenced] = React.useState([])
    const [newDispenced, setNewDispenced] = React.useState([])

    const beep = new UIfx(sound)

    const sst = () => {
        beep.play()
        console.log('first playdd')
    }

    const handleSubmit = (e) => {
        // e.preventDefault()
        setDisplay(false)
    }


    // let tkcCount = tickets.length
    const getNewTickets = () => {
        console.log('first')

        fetch('http://127.0.0.1:8000/api/mails')
            .then(res => res.json())
            .then(data => {
                console.log('All Data', data)
                setNewTickets(data.mails)
                // setBilling(data.billing)
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

    const getUsers = () => {
        fetch('http://127.0.0.1:8000/api/users')
            .then(res => res.json())
            .then(data => {
                console.log('All Data', data)
                setUsers(data.users)
            })
    }

    const getData = () => {
        fetch('http://127.0.0.1:8000/api/check')
            .then(res => res.json())
            .then(data => {
                console.log('billings data', data)
                setNewBilling(data.billings)
                setNewAppoved(data.approved)
                setNewDispenced(data.dispense)

                setData(data)
            })
    }


    React.useEffect(() => {
        getNewTickets()
        getUsers()
        getData()

        const timer = setInterval(getNewTickets, 10000);
        const timer1 = setInterval(getData, 10000);
        console.log('checking')
        return () => {
            clearInterval(timer);
            clearInterval(timer1);
        }
    }, [])


    React.useEffect(() => {
        console.log("compare newTickewts with the tickets")
        //compare newTickewts with the tickets
        console.log("oldTicket", tickets, "  newTickets", newTickets)
        if (newTickets.length > tickets.length) {
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

        if (newBilling.length > billing.length) {
            setBilling(newBilling)
            sst()
            toast('New Billing request', {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if (newAppoved.length > appoved.length) {
            setAppoved(newAppoved)
            let lastdata = newAppoved[newAppoved.length - 1]
            console.log('lastdata', lastdata)
            if (lastdata.approved == '1') {
                sst()
                toast('New Patient Checked in', {
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

        }

        if (newDispenced.length > dispenced.length) {
            setDispenced(newDispenced)
            let lastdata = newDispenced[newDispenced.length - 1]
            console.log('lastdata', lastdata)
            if (lastdata.dispensed == 'yes') {
                sst()
                toast('Result ready', {
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            }
        }

    }, [newTickets])


    return (
        <Container>
            <Button onClick={sst} > Play </Button>



            {
                dsisplay ?
                    <Box>
                        <Select placeholder='Select option'>
                            {
                                users?.map(item => {
                                    return (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    )
                                })
                            }
                        </Select>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </Box>
                    :
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

            }

        </Container>
    )
}

export default TicketShedule