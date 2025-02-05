
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Nav } from "./components/Nav";

import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import Footer from "@/app/components/Footer";
import React from "react";
interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={"bg-slate-100"}>
          <section className={styles.container}>
            <Nav />
            <div className={"flex justify-center"}>
              <div className={"container"}>
                <main className={styles.main}>{children}</main>
              </div>
            </div>

            <footer className={styles.footer + "bg-black  "}>
              <Footer/>
            </footer>
          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
