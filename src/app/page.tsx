import Header from "./components/Header";
import Card from "./components/Card";
import { PrismaClient,Location,Cuisine,Price, Review } from "@prisma/client";

export interface restaurantCard{
  id: number,
  name: string,
  main_images: string,
  cuisine:Cuisine,
  location:Location,
  price:Price,
  slug:string,
  reviews:Review[]
}
const prisma = new PrismaClient();
async function FetchingRestaurant():Promise<restaurantCard[]> {
  const restaurant = await prisma.restaurant.findMany({
    select:{
      id:true,
      name:true,
      main_images:true,
      cuisine:true,
      location:true,
      price:true,
      slug:true,
      reviews:true
    },
  });
  return restaurant
}


export default async function Home() {
  const restaurants = await FetchingRestaurant();

  
  return (
      <>
      <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-4 md:px-8 lg:px-16 gap-5">
          {restaurants.map(r=><Card restaurant={r} />)}
        </div>
      </>

  )
}
// LPOdcjCAFtdDBWBl