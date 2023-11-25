import "./NewsItem.css";

export type NewsItemProps = {
  content: string;
  id: string;
  image: string;
  title: string;
};

const NewsItem = ({ content, title }: NewsItemProps) => {
  return (
    <li className="News-Item">
      <div className="Item-ImageWrap">
        <img
          src="https://fonoteka.top/uploads/posts/2022-01/1642965933_77-phonoteka-org-p-krasivii-fon-priroda-80.jpg"
          alt={title}
          className="Item-Image"
        />
      </div>
      <div className="Item-TitleWrap">
        <h3 className="Item-Title">{title}</h3>
      </div>
      <div className="Item-DescriptionWrap">
        <p className="Item-Description">{content}</p>
      </div>
    </li>
  );
};

export default NewsItem;
