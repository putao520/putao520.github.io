import Footer from "./footer";
import Home from "./home";

function PageOne() {
  return (
	<div className="page page-one page--active" style={{transform:'translate3d(0, 0, 0)'}}>
		<Home/>
		<Footer/>
	</div>
  );
}

export default PageOne;
