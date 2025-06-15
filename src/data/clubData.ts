import Depromeet from '@/assets/images/Deproment.png';
import DND from '@/assets/images/Dnd.png';
import YAPP from '@/assets/images/Yapp.png';
import DDD from '@/assets/images/Ddd.png';
import MashUP from '@/assets/images/Mashup.png';
import SOPT from '@/assets/images/Sopt.png';
import NEXTERS from '@/assets/images/Nexters.jpg';
import Prography from '@/assets/images/Prography.png';
import Programming from '@/assets/images/Programming.jpg';
import AUGS from '@/assets/images/Augs.png';

export interface Club {
  id: number;
  name: string;
  image: string;
  description: string;
  target: string;
  positions: string[];
}

export const tagColors = {
  "프론트엔드": { bg: "bg-blue-100", text: "text-blue-600" },
  "백엔드": { bg: "bg-green-100", text: "text-green-600" },
  "DevOps": { bg: "bg-purple-100", text: "text-purple-600" },
  "AI": { bg: "bg-red-100", text: "text-red-600" },
  "디자이너": { bg: "bg-yellow-100", text: "text-yellow-600" },
  "IOS": { bg: "bg-indigo-100", text: "text-indigo-600" },
  "안드로이드": { bg: "bg-pink-100", text: "text-pink-600" },
  "기획자": { bg: "bg-orange-100", text: "text-orange-600" },
  "알고리즘": { bg: "bg-teal-100", text: "text-teal-600" },
  "PM": { bg: "bg-cyan-100", text: "text-cyan-600" },
};

export const clubData: Club[] = [
  {
    id: 1,
    name: '디프만',
    image: Depromeet,
    description: '디프만은 디자이너와 프로그래머가 만났을 때의 줄임말로, 서비스 기획부터 론칭과 개선까지 다양한 경험을 합니다.',
    target: 'https://www.depromeet.com',
    positions: ['프론트엔드', '백엔드', '디자이너', '기획자', '안드로이드' ,'IOS']
  },
  {
    id: 2,
    name: 'DDD',
    image: DDD,
    description: 'DDD는 개발자와 디자이너가 함께 사이드 프로젝트를 진행하며 서로의 이해와 친목을 쌓는 기회를 제공합니다.',
    target: 'https://dddset.notion.site/DDD-7b73ca41b67c4658b292a4662581ee01',
    positions: ['프론트엔드', '백엔드', '디자이너', '기획자', '안드로이드' ,'IOS' ,'PM']
  },
  {
    id: 3,
    name: 'DND',
    image: DND,
    description: 'DND는 사이드 프로젝트를 해보고 싶은 개발자와 디자이너가 팀을 이뤄 8주간 프로젝트를 경험하는 비영리단체입니다.',
    target: 'https://dnd.ac',
    positions: ['프론트엔드', '백엔드', '디자이너' ,'PM' ,'안드로이드' ,'IOS']
  },
  {
    id: 4,
    name: 'YAPP',
    image: YAPP,
    description: 'YAPP은 대학생들의 다양한 아이디어와 열정으로 새로운 가치를 만드는 기업형 IT 동아리입니다.',
    target: 'https://www.yapp.co.kr',
    positions: ['프론트엔드', '백엔드', '디자이너', '기획자']
  },
  {
    id: 5,
    name: 'MashUP',
    image: MashUP,
    description: 'MashUp은 개발과 디자인에 관심 있는 사람들이 모여 팀별 스터디와 네트워킹을 통해 프로젝트를 진행하는 IT 연합 동아리입니다.',
    target: 'https://mash-up.kr',
    positions: ['프론트엔드', '백엔드', '디자이너', '기획자', '안드로이드' ,'IOS']
  },
  {
    id: 6,
    name: 'SOPT',
    image: SOPT,
    description: 'SOPT는 IT와 벤처창업에 뜻이 있는 대학생들이 모인 연합 IT벤처창업 동아리입니다.',
    target: 'https://www.sopt.org',
    positions: ['프론트엔드', '백엔드', '디자이너', '기획자', '안드로이드' ,'IOS']
  },
  {
    id: 7,
    name: 'NEXTERS',
    image: NEXTERS,
    description: 'NEXTERS는 자유롭게 협업하고 소통하며 IT 인재로 발전하는 것을 목표로 하는 동아리입니다.',
    target: 'https://www.nexters.co.kr',
    positions: ['프론트엔드', '백엔드', '디자이너', '기획자', '안드로이드' ,'IOS']
  },
  {
    id: 8,
    name: 'Prography',
    image: Prography,
    description: 'Prography는 개발자와 디자이너가 함께 서비스를 기획하고 개발하는 프로젝트를 진행합니다.',
    target: 'https://prography.org/',
    positions: ['프론트엔드', '백엔드', '디자이너', '기획자']
  },
  {
    id: 9,
    name: 'Programming',
    image: Programming,
    description: 'Programming은 비전공자들이 파이썬과 장고를 기반으로 웹 개발을 배우는 동아리입니다.',
    target: 'https://pirogramming.com/',
    positions: ['프론트엔드', '백엔드']
  },
  {
    id: 10,
    name: 'AUGS',
    image: AUGS,
    description: 'AUGS는 개발과 즐거운 네트워크 형성을 함께하는 대학생들의 모임입니다.',
    target: 'https://ausg.me/',
    positions: ['백엔드']
  }
]; 