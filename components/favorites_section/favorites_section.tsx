"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "@firebase/auth";
import { auth } from "@/services/firebase/firebase-config";
import { useUserStore } from "@/store/user_store";
import { Title } from "../ui/title";
import { ProductBlock } from "../product_block/product_block";
import { Preloader } from "../preloader/Preloader";

interface Props {
  className?: string;
}

export const FavoritesSection: React.FC<Props> = ({ className = "" }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { favorites, isAuthCheck, isFavoritesLoaded } = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        if (pathname.includes("favorites")) {
          router.push("/");
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (user == null) {
    return <Preloader />;
  }

  return (
    <section className={` ${className} `}>
      <div className="screen_content">
        {isFavoritesLoaded &&
          (favorites.length > 0 ? (
            <>
              <Title text={"Favorite products"} size={"md"} />
              <div className="quarter_blocks">
                {favorites.map((item) => (
                  <ProductBlock productItem={item} key={item.id} />
                ))}
              </div>
            </>
          ) : (
            isAuthCheck && (
              <Title
                text={"You have no favorite products yet :("}
                className={"text_center"}
                size={"md"}
              />
            )
          ))}
      </div>
    </section>
  );
};
