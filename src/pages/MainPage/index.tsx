import React from "react";
import Header from "../../components/Header"
import SearchBar from "../../components/SearchBar"
import NowApplyClub from "../../components/NowApplyClub"
import PopularClub from "../../components/PopularClub"
import AllClubCardSection from "../../components/AllClubCardSection"

function MainPage() {
    return (
        <div className="w-full h-full bg-gray-100">
            <Header />
            <SearchBar />
            <NowApplyClub />
            <PopularClub/>
            <AllClubCardSection/>
        </div>
    );
}

export default MainPage;