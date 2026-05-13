export const initialSuggestions = [
  '他的教育背景',
  '他的技能矩阵',
  '人像摄影',
  '如何联系他',
];

export default function generateResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('教育') || q.includes('学校'))
    return {
      text: 'TiceeZz 拥有<b>东华大学</b>艺术设计硕士学位。本科就读于<b>四川农业大学</b>（RANK 1/121）。',
      suggestions: ['他的技能怎么样？', '他拿过什么奖？'],
    };
  if (q.includes('技能') || q.includes('交互') || q.includes('ui') || q.includes('ai'))
    return {
      text: '他具备强大的跨界架构能力：<br>✦ <b>体验架构</b>: Service Design (PSS), 全链路 UI/UX<br>✦ <b>视觉空间</b>: 3Ds Max, Rhino, 视频制作<br>✦ <b>AI 工作流</b>: ComfyUI 节点流, AIGC Video, Prompt Eng.',
      suggestions: ['他的教育背景？', '医度是什么项目？'],
    };
  if (q.includes('人像') || q.includes('摄影') || q.includes('照片'))
    return {
      text: '除了设计，TiceeZz 非常擅长<b>人像摄影</b>，善于在快门中捕捉人物的真实情绪、戏剧性光影与胶片质感。',
      suggestions: ['他的技能怎么样？', '聊聊他的作品？'],
    };
  if (q.includes('画') || q.includes('手绘') || q.includes('老虎'))
    return {
      text: 'TiceeZz 具备极其细腻的<b>超写实手绘功底</b>，例如他在作品集中展示的彩色铅笔老虎手绘，展现了对自然张力与细节美学的卓越掌控力。',
      suggestions: ['他的技能矩阵？', '聊聊摄影？'],
    };
  if (q.includes('奖') || q.includes('荣誉'))
    return {
      text: '获奖包括：🏆 华灿奖 华东二等奖 | 🏆 中华设计奖 优秀作品奖 | 🏆 米兰设计周 全国三等奖 | 🏆 NCDA 全国二等奖',
      suggestions: ['他的教育背景？', '汉斯格雅项目？'],
    };
  if (q.includes('汉斯格雅'))
    return {
      text: '在汉斯格雅项目中，他不仅主导了智慧养老概念，还<b>重点负责了产品物理界面与移动端App的交互设计及3D高保真渲染</b>。',
      suggestions: ['医度项目？', 'AHRC 项目？'],
    };
  if (q.includes('医度') || q.includes('出行'))
    return {
      text: '在「医度」项目中，他负责了 2.5D 流线图和 PSS 分析，更主导了<b>移动端 App 的全链路交互设计与 UI 规范的制定</b>。',
      suggestions: ['汉斯格雅项目？', '他的技能矩阵？'],
    };
  if (q.includes('ahrc') || q.includes('剪辑'))
    return {
      text: '在 AHRC 种子基金项目中，他<b>重点负责了英国方项目视频的剪辑与视觉制作</b>，及跨国双语图文排版。',
      suggestions: ['汉斯格雅项目？', '聊聊作品集？'],
    };
  if (q.includes('粉丝') || q.includes('矩阵'))
    return {
      text: '他目前<b>全网矩阵累计拥有 20,000+ 粉丝</b>，包含个人成长 IP 及工作室团队账号运营。',
      suggestions: ['如何联系他？', '他的技能怎么样？'],
    };
  if (q.includes('联系') || q.includes('电话'))
    return {
      text: '邮箱: 1027208320@qq.com<br>电话: +86 199 7467 7449 / 180 8063 1096<br>坐标: 上海 长宁区',
      suggestions: ['他的教育背景？', '聊聊作品集？'],
    };
  return {
    text: '您可以询问关于他的<b>体验架构能力、AI 工作流、手绘与人像摄影、医度系统</b>或者<b>联系方式</b>。',
    suggestions: ['他的教育背景', '他的技能矩阵', '聊聊作品集', '如何联系他'],
  };
}
