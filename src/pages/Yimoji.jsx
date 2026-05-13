import ProjectDetail from '../components/ui/ProjectDetail';

const IMG_DIR = '/images/projects/yimoji';
const images = Array.from({ length: 4 }, (_, i) => `${IMG_DIR}/page_${String(i + 4).padStart(3, '0')}.jpg`);

const sections = [{ label: '作品展示', images }];

const project = {
  title: 'Yi MOJI · 彝MOJI',
  tag: 'Cultural Creative',
  desc: '面向彝族非遗文化的文创产品设计。从彝族传统纹样与色彩体系中提炼视觉符号，<strong>将民族美学转化为现代生活器物</strong>，探索文化传承与日常使用的有机融合。',
  keywords: ['文创设计', '彝族文化', '非遗传承', '视觉符号'],
};

export default function Yimoji() {
  return <ProjectDetail project={project} sections={sections} cover="/images/projects/yimoji/cover.jpg" projectSlug="/yimoji" />;
}
