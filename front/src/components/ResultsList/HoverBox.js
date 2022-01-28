import React from 'react'

const HoverBox = (props) => {
    let wrapperClass = props.show ? 'show' : ''
    return <div className={"hover-box " + wrapperClass}>
                <div className="thumb">
                    <img src="img/header.jpeg"></img>
                </div>
                <div className="info">
                    <div className="block">
                        <h5 className="title">
                            Opis
                        </h5>
                        <div className="txt">
                            {props.description}
                        </div>
                    </div>
                    <div className="block">
                        <h5 className="title">
                            Znaki szczególne
                        </h5>
                        <div className="txt">
                            {props.tags}
                        </div>
                    </div>                
                </div>                
           </div>

}

export default HoverBox