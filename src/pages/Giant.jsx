import ProjectDetail from '../components/ui/ProjectDetail';

const IMG_DIR = '/images/projects/giant';
const images = Array.from({ length: 5 }, (_, i) => `${IMG_DIR}/page_${String(i + 8).padStart(3, '0')}.jpg`);

const sections = [{ label: '作品展示', images }];

const project = {
  title: '喰 · The Giant',
  tag: 'Interior Design',
  desc: '以「巨人」为主题的餐厅室内空间设计。通过<strong>夸张尺度对比与沉浸式场景营造</strong>，将奇幻叙事融入用餐体验，重新定义空间、食物与人之间的戏剧关系。',
  keywords: ['室内设计', '餐厅空间', '叙事空间', '场景营造'],
};

export default function Giant() {
  return <ProjectDetail project={project} sections={sections} cover="/images/projects/giant/cover.webp" projectSlug="/giant" />;
}
