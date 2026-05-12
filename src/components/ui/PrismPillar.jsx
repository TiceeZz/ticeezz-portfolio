import { useNavigate } from 'react-router-dom';
import s from '../sections/Gallery.module.css';

export default function PrismPillar({ project }) {
  const navigate = useNavigate();

  return (
    <div className={s.pillar} onClick={() => navigate(project.href)}>
      <div className={s.num}>{project.num}</div>
      <div className={s.glow} />
      <div className={s.info}>
        <h2>{project.title}</h2>
        <p>{project.desc}</p>
      </div>
    </div>
  );
}
