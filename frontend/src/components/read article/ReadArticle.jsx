import React from "react";
import styles from "./ReadArticle.module.css";
import ArticleHeader from "./ArticleHeader";
import ArticleBody from "./ArticleBody";
import RelatedArticle from "./RelatedArticle";
import Footer from "../Footerpage/Footer";
import Navbar from "../landingPage/Navbar/Navbar";
import ReadArticleNewsletter from "./ReadArticleNewsletter";
const ReadArticle = () => {
  return (
    <main className={styles.container}>
      <Navbar />
      <ArticleHeader />
      <ArticleBody />
      <RelatedArticle />
      <ReadArticleNewsletter />
      <Footer />
    </main>
  );
};

export default ReadArticle;
