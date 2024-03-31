import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Provider from './components/Provider'
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "PromptoSphere",
  description: "PromptoSphere, Generate AI Prompts, easy Prompts, Chatgpt",
  image: "/logo.png",
  keywords:"gpt, prompt, chat, ai, openai, promptosphere, prompto, promptos"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
    <link rel="icon" href="/logo.png" sizes="any" />
    </head>
      <body className={inter.className}>
      <Provider children={children}>
       <Nav/>
        {children}
      </Provider>
      </body>
    </html>
  );
}