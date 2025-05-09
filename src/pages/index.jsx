import { useEffect, useState } from 'react';
import IntroComp from '../components/IntroComp';
import dynamic from 'next/dynamic';

// canvas나 webGl을 사용하기 위해 ssr 비활성화
// https://hyuns-it.tistory.com/103
const VisualComp = dynamic(() => import('../components/VisualComp'), { ssr: false });

export default function Home() {
  const [introStatus, setIntroStatus] = useState(true);

  return (
    <>
      {introStatus && <IntroComp setIntroStatus={setIntroStatus} />}
      <VisualComp isActive={!introStatus} />
    </>
  )
}
