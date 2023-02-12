import Navbar from "./Navbar";
import Footer from "./Footer";
import Totop from "./Totop";

export default function Error() {
  return (
    <>
      <Navbar />
      <section className="about container-fluid">
        <div className="container">
          <div className="heading mt-5">
            <h3>Opps! your page can not be proccees. </h3>
          </div>
          <div className="row"></div>
        </div>
      </section>
      <Footer />
      <Totop />
    </>
  );
}
