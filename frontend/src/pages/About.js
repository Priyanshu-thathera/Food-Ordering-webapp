import React from "react";
import aboutPic from "../assests/about.jpg"
const About = () => {
  return (
    <div className="about-page bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">
          About Our Restaurant
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img 
              src= {aboutPic}
              alt="Restaurant Interior"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div>
            <p className="mb-4">
              Welcome to our Restaurant, where we take pride in offering an
              exceptional dining experience to all our guests. Our passion for
              great food, warm ambiance, and attentive service sets us apart as
              a premier dining destination in Jaipur,Rajasthan.
            </p>
            <p className="mb-4">
              At our Restaurant, we believe that every meal should be a
              memorable one. That's why our team of talented chefs carefully
              curates a diverse menu that combines classic and contemporary
              flavors, using only the freshest, locally sourced ingredients.
              Whether you're a fan of exquisite seafood, mouthwatering steaks,
              or delightful vegetarian dishes, you'll find something to
              tantalize your taste buds.
            </p>
            <p className="mb-4">
              Beyond our delectable dishes, our commitment to exceptional
              service ensures that you have a truly enjoyable time. Our friendly
              staff is always ready to cater to your needs, whether it's
              recommending the perfect wine pairing, accommodating dietary
              preferences, or suggesting dessert delights.
            </p>
            <p className="mb-4">
              We take pride in our restaurant's ambiance, as we strive to create
              an inviting and elegant setting for you to unwind and savor your
              meal. Whether you're celebrating a special occasion, hosting a
              business gathering, or simply seeking a lovely dinner with loved
              ones, we offers the perfect backdrop for all your
              dining moments.
            </p>
            <p className="mb-4">
              Thank you for choosing we to be a part of your
              dining experience. We look forward to serving you and providing a
              truly memorable meal that will keep you coming back for more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
