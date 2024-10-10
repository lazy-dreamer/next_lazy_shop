import React from "react";
import {IOrder} from "../../services/firebase/orders";
import s from './order_block.module.scss';
import {Title} from "../ui/title";
import {CartSideItem} from "../cart_side_item/cart_side_item";

interface Props {
  className?: string,
  index: number,
  order: IOrder
}

export const OrderBlock:React.FC<Props> = ({className='', order, index}) => {
  const cartTotal = order.cartItems.reduce((acc, item) => acc+=(item.product.price*item.quantity), 0);
  const time = order.orderTime.substring(order.orderTime.indexOf(':')+1).length>1? order.orderTime : order.orderTime.substring(0, order.orderTime.indexOf(':')+1) + '0' + order.orderTime.substring(order.orderTime.indexOf(':')+1);
  
  return <div className={`${className && className} ${s.block} frame`}>
    <div className={s.title}>
      <Title text={`${index}`} size={'md'} className={'green'} />
      <p>Order from - {order.orderDate} ({time})</p>
    </div>
    <div className={s.items_block}>
      <Title text={`Ordered products:`} size={'xs'} />
      <div className={s.products}>
        {
          order.cartItems.map(item => <CartSideItem item={item} key={item.product.id} />)
        }
      </div>
      <Title text={`Total price: ${cartTotal}$`} size={'xxs'} />
    </div>
    <div className={s.delivery}>
      <Title text={`Delivery information:`} size={'xs'} />
      <div>
        <p><b>Name:</b> {`${order.orderInfo.name} ${order.orderInfo.surname}`}</p>
        <p><b>Phone:</b> {`${order.orderInfo.phone}`}</p>
        <p><b>Address:</b> {`${order.orderInfo.city}, ${order.orderInfo.street} ${order.orderInfo.building}, apt.${order.orderInfo.apartment}`}</p>
        {order.orderInfo.comment && (order.orderInfo.comment.length>0 && <p><b>Additional comment: </b> {order.orderInfo.comment}</p>)}
      </div>
    </div>
  </div>;
}