import useUser from "utils/firebase/useUser";
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  { url: "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171__340.jpg" },
  { url: "https://cdn.pixabay.com/photo/2013/07/18/10/56/railroad-163518__480.jpg" },
  { url: "https://analyticsindiamag.com/wp-content/uploads/2020/10/7d744a684fe03ebc7e8de545f97739dd.jpg" },
  { url: "https://i.ytimg.com/vi/p7TDpx0hsn4/maxresdefault.jpg" },
  { url: "https://www.planetware.com/wpimages/2020/01/india-in-pictures-beautiful-places-to-photograph-taj-mahal.jpg" },
  { url: "http://www.lovethispic.com/uploaded_images/136562-Beautiful-Butterfly.jpg" },
  { url: "https://www.pixelstalk.net/wp-content/uploads/2016/08/Free-Best-nd-Beautiful-Images.jpg" },
];

const Home = () => {
  return (
    <nav>
      <div>Our hacktable project :)</div>      
      <div>
        <SimpleImageSlider 
          width={896} 
          height={504} 
          slideDuration={.05} 
          images={images}
        >
      </div>
      
    </nav>
  )
};

export default Home;
