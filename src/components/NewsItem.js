import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title, description, imageUrl,newsUrl}= this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
          <img src={!imageUrl?"https://images.indianexpress.com/2023/12/Neutron-star-mergers-20231228.jpg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}..</h5>
            <p className="card-text">{description}...</p>
            <a href = {newsUrl} target ="_blank" rel ="noreferrer" className="btn btn-dark">Get in detail</a>
           
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem