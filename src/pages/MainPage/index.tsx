import React from "react";
import Header from "../../components/Header"
import AllClub from "../../components/club/AllClub"
import PopularClub from "../../components/club/PopularClub"
function MainPage() {
    return (
        <div className="w-full h-full">
            <Header />
            {/* <PopularClub /> */}
            <AllClub />
        </div>
    );
}

export default MainPage;