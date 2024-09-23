import Slider from "react-slick"

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  const slidesData = [
    {
      id: 1,
      image: "/src/assets/offer1.jpg",
      title: "Big Sale - Up to 50% Off",
      description: "Grab the best deals on our exclusive collection!",
    },
    {
      id: 2,
      image: "/src/assets/newarrival.jpg",
      title: "New Arrivals",
      description: "Check out the latest shoes in our store!",
    },
    {
      id: 3,
      image: "/src/assets/limited-edition.jpg",
      title: "Limited Edition",
      description: "Don't miss out on our limited edition sneakers.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto my-8">
      <Slider {...settings}>
        {slidesData.map((slide) => (
          <div key={slide.id} className="relative h-[300px] ">
            <div className="w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
              <h2 className="text-white text-4xl font-bold">{slide.title}</h2>
              <p className="text-white text-lg mt-2">{slide.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider
