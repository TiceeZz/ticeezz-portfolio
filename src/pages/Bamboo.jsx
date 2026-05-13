import ProjectDetail from '../components/ui/ProjectDetail';

const IMG_DIR = '/images/projects/bamboo';
const images = Array.from({ length: 6 }, (_, i) => `${IMG_DIR}/page_${String(i + 13).padStart(3, '0')}.jpg`);

const sections = [{ label: '作品展示', images }];

const project = {
  title: '雨筇竹之思 · Bamboo Echo',
  tag: 'Furniture Design',
  desc: '以筇竹为材料与意象的书架设计。从竹材的天然曲度与力学特性出发，<strong>探索传统竹工艺与现代家具语言的融合</strong>，在结构理性与诗意形态之间寻找平衡。',
  keywords: ['家具设计', '竹材工艺', '结构形态', '材料探索'],
};

export default function Bamboo() {
  return <ProjectDetail project={project} sections={sections} cover="/images/projects/bamboo/cover.webp" projectSlug="/bamboo" />;
}
