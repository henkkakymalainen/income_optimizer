import React from 'react';
import RSSParser from 'rss-parser';
import _ from 'lodash'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


const News = () => {
  const [items, setItems] = React.useState()
  const parser = new RSSParser();
  React.useEffect(() => {
    parser.parseURL('https://cors-anywhere.herokuapp.com/https://www.kela.fi/ajankohtaista-opiskelijat/-/asset_publisher/I7X3vuEkReGH/rss', (err, feed) => {
      if (err) throw err;
      console.log(feed.items)
      setItems(feed!.items!)
      })
    },[]);



  return !items ? <h1>Loading</h1>
      : (
        <div>
          <h1>Latest news from Kela</h1>
          {_.map(items,(entry: any) => {
            return (

              <div key={entry.title}>
                <br></br>
                <p>Date: {entry.date.toString().substring(0,10)}</p>
                <h4>{entry.title}</h4>
                <p>{entry.content}</p>
                <a href={entry.link}>Link to the News</a>
                <p>___________________________________________</p>
              </div>
            )
          })

          }
        </div>
      )
};

export default News;
