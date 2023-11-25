import NewsItem, { NewsItemProps } from "../Item/NewsItem";

import "./NewsList.css";

const NetoNews = (props: { news: NewsItemProps[] }) => {
  const { news } = props;

  return (
    <ul className="Neto-News">
      {news.map((item) => (
        <NewsItem key={item.id} {...item} />
      ))}
    </ul>
  );
};

export default NetoNews;
