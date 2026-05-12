import SectionHeader from '../ui/SectionHeader';
import PrismPillar from '../ui/PrismPillar';
import { postgraduateProjects, undergraduateProjects } from '../../data/gallery';
import s from './Gallery.module.css';

export default function Gallery() {
  return (
    <section id="gallery" className={s.gallery}>
      <SectionHeader title="PROJECT ARCHIVE" subtitle="作品集分类档案" />

      <div className={s.subHeader}>
        <h3>01 // POSTGRADUATE STAGE</h3>
        <p>硕士阶段核心实践 (2022-2025)</p>
      </div>
      <div className={s.track}>
        {postgraduateProjects.map((p) => (
          <PrismPillar key={p.num} project={p} />
        ))}
      </div>

      <div className={s.subHeader} style={{ marginTop: '80px' }}>
        <h3>02 // UNDERGRADUATE STAGE</h3>
        <p>本科阶段优选作品 (2018-2022)</p>
      </div>
      <div className={s.track}>
        {undergraduateProjects.map((p) => (
          <PrismPillar key={p.num} project={p} />
        ))}
      </div>
    </section>
  );
}
