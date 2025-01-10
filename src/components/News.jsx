import React, { useEffect, useState } from 'react'
import NewItem from './NewItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import ScrollToTop from './ScroolToTop'

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalArticles, settotalArticles] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {

    props.setProgress(10);
    let url = `https://gnews.io/api/v4/top-headlines?category=${props.category}&lang=en&country=${props.country}&apikey=${props.apiKey}&page=${props.page}&pageSize=${props.pgSize}`;
    // let url = `https://gnews.io/api/v4/search?q=example&lang=en&country=${props.country}&apikey=${props.apiKey}&page=${page}&max=20`;
    // let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pgSize}`;
    let data = await fetch(url);
    if (data.status === 403) {
      props.switchApiKey();
      return;
    }
    props.setProgress(30);

    let parsedData = await data.json();

    props.setProgress(60);

    setArticles(parsedData.articles);
    settotalArticles(parsedData.totalArticles);
    setLoading(false);

    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} | NewsPulse`;
    updateNews();
  }, [props.apiKey]); // Re-run the effect when apiKey changes

  const fetchMoreData = async () => {
    setPage(page + 1);

    let url = `https://gnews.io/api/v4/top-headlines?category=${props.category}&lang=en&country=${props.country}&apikey=${props.apiKey}&page=${props.page}&pageSize=${props.pgSize}`;
    // let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pgSize}`;
    let data = await fetch(url);
    if (data.status === 403) {
      props.switchApiKey();
      return;
    }
    let parsedData = await data.json();
    console.log(parsedData)

    setArticles(articles.concat(parsedData.articles));
    settotalArticles(parsedData.totalArticles);
    setLoading(false);
  };

  return (
    <div className='container pt-10 py-4'>

      <h2 className="text-center " style={{ marginTop: "4rem", padding: "0.9rem 0 1rem" }}>Top Headlines - {capitalizeFirstLetter(props.category)} </h2>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles !== totalArticles}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4 " key={element.url}>
                <NewItem
                  title={element.title ? element.title.slice(0, 67) : "No title available"}
                  description={element.description ? element.description.slice(0, 75) : "No description available"}
                  imageUrl={element.image}
                  newsUrl={element.url}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            })}
            <div className='fixed-bottom p-5 d-flex justify-content-end '>
              <ScrollToTop />
            </div>
          </div>
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default News;