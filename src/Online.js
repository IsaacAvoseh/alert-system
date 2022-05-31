import { Box, Container, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, Text, Button, VStack, Heading, Select, Flex, Divider } from '@chakra-ui/react'
import React from 'react'
import sound from './ss.wav';
import useSound from 'use-sound'
import UIfx from 'uifx'
import { toast } from 'react-toastify';


function Online() {


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
    const [newPharmacy, setNewPharmacy] = React.useState([])
    const [laboratory, setLaboratory] = React.useState([])
    const [newLaboratory, setNewLaboratory] = React.useState([])
    const [users, setUsers] = React.useState([])
    const [dsisplay, setDisplay] = React.useState(true)
    const [data, setData] = React.useState([])
    const [appoved, setAppoved] = React.useState([])
    const [newAppoved, setNewAppoved] = React.useState([])
    const [dispenced, setDispenced] = React.useState([])
    const [newDispenced, setNewDispenced] = React.useState([])
    const [userType, setUserType] = React.useState('')

    const beep = new UIfx(sound)

    const sst = () => {
        beep.play()
        console.log('first playdd')
    }

    const handleSubmit = () => {
        // e.preventDefault()
        console.log('type', userType)
        setDisplay(false)
    }


    // let tkcCount = tickets.length
    const getNewTickets = () => {
        console.log('first')

        // fetch('http://127.0.0.1:8000/api/mails')
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log('All Data', data)
        //         setNewTickets(data.mails)
        //         // setBilling(data.billing)
        //         setReception(data.reception)
        //         setPharmacy(data.pharmacy)
        //         setVital(data.vital)
        //         setSynlab(data.synlab)
        //    })

        // console.log('rec', reception)
        // console.log('rec', vital)
        // console.log('rec', pharmacy)
        // console.log('rec', tickets)


    }

    const getUsers = () => {
        fetch()
            .then(res => res.json())
            .then(data => {
                console.log('All Data', data)
                setUsers(data.users)
            })
    }

    const getData = () => {
        // toast.success('New Data Found')

        fetch('http://127.0.0.1:800/api/check')
            //http://192.168.1.30/alert-system/alert/public/api/check
            .then(res => res.json())
            .then(data => {
                console.log('billings data', data)
                setNewBilling(data.billings)
                setNewAppoved(data.approved)
                setNewDispenced(data.dispense)
                setNewPharmacy(data.pharmacy)
                setNewLaboratory(data.laboratory)
                // toast.success('New Data Found')
                setData(data)
            })
    }

    const handleRole = (item) => {
        let type = setUserType(item.role)
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
        console.log('newBilling', newBilling)

        if (newBilling.length > billing.length) {
            console.log('newBilling', newBilling)
            setBilling(newBilling)
            if (userType == '5') {
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

            if (userType == '3') {
                sst()
                toast('New Patient', {
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }

        if (newAppoved.length > appoved.length) {
            setAppoved(newAppoved)
            let lastdata = newAppoved[newAppoved.length - 1]
            console.log('lastdata', lastdata)
            if (lastdata.approved == '1') {
                if (userType == '5') {
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

        }

        if (newDispenced.length > dispenced.length) {
            setDispenced(newDispenced)
            let lastdata = newDispenced[newDispenced.length - 1]
            console.log('lastdata', lastdata)
            if (lastdata.dispensed == 'Yes') {
                if (userType == '7') {
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
        }

    }, [newBilling])


    return (
        <Container>
            {/* <Button onClick={sst} > Play </Button> */}



            {
                dsisplay ?
                    <Box p={10}>
                        <Flex direction={'column'} justifyContent='center' alignItems={'center'} >
                            <Select value={userType} onChange={(e) => setUserType(e.target.value)} placeholder='Select option'>
                                {
                                    users?.map(item => {
                                        return (
                                            <option key={item.id} value={item.role}>{item.username}</option>
                                        )
                                    })
                                }
                            </Select>
                            <Divider />
                            <Button mt={5} width={'200px'} colorScheme={'blue'} onClick={handleSubmit}>Submit</Button>
                        </Flex>
                    </Box>
                    : ' '

            }

        </Container>
    )
}

export default Online