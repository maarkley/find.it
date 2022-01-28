import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = (props) => {
    return <Link to={"/wiadomosci/" + props.slug} className="message-list-item">
                <div className="message-list-item__title">
                    {props.title}
                </div>
           </Link>
}

export default ListItem