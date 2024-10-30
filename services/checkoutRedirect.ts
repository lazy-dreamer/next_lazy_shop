import {usePathname, useRouter} from "next/navigation";

export function checkoutRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  
  if (pathname.includes('login')) {
    router.push('/checkout')
  }
}