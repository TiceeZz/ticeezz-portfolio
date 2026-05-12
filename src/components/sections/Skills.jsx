import SectionHeader from '../ui/SectionHeader';
import SkillBar from '../ui/SkillBar';
import skills from '../../data/skills';
import s from './Skills.module.css';

export default function Skills() {
  return (
    <section id="skills" className={s.skills}>
      <SectionHeader title="DESIGN SKILLS" subtitle="光量子技能图谱 // 技术武器库" />

      <div className={s.grid}>
        {skills.map((col) => (
          <div key={col.category} className={`${s.col} ${s[col.className]}`}>
            <div className={s.colHeader}>
              {col.category} <span>{col.tag}</span>
            </div>
            {col.items.map((item) => (
              <SkillBar key={item.name} name={item.name} sub={item.sub} level={item.level} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
