"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "@firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store/user_store";
import { auth } from "@/services/firebase/firebase-config";
import { Preloader } from "../preloader/Preloader";
import { UserCard } from "../user_card/user_card";
import { Title } from "../ui/title";
import { OrderBlock } from "../order_block/order_block";

interface Props {
  className?: string;
}

export const OrdersSection: React.FC<Props> = ({ className = "" }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { orders, isOrdersLoaded } = useUserStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        if (pathname.includes("orders")) {
          router.push("/");
        }
      }
    });

    return () => {
      unsub();
    };
  }, []);

  if (user == null) {
    return <Preloader />;
  }

  return (
    <section className={`${className}`}>
      <div className="screen_content">
        <div className="user_info_sides">
          <UserCard user={user} />
          <div className="user_info_side">
            {isOrdersLoaded &&
              (orders.length > 0 ? (
                <Title text={"Your orders"} size={"lg"} />
              ) : (
                <Title text={"You have no orders yet :("} size={"lg"} />
              ))}
            {orders.map((order, index) => (
              <OrderBlock index={index + 1} key={index} order={order} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
