import React from "react";
import "./style.css";
import Member from "../../components/Member/Member";
import NPKChart from "./../../components/NPKChart";
import Dropdown from "../../components/Dropdown/Dropdown";
import Countdown from "../../components/Countdown/Countdown";
import CalendarComponents from "../../components/Calendar/Calendar";

import MemberProfile1 from "./../../Assets/images/Profile.webp";
import Cabai from "./../../Assets/images/cabai.webp";
import Logo from "./../../Assets/images/Logo Tsuki.png";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

function Homepage(props) {
  function Header() {
    return (
      <div className="flex justify-between text-white py-4">
        <div className="flex h-16 px-10 py-5">
          <img alt="Cabai Image" className="w-full h-auto" src={Logo} />
        </div>

        <div className="flex h-16 px-10 py-5">
          <Dropdown />
        </div>
      </div>
    );
  }
  function Content() {
    return (
      <div className="grid grid-flow-row-dense gap-1 md:py-10">
        <div className="grid grid-flow-row-dense grid-cols-3 gap-1 md:py-5 md:px-5">
          {/* Box Kiri */}
          <div className="p-6 col-span-2 grid grid-flow-row auto-rows-max gap-2 mr-10">
            <p className="text1 ">Tugas Akhir Capstone</p>
            <p className="text2">SISTEM CERDAS MONITORING UNSUR HARA NPK TANAH PORTABLE UNTUK TANAMAN CABAI BERBASIS IOT</p>
            <p className="text3 ">
              Website yang memungkinkan pengguna untuk memantau kadar unsur hara Nitrogen (N), Fosfor (P), Kalium (K), pH dan kelembapan pada tanah secara real-time dan portabel dengan bantuan Internet of Things (IoT).
            </p>
            <div className="grid grid-cols-2 gap-4 laptop:my-20">
              <div className="col-span-1 ">
                <Member imageSrc={MemberProfile1} name="Ananda Mutiara Prabowo" position="1101190330" />
              </div>
              <div className="col-span-1">
                <Member imageSrc={MemberProfile1} name="Rafi Muhammad Mahrus" position="1101192464" />
              </div>
              <div className="col-span-1">
                <Member imageSrc={MemberProfile1} name="Azima Azzahra" position="1101194376" />
              </div>
              <div className="col-span-1">
                <Member imageSrc={MemberProfile1} name="Irzal Muhammad Prasetyo" position="1101194061" />
              </div>
            </div>
          </div>
          {/* Box Kanan */}
          <div className="flex justify-center py-10">
            <img alt="Cabai Image" className="w-auto h-auto image-custom" src={Cabai} />
          </div>
        </div>
        <NPKChart />
        <Countdown />
        <CalendarComponents />
      </div>
    );
  }
  function Footer() {
    return (
      <footer className="text-white py-4">
        <p className="text-center copyright">&copy;Tsuki Software & Media House 2023</p>
      </footer>
    );
  }
  return (
    <div className="md:mx-10">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default Homepage;
