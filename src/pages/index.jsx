import { useEffect } from 'react';
import IntroComp from '../components/IntroComp';
import VisualComp from '../components/VisualComp';


export default function Home() {
  const [introStatus, setIntroStatus] = useState(false);
  useEffect(() => {
    console.log('렌더링 후 실행');
  }, []);

  return (
    <>
      <IntroComp setIntroStatus={setIntroStatus} />
      <VisualComp />
    </>
  )
}