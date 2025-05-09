import React from "react";
import Header from "../../components/Header"
import SearchBar from "../../components/SearchBar"
import AllClub from "../../components/AllClub"
import AllClubCardSection from "../../components/AllClubCardSection"
import HireITInfo from "../../components/hireITinfo"
import PopularClub from "../../components/PopularClub"
function MainPage() {
    return (
        <div className="w-full h-full bg-gray-100">
            <Header />
            <SearchBar />
            <PopularClub />
            <AllClub />
            <HireITInfo/>
        </div>
    );
}

export default MainPage;