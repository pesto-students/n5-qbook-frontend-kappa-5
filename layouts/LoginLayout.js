import React from "react";
import LoginNavbar from "components/Navbars/LoginNavbar.js";
import FooterLogin from "components/Footers/FooterLogin";

export default function LoginLayout({ children }) {
  return (
    <>
      <LoginNavbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div  className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          style={{
              backgroundImage: "url('/img/login_bg.jpg')",objectFit:"contain",
            }}
          ></div>
          {children}
          <FooterLogin absolute/>
        </section>
      </main>
    </>
  );
}
