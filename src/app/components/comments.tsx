import { CiCircleCheck } from "react-icons/ci";
import {  BsThreeDots } from "react-icons/bs";
import MAYLIKE from "@/app/components/mightlike";

export default function Comments (){
    return (
      <div className="container mx-auto p-6 bg-white">
    
        {/* Tabs */}
        <div className="mt-12 ">
          <div className="flex justify-evenly items-center gap-8 border-b pb-2 mb-6 ">
            <button className="font-semibold text-black">Product Details</button>
            <button className="font-semibold border-b-4 border-black px-20">Rating & Review</button>
            <button className="font-semibold text-black">FAQs</button>
          </div>
  
          {/* Reviews Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">All Reviews (432)</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Review 1 */}
              <div className="p-4 border rounded-lg">
                <div className="flex-1 items-center gap-2 mb-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <div className="flex justify-between items-center ">
                  <p className="font-semibold flex items-center gap-2">
    Samantha D.
    <CiCircleCheck className="text-white text-2xl bg-green-500 rounded-full" />
  </p>
                  <BsThreeDots className="text-black "/>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2">Posted on August 20, 2023</p>
                <p className="text-sm">
                  I absolutely love this t-shirt! The design is unique and the fabric is super comfortable. It fits perfectly and has become my favorite item in my wardrobe.
                </p>
              </div>
             
              <div className="p-4 border rounded-lg">
                <div className="flex-1 items-center gap-2 mb-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <div className="flex justify-between items-center ">
                  <p className="font-semibold flex items-center gap-2">
    Samantha D.
    <CiCircleCheck className="text-white text-2xl bg-green-500 rounded-full" />
  </p>
                  <BsThreeDots className="text-black "/>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2">Posted on August 20, 2023</p>
                <p className="text-sm">
                  I absolutely love this t-shirt! The design is unique and the fabric is super comfortable. It fits perfectly and has become my favorite item in my wardrobe.
                </p>
              </div>
  
              <div className="p-4 border rounded-lg">
                <div className="flex-1 items-center gap-2 mb-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <div className="flex justify-between items-center ">
                  <p className="font-semibold flex items-center gap-2">
    Samantha D.
    <CiCircleCheck className="text-white text-2xl bg-green-500 rounded-full" />
  </p>
                  <BsThreeDots className="text-black "/>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2">Posted on August 20, 2023</p>
                <p className="text-sm">
                  I absolutely love this t-shirt! The design is unique and the fabric is super comfortable. It fits perfectly and has become my favorite item in my wardrobe.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex-1 items-center gap-2 mb-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <div className="flex justify-between items-center ">
                  <p className="font-semibold flex items-center gap-2">
    Samantha D.
    <CiCircleCheck className="text-white text-2xl bg-green-500 rounded-full" />
  </p>
                  <BsThreeDots className="text-black "/>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2">Posted on August 20, 2023</p>
                <p className="text-sm">
                  I absolutely love this t-shirt! The design is unique and the fabric is super comfortable. It fits perfectly and has become my favorite item in my wardrobe.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex-1 items-center gap-2 mb-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <div className="flex justify-between items-center ">
                  <p className="font-semibold flex items-center gap-2">
    Samantha D.
    <CiCircleCheck className="text-white text-2xl bg-green-500 rounded-full" />
  </p>
                  <BsThreeDots className="text-black "/>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2">Posted on August 20, 2023</p>
                <p className="text-sm">
                  I absolutely love this t-shirt! The design is unique and the fabric is super comfortable. It fits perfectly and has become my favorite item in my wardrobe.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex-1 items-center gap-2 mb-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <div className="flex justify-between items-center ">
                  <p className="font-semibold flex items-center gap-2">
    Samantha D.
    <CiCircleCheck className="text-white text-2xl bg-green-500 rounded-full" />
  </p>
                  <BsThreeDots className="text-black "/>
                  </div>
                  
                </div>
                <p className="text-sm text-gray-500 mb-2">Posted on August 20, 2023</p>
                <p className="text-sm">
                  I absolutely love this t-shirt! The design is unique and the fabric is super comfortable. It fits perfectly and has become my favorite item in my wardrobe.
                </p>
              </div>
  
              {/* Add more reviews as needed */}
            </div>
  
            {/* Load More Reviews */}
            <div className="flex justify-center mt-6">
    <button className="flex justify-center items-center font-bold text-sm text-black border border-gray-400 rounded-full py-3 px-6 hover:bg-gray-100 transition-all">
      Load More Reviews
    </button>
  </div>
  
  
  
          </div>
        </div>
  
  
      <div className=' mx-44 py-16 h-1/3 '>
          {/* section tag */}
  
  {/* heading */}
  <div className="heading flex items-center  justify-center mb-[50px] ">
  
     </div>
     </div>
     <MAYLIKE/>
     </div>
    
    );
  };
  
  
  
  