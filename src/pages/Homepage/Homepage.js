import React from "react";
import './style.css';
import Member from "../../components/Member/Member";
import MemberProfile1 from "./../../Assets/images/Profile.webp";
import Dropdown from "../../components/Dropdown/Dropdown";
import Cabai from "./../../Assets/images/cabai.webp";
function Homepage(props) {
    function Header() {
        return (
            <div className="flex justify-between  text-white py-4">
                <div className="flex h-16 px-10 py-5">
                    Logo
                </div>

                <div className="flex h-16 px-10 py-5">
                    <Dropdown />
                </div>
            </div>
        );
    }
    function Content() {
        return (
            <div className="grid grid-flow-row-dense grid-cols-3 gap-4 md:py-10">
                {/* Box Kanan */}
                <div className="p-6 col-span-2 grid grid-flow-row auto-rows-max gap-3 ">
                    {/* Konten Row */}
                    <p className="text1 ">Tugas Akhir Capstone</p>
                    <p className="text2">SISTEM CERDAS MONITORING <br /> UNSUR HARA NPK TANAH PORTABLE <br /> UNTUK TANAMAN CABAI BERBASIS IOT</p>
                    <p className="text3 ">Website yang memungkinkan pengguna untuk memantau kadar unsur hara Nitrogen (N), Fosfor (P), Kalium (K), pH dan <br /> kelembapan pada tanah secara real-time dan portabel dengan bantuan Internet of Things (IoT).</p>
                    <div className="grid grid-cols-2 gap-4 md:my-20">
                        <div className="col-span-1 ">
                            <Member imageSrc={MemberProfile1} name="Hanif Faiq? Faiq mas" position="CTO" />
                        </div>
                        <div className="col-span-1">
                            <Member imageSrc={MemberProfile1} name="Putra Bangsa Widjanarko" position="CEO" />
                        </div>
                        <div className="col-span-1">
                            <Member imageSrc={MemberProfile1} name="Om Don dan Mas Kram" position="CEO" />
                        </div>
                        <div className="col-span-1">
                            <Member imageSrc={MemberProfile1} name="Syahdan Triantoro" position="CEO" />
                        </div>
                    </div>
                </div>
                {/* Box Kiri */}
                <div className="flex justify-center p-6 ">
                    <img alt="Cabai Image" className="w-full h-auto image-custom" src={Cabai} />
                </div>
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
        <div className=" md:mx-20 md:my-10">
            <Header />
            <Content />
            <Footer />
        </div>
    );
}

export default Homepage;
