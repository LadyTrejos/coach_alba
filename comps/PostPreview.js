import styles from "../styles/styles.scss";

export default function PostPreview() {
  return (
    <div className={`${styles.postcard} ${styles.card}`}>
      <div className={styles.wrapper}>
        <img src="tatiana.png" className={styles.thumbnail} />
        <div className={styles.date}>
          <span className={styles.day}>12</span>
          <span className={styles.month}>Aug</span>
          <span className={styles.year}>2016</span>
        </div>
        <div className={styles.data}>
          <div className={styles.content}>
            <span className={styles.author}>Jane Doe</span>
            <h1 className={styles.postTitle}>
              <a href="#">Boxing icon has the will for a couple more fights</a>
            </h1>
            <p className={styles.text}>
              Dolore minim ad anim adipisicing quis. Tempor eu sint irure minim.
              Nostrud ad excepteur eiusmod veniam commodo sit amet aute occaecat
              minim eu. Sint ipsum sint ex tempor cillum officia reprehenderit
              dolor in fugiat nulla quis tempor. Sit nostrud consectetur id
              incididunt ex dolor. Sunt laboris enim ipsum et ad. Do veniam
              nulla proident proident proident reprehenderit anim amet. Anim in
              minim ad consequat ad laborum eu voluptate in consequat. Cillum
              occaecat magna excepteur cupidatat qui proident. Consequat velit
              amet id Lorem commodo eiusmod. Do enim exercitation sunt esse
              aliqua sit aute enim laboris ipsum. Dolor excepteur dolore anim
              esse sit labore nulla. Tempor nulla Lorem incididunt sunt labore
              et nulla ad sint pariatur consectetur dolore culpa. Quis id ut do
              officia anim nulla cupidatat amet tempor dolor. Qui ad eu
              excepteur adipisicing qui veniam voluptate. Nulla officia et
              adipisicing commodo duis ipsum dolor laboris reprehenderit
              aliquip. Ullamco in mollit consectetur ullamco elit ullamco ipsum
              voluptate qui. Aliqua dolore labore magna velit culpa commodo
              excepteur mollit occaecat. Mollit sunt dolore quis nulla aliqua
              tempor occaecat commodo ea. Duis nostrud ipsum adipisicing mollit
              ad sunt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
