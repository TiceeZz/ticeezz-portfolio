import ProjectDetail from '../components/ui/ProjectDetail';

const IMG_DIR = '/images/projects/nile';
const images = Array.from({ length: 5 }, (_, i) => `${IMG_DIR}/page_${String(i + 24).padStart(3, '0')}.jpg`);

const sections = [{ label: '作品展示', images }];

const project = {
  title: '从长江到尼罗河 · Yangtze to Nile',
  tag: 'Furniture Design',
  desc: '中埃文化元素的系列化家具设计。将长江流域与尼罗河文明的典型视觉符号进行转译，<strong>以家具为载体搭建跨文明对话</strong>，在两种古老河流文化之间寻找形态与精神的共鸣。',
  keywords: ['家具设计', '跨文化设计', '系列化', '文化转译'],
};

export default function Nile() {
  return <ProjectDetail project={project} sections={sections} cover="/images/projects/nile/cover.webp" projectSlug="/nile" />;
}
