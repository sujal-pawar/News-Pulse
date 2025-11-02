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
    try {
      let url;
      
      // Check if we're in development (localhost) or production (Vercel)
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Local development - use direct GNews API
        url = `https://gnews.io/api/v4/top-headlines?category=${props.category}&lang=en&country=${props.country}&apikey=${props.apiKey}&page=${props.page}&pageSize=${props.pgSize}`;
        console.log('Local development - using direct GNews API');
      } else {
        // Production (Vercel) - use internal API endpoint
        url = `/api/news?category=${props.category}&country=${props.country}&page=${props.page}&pageSize=${props.pgSize}&apiKeyIndex=${props.apiKeyIndex || 0}`;
        console.log('Production - using Vercel API endpoint:', url);
      }
      
      console.log('Fetching news from:', url);
      let data = await fetch(url);
      console.log('Response status:', data.status);
      
      if (data.status === 403) {
        console.log('403 error - switching API key');
        props.switchApiKey();
        return;
      }
      
      if (!data.ok) {
        console.error('API request failed:', data.status, data.statusText);
        const errorText = await data.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP ${data.status}: ${errorText}`);
      }
      
      props.setProgress(30);

      let parsedData = await data.json();
      console.log('Parsed data:', parsedData);

      props.setProgress(60);

      // Add safety checks for the response data
      if (parsedData && parsedData.articles && Array.isArray(parsedData.articles)) {
        console.log('Setting articles:', parsedData.articles.length, 'articles');
        setArticles(parsedData.articles);
        settotalArticles(parsedData.totalArticles || 0);
      } else {
        console.error('Invalid API response structure:', parsedData);
        // Check if it's an error response from our API
        if (parsedData.error) {
          console.error('API Error:', parsedData.error);
          if (parsedData.shouldSwitchKey) {
            props.switchApiKey();
            return;
          }
        }
        setArticles([]); // Set empty array as fallback
        settotalArticles(0);
      }
      
      setLoading(false);
      props.setProgress(100);
      
    } catch (error) {
      console.error('Error fetching news:', error);
      setArticles([]); // Set empty array on error
      settotalArticles(0);
      setLoading(false);
      props.setProgress(100);
    }
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} | NewsPulse`;
    updateNews();
  }, [props.apiKey]); // Re-run the effect when apiKey changes

  const fetchMoreData = async () => {
    setPage(page + 1);

    try {
      let url;
      
      // Check if we're in development (localhost) or production (Vercel)
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Local development - use direct GNews API
        url = `https://gnews.io/api/v4/top-headlines?category=${props.category}&lang=en&country=${props.country}&apikey=${props.apiKey}&page=${page + 1}&pageSize=${props.pgSize}`;
      } else {
        // Production (Vercel) - use internal API endpoint
        url = `/api/news?category=${props.category}&country=${props.country}&page=${page + 1}&pageSize=${props.pgSize}&apiKeyIndex=${props.apiKeyIndex || 0}`;
      }
      
      let data = await fetch(url);
      
      if (data.status === 403) {
        props.switchApiKey();
        return;
      }
      
      let parsedData = await data.json();

      // Add safety checks for the response data
      if (parsedData && parsedData.articles && Array.isArray(parsedData.articles)) {
        setArticles(articles.concat(parsedData.articles));
        settotalArticles(parsedData.totalArticles || 0);
      } else {
        console.error('Invalid API response in fetchMoreData:', parsedData);
      }
      
      setLoading(false);
      
    } catch (error) {
      console.error('Error fetching more news:', error);
      setLoading(false);
    }
  };

  return (
    <div className='container pt-10 py-4'>

      <h2 className="text-center " style={{ marginTop: "4rem", padding: "0.9rem 0 1rem" }}>Top Headlines - {capitalizeFirstLetter(props.category)} </h2>
      <InfiniteScroll
        dataLength={articles ? articles.length : 0}
        next={fetchMoreData}
        hasMore={articles && articles.length !== totalArticles}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles && articles.length > 0 ? articles.map((element) => {
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
            }) : (
              <div className="col-12 text-center">
                <p>No news articles available at the moment.</p>
              </div>
            )}
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