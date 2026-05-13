import ProjectDetail from '../components/ui/ProjectDetail';

const IMG_DIR = '/images/projects/sensible';
const images = Array.from({ length: 5 }, (_, i) => `${IMG_DIR}/page_${String(i + 19).padStart(3, '0')}.jpg`);

const sections = [{ label: '作品展示', images }];

const project = {
  title: 'SENSIBLE · 知趣',
  tag: 'Furniture Design',
  desc: '情感化软体沙发设计。从触觉感知与身体互动出发，<strong>以柔软曲面与包裹感形态回应情感需求</strong>，让家具从功能性载体升华为具有情绪温度的陪伴者。',
  keywords: ['家具设计', '情感化设计', '软体沙发', '触觉体验'],
};

export default function Sensible() {
  return <ProjectDetail project={project} sections={sections} cover="/images/projects/sensible/cover.webp" projectSlug="/sensible" />;
}
