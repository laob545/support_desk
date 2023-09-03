import { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import { useSelector, useDispatch} from 'react-redux'
import { getTicket, reset, closeTicket} from '../features/tickets/ticketSlice'
import { useParams, useNavigate } from 'react-router-dom'
import Backbutton from '../components/BackButton'
import Spinner from '../components/Spinner'

function Ticket() {
    const {ticket, isLoading, isSuccess, isError, message} =useSelector((state)=> state.tickets) 
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {ticketId} = useParams()
    const [formData, setFormData] = useState({
        product: ticket.product,
        description:ticket.description
})
    useEffect(() => {
       if(isError){
        toast.error(message)
       } 
       dispatch(getTicket(ticketId))
       //eslint-disable-next-line
    },[isError, message, ticketId])

//Close ticket
const onTicketClose = ()=>{
    dispatch(closeTicket(ticketId))
    toast.success('Ticked closed')
    navigate('/tickets')
}

    if(isLoading){ 
        return <Spinner/>
    }

    if(isError){
        return <h3>Something went wrong</h3>
    }

  return (

    <div className='ticket-page'>
        <header className="ticker-header">
            <Backbutton url='/tickets'/>
            <h2>Ticket ID:{ticket._id}
            <span className={`status status-${ticket.status}`}>{ticket.status} </span></h2>
            <h3>Date submitted: {new Date(ticket.createdAt).toLocaleString('ro')}</h3>
           
           <h3>Product:{ticket.product}</h3> <hr/>
            <div className="ticket-desc"><h3>Description of the issue</h3>
            <p>{ticket.description}</p></div>
            <label htmlFor="product">Product</label>
                <input name="product" id="product" value={formData.product} onChange={(e)=>setFormData({...formData, product:e.target.value})}></input>
            <label htmlFor="description">Description</label>
                <input name="description" id="description" value={formData.description} onChange={(e)=>setFormData({...formData, description:e.target.value})}></input>
        </header>
        {ticket.status !== 'closed' && (
            <button onClick={onTicketClose} className='btn btn-block btn-danger'>Close Ticket</button>
        )}
    </div>
  )
}

export default Ticket