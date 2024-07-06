import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import { toHaveAttribute } from '@testing-library/jest-dom/dist/matchers';

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,

    }
  }
  async componentDidMount() {
    /*let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=c7272e1971e14baa9a0e99b1c8437f5c";
    let data = await fetch(url);
    let parsedData = await data.json;
    console.log(parsedData);
    this.setState({ articles: parsedData.articles })*/ 
    this.setState({loading:true})
    fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=c7272e1971e14baa9a0e99b1c8437f5c&page=1&pageSize=${this.props.pageSize}`).then((res) => res.json())
      .then((json) => {
        this.setState({
          articles: json.articles,
          totalArticles: json.totalResults,
          DataisLoaded: true,
          loading:false,
        });
      });


  }
  handlePreviousClick = async () => {
    this.setState({loading:true})
    fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=c7272e1971e14baa9a0e99b1c8437f5c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`).then((res) => res.json())
      .then((json) => {
        this.setState({
          articles: json.articles,
        
          loading:false
        });
        this.setState({
          page: this.state.page - 1,
        })
      })
  }

  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize))){
      this.setState({loading:true})
      fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=c7272e1971e14baa9a0e99b1c8437f5c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`).then((res) => res.json())
      .then((json) => {
          this.setState({
            articles: json.articles,
            page: this.state.page + 1,
            loading:false
          });
        })
    }
  }
  


  render() {
    return (
      <div className="container " >
        
        <h1 className="text-center">Towards News-Top Headline </h1>
        {this.state.loading && <Spinner></Spinner>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4 my-1" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 75) : ""} description={element.description ? element.description.slice(0, 60) : ""} imageUrl={element.urlToImage} newsUrl={element
                .url}></NewsItem>
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr;Previous</button>
          <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
        </div>
      </div>
    )
  }
}

export default News