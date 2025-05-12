import { Club } from '@/components/club/types';
import Depromeet from '@/assets/images/Deproment.png';
import DND from '@/assets/images/DND.png';
import YAPP from '@/assets/images/YAPP.png';
import DDD from '@/assets/images/DDD.png';
import MashUP from '@/assets/images/mashup.png';

export const CLUBS: Club[] = [
  { id: 'depromeet', image: Depromeet, target: "https://www.depromeet.com", status: "OFF" },
  { id: 'dnd', image: DND, target: "https://dnd.ac", status: "OFF" },
  { id: 'yapp', image: YAPP, target: "https://www.yapp.co.kr", status: "OFF" },
  { id: 'ddd', image: DDD, target: "https://www.dddcommunity.org", status: "OFF" },
  { id: 'mashup', image: MashUP, target: "https://recruit.mash-up.kr/recruit/web", status: "OFF" },
];