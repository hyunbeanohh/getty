import { useState } from 'react';
import altImgSvg from '../assets/icon/altImg.svg';

const HireITInfo = () => {
    // 샘플 데이터
  const jobData = [
    {
      id: 1,
      title: "시니어 프론트엔드 개발자",
      company: "테크놀로지 주식회사",
      logo: altImgSvg,
      location: "서울 강남구",
      type: "정규직",
      tags: ["React", "TypeScript", "Next.js"],
      salary: "6,000만원 ~ 8,000만원",
      deadline: "2025.04.15",
      views: 245
    },
    {
      id: 2,
      title: "백엔드 개발자 (Python/Django)",
      company: "스타트업 인큐베이터",
      logo: altImgSvg,
      location: "서울 성동구",
      type: "정규직",
      tags: ["Python", "Django", "AWS"],
      salary: "5,000만원 ~ 7,000만원",
      deadline: "2025.04.20",
      views: 189
    },
    {
      id: 3,
      title: "데이터 사이언티스트",
      company: "빅데이터 솔루션즈",
      logo: altImgSvg,
      location: "서울 서초구",
      type: "정규직",
      tags: ["Python", "Tensorflow", "SQL"],
      salary: "4,500만원 ~ 7,500만원",
      deadline: "2025.04.10",
      views: 320
    },
    {
      id: 4,
      title: "DevOps 엔지니어",
      company: "클라우드 서비스",
      logo: altImgSvg,
      location: "서울 마포구",
      type: "정규직",
      tags: ["Kubernetes", "Docker", "CI/CD"],
      salary: "6,500만원 ~ 9,000만원",
      deadline: "2025.04.25",
      views: 175
    },
    {
      id: 5,
      title: "모바일 앱 개발자 (Android/Kotlin)",
      company: "모바일 솔루션",
      logo: altImgSvg,
      location: "경기도 성남시",
      type: "정규직",
      tags: ["Android", "Kotlin", "Firebase"],
      salary: "5,200만원 ~ 7,000만원",
      deadline: "2025.04.18",
      views: 211
    },
    {
      id: 6,
      title: "보안 엔지니어",
      company: "시큐리티 주식회사",
      logo: altImgSvg,
      location: "서울 영등포구",
      type: "정규직",
      tags: ["보안", "네트워크", "침투 테스트"],
      salary: "7,000만원 ~ 9,500만원",
      deadline: "2025.04.30",
      views: 156
    }
  ];

  const DashboardDesign = () => (
    <div className="space-y-8 pt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-5 flex flex-col">
          <span className="text-xs text-gray-500 mb-1">총 채용공고</span>
          <span className="text-3xl font-bold text-gray-800">126개</span>
          <span className="text-xs text-green-500 mt-2">전주 대비 13% 증가</span>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex flex-col">
          <span className="text-xs text-gray-500 mb-1">이번 주 신규 공고</span>
          <span className="text-3xl font-bold text-gray-800">32개</span>
          <span className="text-xs text-green-500 mt-2">지난주 대비 8% 증가</span>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex flex-col">
          <span className="text-xs text-gray-500 mb-1">이번 주 마감 예정</span>
          <span className="text-3xl font-bold text-gray-800">15개</span>
          <span className="text-xs text-red-500 mt-2">전주 대비 5% 감소</span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">인기 채용공고</h3>
          <div className="flex space-x-2">
            <button className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">최신순</button>
            <button className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">조회순</button>
            <button className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">급여순</button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">채용정보</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">기술 스택</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">급여</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">지역</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">마감일</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">조회수</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {jobData.map(job => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <img src={job.logo} alt={job.company} className="w-8 h-8 rounded mr-3" />
                      <div>
                        <div className="font-medium text-gray-800">{job.title}</div>
                        <div className="text-xs text-gray-500">{job.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {job.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{job.salary}</td>
                  <td className="px-4 py-3 text-sm">{job.location}</td>
                  <td className="px-4 py-3 text-sm">{job.deadline}</td>
                  <td className="px-4 py-3 text-sm">{job.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
  return (
    <DashboardDesign />
  )
}

export default HireITInfo;