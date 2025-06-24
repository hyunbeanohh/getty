import { Club } from '@/types/types';
import Deproment from '@/assets/images/deproment.png';
import DND from '@/assets/images/dnd.png';
import YAPP from '@/assets/images/yapp.png';
import DDD from '@/assets/images/ddd.png';
import MashUP from '@/assets/images/mashup.png';

export const CLUBS: Club[] = [
  { id: 'depromeet', image: Deproment, target: "https://www.depromeet.com", status: "OFF" },
  { id: 'dnd', image: DND, target: "https://dnd.ac", status: "OFF" },
  { id: 'yapp', image: YAPP, target: "https://www.yapp.co.kr", status: "OFF" },
  { id: 'ddd', image: DDD, target: "https://www.dddcommunity.org", status: "OFF" },
  { id: 'mashup', image: MashUP, target: "https://recruit.mash-up.kr/recruit/web", status: "OFF" },
];