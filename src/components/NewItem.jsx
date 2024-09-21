import React, { useState } from 'react'

const NewItem =(props)=>{
        const { title, description, imageUrl, newsUrl, date, source } = {props};
        return (
            <div className='container my-3 d-flex justify-content-center'>
            <div className="card shadow p-3 mb-3 rounded d-flex justify-content-center" style={{ width: "21rem"}}>
                <a href={props.newsUrl}><img src={props.imageUrl ? props.imageUrl : "https://media.istockphoto.com/id/1212994499/photo/online-news-on-a-smartphone-woman-reading-news-or-articles-in-a-mobile-phone-screen.jpg?s=612x612&w=0&k=20&c=JMWqSlIFkJpprukRp5GqdyzZjh5HWFYcsQGLiUVNJ7g="} className="card-img-top" alt="newsImage" /></a>
                <div className="card-body">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger " style={{left:"50%",zIndex:1}}>                        
                        {props.source}
                        <span className="visually-hidden">{props.source}</span>
                    </span>
                        <h5 className="card-title">{props.title}...</h5>
                        <p className="card-text">{props.description}...</p>
                        <p className="card-text "><small className="text-danger ">Published at {props.date}</small></p>
                        <a href={props.newsUrl} target="_blank" className="btn btn-dark d-flex justify-content-center">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default NewItem
