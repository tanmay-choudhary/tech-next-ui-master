import Navbar from "@/Components/Navbar/Navbar";
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router=useRouter()
	return (
		<>
			{router?.pathname !== "/404" && <Navbar />}
			<Component {...pageProps} />
		</>
	);
}
