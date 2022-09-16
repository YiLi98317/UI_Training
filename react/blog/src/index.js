import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const data = {
  author: "Yi Li",
  content: {
    blogs: [
      {
        img: {
          src: "https://www.w3schools.com/w3images/woods.jpg",
          alt: "Nature"
        },
        title: "TITLE HEADING",
        desc: "Title description",
        date: "April 7, 2014"
      },
      {
        img: {
          src: "https://www.w3schools.com/w3images/bridge.jpg",
          alt: "Norway"
        },
        title: "BLOG ENTRY",
        desc: "Title description",
        date: "April 2, 2014"
      }
    ],
    intro: {
      posts: [
        {
          href: "https://yili98317.github.io/UI_Training/table/table.html",
          src: "https://www.w3schools.com/w3images/workshop.jpg",
          alt: "Image",
          title: "HTML Table",
          desc: "To Simple Table"
        },
        {
          href: "https://yili98317.github.io/UI_Training/table/table.html",
          src: "https://www.w3schools.com/w3images/workshop.jpg",
          alt: "Image",
          title: "HTML Table",
          desc: "To Simple Table"
        },
        {
          href: "https://yili98317.github.io/UI_Training/table/table.html",
          src: "https://www.w3schools.com/w3images/gondol.jpg",
          alt: "Image",
          title: "HTML Table",
          desc: "To Simple Table"
        },
        {
          href: "https://yili98317.github.io/UI_Training/table/table.html",
          src: "https://www.w3schools.com/w3images/skies.jpg",
          alt: "Image",
          title: "Dorum",
          desc: "Ultricies congue"
        },
        {
          href: "https://yili98317.github.io/UI_Training/table/table.html",
          src: "https://www.w3schools.com/w3images/rock.jpg",
          alt: "Image",
          title: "Mingsum",
          desc: "Lorem ipsum dipsum"
        },
      ],
      labels: [
        {
          tag: "Sports",
        },
        {
          tag: "Travel",
        },
        {
          tag: "New York",
        },
        {
          tag: "London",
        },
        {
          tag: "IKEA",
        },
      ]
    }
  }
}
root.render(
  <React.StrictMode>
    <App data={data} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
