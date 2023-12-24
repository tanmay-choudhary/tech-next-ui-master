import Navbar from "@/Components/Navbar/Navbar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { DataProvider } from "@/context/DataContext";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <DataProvider>
      {router?.pathname !== "/404" && <Navbar />}
      <Component {...pageProps} />
    </DataProvider>
  );
}
