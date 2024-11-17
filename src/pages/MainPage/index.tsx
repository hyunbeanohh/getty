import React from "react";
import Header from "../../components/Header"
import SearchBar from "../../components/SearchBar"
import NowApplyClub from "../../components/NowApplyClub"
import ClubRanking from "../../components/ClubRanking"

function MainPage() {
    return (
        <div className="w-full h-screen bg-gray-100">
            <Header />
            <SearchBar />
            <NowApplyClub />
            <ClubRanking/>  
        </div>
    );
}

export default MainPage;