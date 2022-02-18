import React from 'react'

class StockDetail extends React.Component{
    state={
        show: false
    }

    render(){
        const {name, total, stockEvents} = this.props
        const {show} = this.state
        return(
            <div className="StockDetail" onClick={() => this.setState({show: !show})}>
                <h2>Product: {name} | Total: {total}</h2>
                {show &&
                    <div>
                        {stockEvents.map(event =>(
                            <div className="StockEventsTable_Card">
                                <p>ID: {event.id}</p>
                                <p>TYPE: {event.type}</p>
                                <p>QUANTITY: {event.qty}</p>
                                <p>PRODUCT NAME: {event.product.name}</p>
                            </div>
                        ))}
                    </div>
                }
            </div>
        )
    }
}

export default StockDetail