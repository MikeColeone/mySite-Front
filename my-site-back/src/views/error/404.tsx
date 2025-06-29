import img404 from "@/assets/404_images/404.png";
import imgCloud from "@/assets/404_images/404_cloud.png";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss"; // 假设使用 CSS Modules

const NotFound: React.FC = () => {
  const message = "找不到网页！";

  return (
    <div className={styles["wscn-http404-container"]}>
      <div className={styles["wscn-http404"]}>
        <div className={styles["pic-404"]}>
          <img className={styles["pic-404__parent"]} src={img404} alt="404" />
          <img
            className={`${styles["pic-404__child"]} ${styles.left}`}
            src={imgCloud}
            alt="404"
          />
          <img
            className={`${styles["pic-404__child"]} ${styles.mid}`}
            src={imgCloud}
            alt="404"
          />
          <img
            className={`${styles["pic-404__child"]} ${styles.right}`}
            src={imgCloud}
            alt="404"
          />
        </div>
        <div className={styles.bullshit}>
          <div className={styles["bullshit__oops"]}>404错误!</div>
          <div className={styles["bullshit__headline"]}>{message}</div>
          <div className={styles["bullshit__info"]}>
            对不起，您正在寻找的页面不存在。尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。
          </div>
          <Link to="/index" className={styles["bullshit__return-home"]}>
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
