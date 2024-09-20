import {Container} from "../components/ui/container";
import {Title} from "../components/ui/title";
import {Api} from "../services/api-client";

export interface ICategory  {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}
export interface IPoduct  {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: ICategory;
}
const str = '?offset=0&limit=10'

export default async function Home() {
  const showItem = await Api.products.getAll()
  
  return (
    <Container>
      <Title text='Products' size='lg'/>
      <br/>
      {
        showItem.map(item => <p key={item.id}>{item.title + ' ' + item.id}</p>)
      }
    </Container>
  );
}
