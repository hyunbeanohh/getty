import React from 'react'
import { useState } from 'react';

const RecruitmentClub = [
    {club : 'temp1', target : 'tempUrl'},
    {color : 'temp2', target : 'tempUrl'},
    {color : 'temp3', target : 'tempUrl'},
]

const RecruitmentClub = () => {
    const [animate, setAnimate] = useState(false);
    const onStop = () => setAnimate(false);
    const onStart = () => setAnimate(true);

  return (
    <div>RecruitmentClub</div>
  )
}

export default RecruitmentClub