import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  PROTO_ASSETS,
  SCENES,
  CITIES,
  WEIGHT_OPTIONS,
  FLIGHTS,
  BREED_GROUPS,
  AGE_OPTIONS,
  SAVED_ADDRESSES,
  PICKUP_SLOTS,
  TRACKING_STAGES,
  FULL_TIMELINE_LOGS,
} from './petProtoData';
import './petTravelProto.css';

/* Cubic Bezier helper for animated plane along Shanghai -> Beijing arc */
function bezierPoint(t, p0, p1, p2, p3) {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
}

const ROUTE_P0 = { x: 266, y: 252 }; // 上海虹桥
const ROUTE_P1 = { x: 274, y: 176 };
const ROUTE_P2 = { x: 204, y: 142 };
const ROUTE_P3 = { x: 176, y: 112 }; // 北京大兴

export default function PetTravelPrototype() {
  // Core navigation state
  const [screen, setScreen] = useState('hub');
  const [history, setHistory] = useState(['splash']);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  // Branch B: 随机飞 3-state machine ('empty' | 'available' | 'full')
  const [randomState, setRandomState] = useState('available');

  // Branch A: Solo search & flights
  const [tripType, setTripType] = useState('oneway');
  const [fromCityIdx, setFromCityIdx] = useState(0); // 上海
  const [toCityIdx, setToCityIdx] = useState(1);     // 北京
  const [travelDate, setTravelDate] = useState('5月20日 明天');
  const [weightKey, setWeightKey] = useState('w15');
  const [flightFilter, setFlightFilter] = useState('all');
  const [selectedFlightId, setSelectedFlightId] = useState('MU5101');

  // Form state (Screen 5)
  const [breed, setBreed] = useState('柯基犬');
  const [petName, setPetName] = useState('小航');
  const [gender, setGender] = useState('雄性');
  const [neutered, setNeutered] = useState('已绝育');
  const [weightKg, setWeightKg] = useState(9.2);
  const [ageObj, setAgeObj] = useState(AGE_OPTIONS[3]); // 2岁 6个月
  const [senderAddr, setSenderAddr] = useState(SAVED_ADDRESSES[0]);
  const [receiverAddr, setReceiverAddr] = useState(SAVED_ADDRESSES[1]);
  const [pickupSlot, setPickupSlot] = useState(''); // Initially empty to showcase live red validation
  const [contactName, setContactName] = useState('阿童');
  const [contactPhone, setContactPhone] = useState('19974677449');
  const [crateOverride, setCrateOverride] = useState(null);
  const [photoUploaded, setPhotoUploaded] = useState(false); // Initially missing to showcase validation
  const [quarantineOcr, setQuarantineOcr] = useState(true);
  const [vaccineUploaded, setVaccineUploaded] = useState(true);
  const [addonInsurance, setAddonInsurance] = useState(true); // +19
  const [addonValuation, setAddonValuation] = useState(false); // +40
  const [orderNote, setOrderNote] = useState('');
  const [agreed, setAgreed] = useState(true);

  // Submitted order + Tracking state
  const [hasOrder, setHasOrder] = useState(true);
  const [trackStageIdx, setTrackStageIdx] = useState(2); // 0..4, default 2 = 飞行中

  // Half-sheet modals
  const [modal, setModal] = useState(null);
  // modal: null | 'cityFrom' | 'cityTo' | 'breed' | 'age' | 'addrSend' | 'addrRecv' | 'slot' | 'ocr' | 'price' | 'timeline' | 'poster'
  const [breedTab, setBreedTab] = useState('dog');
  const [breedSearch, setBreedSearch] = useState('');
  const [breedAlert, setBreedAlert] = useState(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 2400);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const navigate = useCallback((next, opts = {}) => {
    setModal(null);
    if (next === 'poster') {
      setTrackStageIdx(4);
      setScreen('tracking');
      setTimeout(() => setModal('poster'), 80);
      return;
    }
    setHistory((prev) => (opts.replace ? prev : [...prev.slice(-8), screen]));
    setScreen(next);
  }, [screen]);

  const goBack = useCallback(() => {
    setModal(null);
    if (screen === 'orders') {
      setScreen('hub');
      return;
    }
    setHistory((prev) => {
      if (prev.length === 0) {
        setScreen('hub');
        return [];
      }
      const last = prev[prev.length - 1];
      setScreen(last);
      return prev.slice(0, -1);
    });
  }, [screen]);

  // Derived data
  const fromCity = CITIES[fromCityIdx];
  const toCity = CITIES[toCityIdx];
  const selectedFlight = useMemo(
    () => FLIGHTS.find((f) => f.id === selectedFlightId) || FLIGHTS[0],
    [selectedFlightId]
  );

  const filteredFlights = useMemo(() => {
    let list = [...FLIGHTS];
    if (flightFilter === 'wide') list = list.filter((f) => f.isWidebody);
    if (flightFilter === 'mu') list = list.filter((f) => f.airlineKey === 'mu');
    if (flightFilter === 'ca') list = list.filter((f) => f.airlineKey === 'ca');
    return list;
  }, [flightFilter]);

  const recommendedCrate = useMemo(() => {
    if (weightKg <= 6) return 1;
    if (weightKg <= 15) return 2;
    return 3;
  }, [weightKg]);

  const activeCrate = crateOverride || recommendedCrate;

  const formMissing = useMemo(() => {
    const items = [];
    if (!petName.trim()) items.push('宠物昵称');
    if (!ageObj?.eligible) items.push('宠物适航年龄');
    if (!pickupSlot) items.push('上门揽收时间');
    if (!contactName.trim() || contactPhone.trim().length < 7) items.push('收宠联系人与电话');
    if (!photoUploaded) items.push('宠物与航空箱合照');
    if (!agreed) items.push('活体运输免责协议');
    return items;
  }, [petName, ageObj, pickupSlot, contactName, contactPhone, photoUploaded, agreed]);

  const totalPrice = useMemo(() => {
    return selectedFlight.price + (addonInsurance ? 19 : 0) + (addonValuation ? 40 : 0);
  }, [selectedFlight.price, addonInsurance, addonValuation]);

  const activeSceneId = modal === 'poster' ? 'poster' : screen === 'orders' ? 'success' : screen;
  const activeScene = useMemo(
    () => SCENES.find((s) => s.id === activeSceneId) || SCENES[1],
    [activeSceneId]
  );

  const trackStage = TRACKING_STAGES[trackStageIdx];
  const planeCoord = useMemo(
    () => bezierPoint(trackStage.progress, ROUTE_P0, ROUTE_P1, ROUTE_P2, ROUTE_P3),
    [trackStage.progress]
  );

  const isDarkStatus =
    screen === 'splash' || screen === 'flights' || screen === 'detail' || screen === 'form';

  const handleResetDemo = () => {
    setScreen('splash');
    setHistory([]);
    setModal(null);
    setRandomState('available');
    setFromCityIdx(0);
    setToCityIdx(1);
    setWeightKey('w15');
    setWeightKg(9.2);
    setPickupSlot('');
    setPhotoUploaded(false);
    setCrateOverride(null);
    setTrackStageIdx(2);
    showToast('已重置交互原型演示状态');
  };

  const handleAutoFillForm = () => {
    setPetName('小航');
    setBreed('柯基犬');
    setAgeObj(AGE_OPTIONS[3]);
    setPickupSlot(PICKUP_SLOTS[1]);
    setPhotoUploaded(true);
    setVaccineUploaded(true);
    setContactName('阿童');
    setContactPhone('19974677449');
    setAgreed(true);
    showToast('已补全全部必填项，可立即提交订单');
  };

  /* ── Filtered breeds inside breed modal ── */
  const visibleBreeds = useMemo(() => {
    const q = breedSearch.trim();
    const pool = q
      ? [...BREED_GROUPS.dog, ...BREED_GROUPS.cat, ...BREED_GROUPS.other]
      : BREED_GROUPS[breedTab] || [];
    if (!q) return pool;
    return pool.filter((b) => b.name.includes(q) || b.sub.includes(q));
  }, [breedTab, breedSearch]);

  return (
    <div className="ptp-stage">
      {/* ════════════ LEFT: IPHONE 15 PRO INTERACTIVE DEVICE ════════════ */}
      <div className="ptp-phone-col">
        <div className="ptp-chassis" role="region" aria-label="航旅纵横宠物出行可交互原型">
          <div className="ptp-screen">
            {/* iOS Status Bar + Dynamic Island */}
            <div
              className={`ptp-statusbar${isDarkStatus ? ' is-light' : ''}${
                screen === 'splash' || screen === 'tracking' ? ' is-overlay' : ''
              }`}
              style={
                screen === 'flights' || screen === 'detail' || screen === 'form'
                  ? { background: '#27a468' }
                  : screen === 'hub'
                  ? { background: '#b8eed7' }
                  : screen === 'random' || screen === 'soloSearch'
                  ? { background: '#c6f1de' }
                  : screen === 'success' || screen === 'orders'
                  ? { background: '#ffffff' }
                  : undefined
              }
            >
              <span>9:41</span>
              <div className="ptp-island" />
              <span className="ptp-status-icons" aria-hidden="true">
                <svg width="15" height="10" viewBox="0 0 15 10" fill="currentColor">
                  <rect x="0" y="6" width="2.4" height="4" rx="0.8" />
                  <rect x="4" y="4" width="2.4" height="6" rx="0.8" />
                  <rect x="8" y="2" width="2.4" height="8" rx="0.8" />
                  <rect x="12" y="0" width="2.4" height="10" rx="0.8" />
                </svg>
                <svg width="21" height="10" viewBox="0 0 21 10" fill="none">
                  <rect x="0.7" y="0.7" width="17.2" height="8.6" rx="2.2" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="2.3" y="2.3" width="13.8" height="5.4" rx="1" fill="currentColor" />
                  <path d="M19.4 3.4V6.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
            </div>

            {toast && <div className="ptp-toast">{toast}</div>}

            {/* ══ SCREEN 0: SPLASH ══ */}
            {screen === 'splash' && (
              <div key="splash" className="ptp-viewport">
                <div className="ptp-splash">
                  <img src={PROTO_ASSETS.splashHero} alt="机长云吞" className="ptp-splash-bg" />
                  <div className="ptp-splash-top">
                    <div className="ptp-splash-kicker">新业务现已上线</div>
                    <div className="ptp-splash-pill">宠物上机</div>
                    <div className="ptp-splash-sub">机长云吞正在待命</div>
                  </div>
                  <div className="ptp-splash-bottom">
                    <button
                      type="button"
                      className="ptp-splash-cta"
                      onClick={() => navigate('hub')}
                    >
                      进入宠物出行 →
                    </button>
                    <div className="ptp-splash-brand">航旅纵横 · Umetrip</div>
                  </div>
                </div>
              </div>
            )}

            {/* ══ SCREEN 1: SERVICE HUB (宠物出行) ══ */}
            {screen === 'hub' && (
              <div key="hub" className="ptp-viewport">
                <div className="ptp-scroll">
                  <div className="ptp-hub-hero">
                    <div className="ptp-nav">
                      <button type="button" className="ptp-nav-btn" onClick={() => navigate('splash')}>
                        ‹
                      </button>
                      <span className="ptp-nav-title">宠物出行</span>
                      <span className="ptp-nav-btn" />
                    </div>
                    <div className="ptp-hub-banner">
                      <div>
                        <h3 className="ptp-hub-title">宠物出行</h3>
                        <span className="ptp-hub-tag">让爱宠出行更简单 · 航旅官方保障</span>
                      </div>
                      <img src={PROTO_ASSETS.hubMascot} alt="云吞机长" className="ptp-hub-mascot" />
                    </div>
                  </div>

                  <div className="ptp-hub-cards">
                    <div className="ptp-service-card">
                      <img src={PROTO_ASSETS.cardSolo} alt="宠物单独飞" className="ptp-service-thumb" />
                      <div className="ptp-service-body">
                        <div>
                          <h4 className="ptp-service-name">宠物单独飞</h4>
                          <div className="ptp-mini-pills">
                            <span>服务多样</span>
                            <span>经济实惠</span>
                            <span>实时追踪</span>
                          </div>
                          <p className="ptp-service-desc">
                            宠物独立乘坐航班，无需主人同行，专业团队全程护送
                          </p>
                        </div>
                        <div className="ptp-service-foot">
                          <span className="ptp-cutoff">⏱ 起飞前60分钟停办</span>
                          <button
                            type="button"
                            className="ptp-btn-green-sm"
                            onClick={() => navigate('soloSearch')}
                          >
                            立即办理
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="ptp-service-card">
                      <img src={PROTO_ASSETS.cardCabin} alt="宠物随机飞" className="ptp-service-thumb" />
                      <div className="ptp-service-body">
                        <div>
                          <h4 className="ptp-service-name">宠物随机飞</h4>
                          <div className="ptp-mini-pills">
                            <span>同机抵达</span>
                            <span>主人同行</span>
                            <span>陪同办理</span>
                          </div>
                          <p className="ptp-service-desc">
                            全程贴身相伴，自动关联已购机票与有氧舱名额，飞行不再分离
                          </p>
                        </div>
                        <div className="ptp-service-foot">
                          <span className="ptp-cutoff">⏱ 起飞前60分钟停办</span>
                          <button
                            type="button"
                            className="ptp-btn-green-sm"
                            onClick={() => navigate('random')}
                          >
                            立即办理
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ptp-rules-box">
                    <div className="ptp-rules-title">::: 服务说明 :::</div>
                    <h5>1、办理说明</h5>
                    <p>
                      宠物上机服务由航旅纵横联合执飞航司共同提供，支持猫、犬等伴侣动物，需提前完成申报，审核通过后方可携宠登机。
                    </p>
                    <h5>2、注意事项</h5>
                    <p>1）乘机前 12 小时禁食，4 小时禁水，防止宠物晕机；</p>
                    <p>2）请确保宠物已注射狂犬等必要疫苗，并携带动物检疫合格证明原件；</p>
                    <p>3）宠物到达目的地前须系挂识别标签（含主人手机号）。</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="ptp-float-orders"
                  onClick={() => navigate(hasOrder ? 'tracking' : 'orders')}
                >
                  我的订单
                </button>
              </div>
            )}

            {/* ══ SCREEN 2B: RANDOM FLIGHT (宠物随机飞 · 三态演示) ══ */}
            {screen === 'random' && (
              <div key="random" className="ptp-viewport">
                <div className="ptp-scroll">
                  <div className="ptp-random-hero">
                    <div className="ptp-nav">
                      <button type="button" className="ptp-nav-btn" onClick={goBack}>
                        ‹
                      </button>
                      <span className="ptp-nav-title">随机飞预约</span>
                      <span className="ptp-nav-btn" />
                    </div>
                    <div className="ptp-random-head">
                      <div>
                        <h3>宠物随机飞</h3>
                        <span className="ptp-hub-tag">轻松同飞 · 落地即见</span>
                      </div>
                      <img src={PROTO_ASSETS.randomMascot} alt="随机飞云吞" className="ptp-random-mascot" />
                    </div>
                  </div>

                  <div className="ptp-quick-row">
                    <button
                      type="button"
                      onClick={() =>
                        setRandomState((s) =>
                          s === 'empty' ? 'available' : s === 'available' ? 'full' : 'empty'
                        )
                      }
                    >
                      🔍 切换库存态 ({randomState === 'empty' ? '无票' : randomState === 'available' ? '充足' : '已满'})
                    </button>
                    <button type="button" onClick={() => navigate(hasOrder ? 'tracking' : 'orders')}>
                      📋 历史订单
                    </button>
                  </div>

                  {randomState === 'empty' ? (
                    <div className="ptp-random-empty">
                      <img src={PROTO_ASSETS.randomEmpty} alt="暂无关联机票" />
                      <p>
                        宠物随机飞，需要先预订相应航班机票后
                        <br />
                        自动匹配该航班有氧舱名额
                      </p>
                      <button
                        type="button"
                        className="ptp-btn-green-lg"
                        onClick={() => {
                          setRandomState('available');
                          showToast('已模拟预订并自动同步东方航空 MU5101 行程');
                        }}
                      >
                        去预订国内机票（模拟同步）
                      </button>
                      <button
                        type="button"
                        className="ptp-link-green"
                        onClick={() => {
                          setRandomState('available');
                          showToast('已手动导入客票 781-2345678901');
                        }}
                      >
                        已购票未显示？尝试手动导入 ›
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="ptp-ticket-card">
                        <div className="ptp-ticket-top">
                          <strong>5月20日 明天</strong>
                          <span style={{ color: '#d43f3a', fontWeight: 700 }}>✈ 东方航空 MU5101</span>
                        </div>
                        <div className="ptp-ticket-route">
                          <div>
                            <div className="ptp-ticket-city">上海虹桥</div>
                            <div className="ptp-ticket-airport">虹桥国际机场 T2</div>
                          </div>
                          <div style={{ color: '#2eb66b', fontSize: 18 }}>✈</div>
                          <div style={{ textAlign: 'right' }}>
                            <div className="ptp-ticket-city">北京大兴</div>
                            <div className="ptp-ticket-airport">大兴国际机场</div>
                          </div>
                        </div>

                        <div className="ptp-ticket-pax">
                          <div>乘机人信息：张*三</div>
                          <div>电子客票号：781-2345678901</div>
                        </div>

                        <div className="ptp-ticket-quota">
                          {randomState === 'available' ? (
                            <>
                              <span className="ptp-quota-dot is-ok">● 有氧舱名额：充足</span>
                              <button
                                type="button"
                                className="ptp-btn-green-sm"
                                onClick={() => {
                                  setSelectedFlightId('MU5101');
                                  navigate('form');
                                }}
                              >
                                立即预约
                              </button>
                            </>
                          ) : (
                            <>
                              <span className="ptp-quota-dot is-full">● 本航班宠物名额已满</span>
                              <button
                                type="button"
                                className="ptp-btn-soft-green"
                                onClick={() => {
                                  showToast('已为您无缝切换至同日可托运航班方案');
                                  navigate('flights');
                                }}
                              >
                                申请托运
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <div style={{ textAlign: 'center', marginBottom: 14 }}>
                        <button
                          type="button"
                          className="ptp-link-green"
                          style={{ marginTop: 0 }}
                          onClick={() =>
                            setRandomState((s) => (s === 'available' ? 'full' : 'available'))
                          }
                        >
                          {randomState === 'available'
                            ? '模拟异常：切换为「本航班名额已满」兜底态 ›'
                            : '切回「有氧舱名额充足」正常态 ›'}
                        </button>
                      </div>
                    </>
                  )}

                  <div className="ptp-random-tips">
                    <h6>温馨提示</h6>
                    <p>1. 请不晚于航班起飞前 90 分钟到达宠物专属值机柜台办理乘机手续。</p>
                    <p>2. 预约成功代表您具备托运名额资格，具体是否成行以现场审核为准。</p>
                    <p>3. 仅有氧舱机型可承运宠物，若遇机型临时调整工作人员将协助妥善处置。</p>
                  </div>
                </div>
              </div>
            )}

            {/* ══ SCREEN 2A: SOLO SEARCH (宠物单独飞) ══ */}
            {screen === 'soloSearch' && (
              <div key="soloSearch" className="ptp-viewport">
                <div className="ptp-scroll" style={{ background: 'linear-gradient(180deg, #c6f1de 0%, #f5f7f6 150px)' }}>
                  <div className="ptp-nav">
                    <button type="button" className="ptp-nav-btn" onClick={goBack}>
                      ‹
                    </button>
                    <span className="ptp-nav-title">宠物单独飞</span>
                    <span className="ptp-nav-btn" />
                  </div>

                  <div className="ptp-solo-banner">
                    <span>🛡 专业宠物航空托运服务 · 安全舒适 · 专业保障</span>
                    <span>✈</span>
                  </div>

                  <div className="ptp-search-card">
                    <div className="ptp-trip-tabs">
                      <button
                        type="button"
                        className={tripType === 'oneway' ? 'is-active' : ''}
                        onClick={() => setTripType('oneway')}
                      >
                        单程
                      </button>
                      <button
                        type="button"
                        className={tripType === 'round' ? 'is-active' : ''}
                        onClick={() => setTripType('round')}
                      >
                        往返
                      </button>
                    </div>

                    <div className="ptp-city-row">
                      <button
                        type="button"
                        className="ptp-city-btn"
                        onClick={() => setModal('cityFrom')}
                      >
                        {fromCity.name}
                        <span className="ptp-city-sub">{fromCity.cargoA}</span>
                      </button>
                      <button
                        type="button"
                        className="ptp-swap-btn"
                        aria-label="互换出发与到达城市"
                        onClick={() => {
                          setFromCityIdx(toCityIdx);
                          setToCityIdx(fromCityIdx);
                        }}
                      >
                        ⇄
                      </button>
                      <button
                        type="button"
                        className="ptp-city-btn is-right"
                        onClick={() => setModal('cityTo')}
                      >
                        {toCity.name}
                        <span className="ptp-city-sub">{toCity.cargoA}</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      className="ptp-search-row"
                      onClick={() =>
                        setTravelDate((d) =>
                          d === '5月20日 明天' ? '5月21日 周四' : '5月20日 明天'
                        )
                      }
                    >
                      <span>📅 {travelDate}</span>
                      <small style={{ marginLeft: 'auto' }}>点击切换日期 ›</small>
                    </button>

                    <div style={{ paddingTop: 10 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#2b3d34' }}>
                        🐾 宠物预估总重量（含航空箱）
                      </div>
                      <div className="ptp-weight-chips">
                        {WEIGHT_OPTIONS.map((w) => (
                          <button
                            key={w.id}
                            type="button"
                            className={`ptp-weight-chip${weightKey === w.id ? ' is-active' : ''}`}
                            onClick={() => {
                              setWeightKey(w.id);
                              setWeightKg(w.sampleWeight);
                              setCrateOverride(null);
                            }}
                          >
                            {w.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="ptp-promo-line">🎁 首单免费赠送宠物航空意外险，下单即领 ›</div>

                    <div className="ptp-search-actions">
                      <button
                        type="button"
                        className="ptp-btn-gold"
                        onClick={() => navigate('flights')}
                      >
                        <strong>查询方案</strong>
                        <span>40+ 国内航空公司直销</span>
                      </button>
                      <button
                        type="button"
                        className="ptp-ai-book-btn"
                        onClick={() => {
                          setFlightFilter('wide');
                          showToast('AI 预订：已为您优先匹配宽体机独立有氧舱方案');
                          navigate('flights');
                        }}
                      >
                        <span>✦</span>
                        <span>AI预订</span>
                      </button>
                    </div>
                  </div>

                  <div className="ptp-notice-card">
                    <strong style={{ display: 'block', marginBottom: 4, color: '#2b3d34' }}>
                      💡 货运托运须知
                    </strong>
                    • 单独货运不与主人客票绑定，宠物独立由机场货运站安排舱位。
                    <br />• 宽体客机货舱均配置独立供氧与恒温控制系统，安全性更高。
                  </div>
                </div>
              </div>
            )}

            {/* ══ SCREEN 3: FLIGHT LIST (航线方案列表) ══ */}
            {screen === 'flights' && (
              <div key="flights" className="ptp-viewport">
                <div className="ptp-green-header">
                  <div className="ptp-nav">
                    <button type="button" className="ptp-nav-btn" onClick={goBack}>
                      ‹
                    </button>
                    <span className="ptp-nav-title">
                      {fromCity.name} ⇄ {toCity.name}
                    </span>
                    <button
                      type="button"
                      className="ptp-nav-btn"
                      onClick={() => showToast('航旅宠物专线客服 24h 在线')}
                    >
                      帮助
                    </button>
                  </div>
                  <div className="ptp-submeta-bar">
                    {travelDate.split(' ')[0]}（周三） | 宠物含箱{' '}
                    {WEIGHT_OPTIONS.find((w) => w.id === weightKey)?.label} |{' '}
                    {tripType === 'oneway' ? '单程货运' : '往返货运'}
                  </div>
                </div>

                <div className="ptp-filter-bar">
                  {[
                    { id: 'all', label: '综合排序' },
                    { id: 'wide', label: '宽体机' },
                    { id: 'mu', label: '东方航空 (1)' },
                    { id: 'ca', label: '中国国航 (1)' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      className={`ptp-filter-pill${flightFilter === f.id ? ' is-active' : ''}`}
                      onClick={() => setFlightFilter(f.id)}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <div className="ptp-scroll">
                  <div className="ptp-flight-list">
                    {filteredFlights.map((fl) => (
                      <div key={fl.id} className="ptp-flight-card">
                        {fl.badge && <span className="ptp-rec-ribbon">🏆 {fl.badge}</span>}
                        <div className="ptp-flight-airline">
                          <span>✈ {fl.airline} {fl.code}</span>
                          <span className="ptp-aircraft-badge">{fl.aircraft}</span>
                        </div>

                        <div className="ptp-flight-times">
                          <div className="ptp-time-col">
                            <small>交接</small>
                            <strong>{fl.handoffTime}</strong>
                            <span>{fromCity[fl.fromStationKey]}</span>
                          </div>
                          <div className="ptp-flight-mid">
                            <div>{fl.takeoffText}</div>
                            <div className="ptp-mid-line" />
                            <div>{fl.duration}</div>
                          </div>
                          <div className="ptp-time-col is-right">
                            <small>提取</small>
                            <strong>{fl.pickupTime}</strong>
                            <span>{toCity[fl.toStationKey]}</span>
                          </div>
                        </div>

                        <div className="ptp-perks-bar">
                          {fl.perks.map((p) => (
                            <span key={p}>• {p}</span>
                          ))}
                        </div>

                        <div className="ptp-flight-foot">
                          <div>
                            <div className="ptp-price-label">{fl.priceLabel}</div>
                            <div className="ptp-price-row">
                              <span className="ptp-price-num">¥{fl.price}</span>
                              {fl.scarcity && <span className="ptp-scarcity">{fl.scarcity}</span>}
                            </div>
                          </div>
                          <button
                            type="button"
                            className="ptp-btn-green-sm"
                            style={{ height: 32, padding: '0 16px' }}
                            onClick={() => {
                              setSelectedFlightId(fl.id);
                              navigate('detail');
                            }}
                          >
                            立即购买
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ══ SCREEN 4: PLAN DETAIL (方案详情) ══ */}
            {screen === 'detail' && (
              <div key="detail" className="ptp-viewport">
                <div className="ptp-green-header">
                  <div className="ptp-nav">
                    <button type="button" className="ptp-nav-btn" onClick={goBack}>
                      ‹
                    </button>
                    <span className="ptp-nav-title">方案详情</span>
                    <button
                      type="button"
                      className="ptp-nav-btn"
                      onClick={() => showToast('专属管家将协助代办三证与全程监护')}
                    >
                      帮助
                    </button>
                  </div>
                  <div style={{ padding: '4px 16px 4px', position: 'relative' }}>
                    {selectedFlight.badge && (
                      <span
                        style={{
                          position: 'absolute',
                          right: 16,
                          top: 0,
                          fontSize: 10,
                          fontWeight: 700,
                          padding: '3px 9px',
                          borderRadius: 999,
                          background: '#f8dfad',
                          color: '#6b4310',
                        }}
                      >
                        🏆 {selectedFlight.badge}
                      </span>
                    )}
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
                      ✈ {selectedFlight.airline} {selectedFlight.code}
                    </div>
                    <div style={{ fontSize: 11.5, opacity: 0.9, marginBottom: 8 }}>
                      {travelDate.split(' ')[0]}（周三） | 宠物含箱 ≤ 15kg
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span style={{ fontSize: 10.5, padding: '2px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.2)' }}>
                        {selectedFlight.aircraft}
                      </span>
                      <span style={{ fontSize: 10.5, padding: '2px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.2)' }}>
                        {selectedFlight.oxygenTag}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="ptp-scroll" style={{ paddingTop: 10 }}>
                  <div className="ptp-detail-card">
                    <div className="ptp-flight-times" style={{ marginBottom: 0 }}>
                      <div className="ptp-time-col">
                        <small>交接</small>
                        <strong>{selectedFlight.handoffTime}</strong>
                        <span>{fromCity[selectedFlight.fromStationKey]}</span>
                      </div>
                      <div className="ptp-flight-mid">
                        <div>{selectedFlight.takeoffText}</div>
                        <div className="ptp-mid-line" />
                        <div>{selectedFlight.duration}</div>
                      </div>
                      <div className="ptp-time-col is-right">
                        <small>提取</small>
                        <strong>{selectedFlight.pickupTime}</strong>
                        <span>{toCity[selectedFlight.toStationKey]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="ptp-detail-card">
                    <h4 className="ptp-sec-h">服务包含项目</h4>
                    <div className="ptp-benefits-hub">
                      <div className="ptp-benefit-col">
                        <div className="ptp-benefit-node">
                          <div className="ptp-benefit-ico">📄</div>
                          <strong>代办三证</strong>
                          <span>无需奔波跑腿</span>
                        </div>
                        <div className="ptp-benefit-node">
                          <div className="ptp-benefit-ico">🛡</div>
                          <strong>赠送保险</strong>
                          <span>宠物航空险</span>
                        </div>
                      </div>
                      <img src={PROTO_ASSETS.crate3d} alt="标准航空箱与云吞" className="ptp-crate-img" />
                      <div className="ptp-benefit-col">
                        <div className="ptp-benefit-node">
                          <div className="ptp-benefit-ico">🚐</div>
                          <strong>同城专车</strong>
                          <span>专业宠物接送</span>
                        </div>
                        <div className="ptp-benefit-node">
                          <div className="ptp-benefit-ico">🧳</div>
                          <strong>标准航空箱</strong>
                          <span>国际航协标准</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ptp-detail-card">
                    <h4 className="ptp-sec-h">费用构成明细</h4>
                    {selectedFlight.breakdown.map((b) => (
                      <div key={b.label} className="ptp-fee-row">
                        <span>{b.label}</span>
                        <strong className={b.highlight ? 'is-free' : ''}>{b.price}</strong>
                      </div>
                    ))}
                    <div className="ptp-fee-total">
                      <span>方案预估总价</span>
                      <span style={{ color: '#e45044', fontSize: 17 }}>¥ {selectedFlight.price}</span>
                    </div>
                  </div>

                  <div className="ptp-detail-card">
                    <h4 className="ptp-sec-h">托运限制及健康要求</h4>
                    <div className="ptp-alert-box is-red">
                      <strong>⚠ 严格禁飞品种</strong>
                      短鼻类猫犬（如法斗、巴哥、加菲猫、波斯猫等）由于高空易窒息，属于民航禁运品种，本方案不支持承运。
                    </div>
                    <div className="ptp-alert-box is-green">
                      <strong>✓ 健康及适运状态</strong>
                      宠物年龄须在 8 周至 10 周岁内，处于非怀孕、非术后康复期。为了起飞安全，交接前 4 小时请务必禁食。
                    </div>
                  </div>
                </div>

                <div className="ptp-sticky-bar">
                  <div className="ptp-sticky-row">
                    <div>
                      <div style={{ fontSize: 10.5, color: '#7d8c84' }}>方案预估总价</div>
                      <div className="ptp-price-num">¥{selectedFlight.price}</div>
                    </div>
                    <button
                      type="button"
                      className="ptp-btn-green-lg"
                      style={{ width: 172, height: 40 }}
                      onClick={() => navigate('form')}
                    >
                      前往填写订单
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ══ SCREEN 5: FORM FILLING (组件化防错表单) ══ */}
            {screen === 'form' && (
              <div key="form" className="ptp-viewport">
                <div className="ptp-green-header" style={{ paddingBottom: 2 }}>
                  <div className="ptp-nav">
                    <button type="button" className="ptp-nav-btn" onClick={goBack}>
                      ‹
                    </button>
                    <span className="ptp-nav-title">填写订单信息</span>
                    <button
                      type="button"
                      className="ptp-nav-btn"
                      style={{ fontSize: 11, opacity: 0.92 }}
                      onClick={handleAutoFillForm}
                    >
                      一键填
                    </button>
                  </div>
                  <div className="ptp-steps-bar">
                    <span className="is-done">✓ 选航班</span>
                    <span className="ptp-steps-line" />
                    <span className="is-now">② 填信息</span>
                    <span className="ptp-steps-line" />
                    <span>3 支付</span>
                  </div>
                </div>

                <div className="ptp-scroll">
                  {/* 宠物档案 */}
                  <div className="ptp-form-card">
                    <div className="ptp-form-card-head">
                      <h4>宠物档案</h4>
                      <span className="ptp-req-badge">* 必填项</span>
                    </div>

                    <div className="ptp-field">
                      <span className="ptp-field-label">品种<em>*</em></span>
                      <button
                        type="button"
                        className="ptp-field-val"
                        onClick={() => {
                          setBreedSearch('');
                          setBreedAlert(null);
                          setModal('breed');
                        }}
                      >
                        {breed} ›
                      </button>
                    </div>

                    <div className="ptp-field">
                      <span className="ptp-field-label">昵称<em>*</em></span>
                      <input
                        className="ptp-inline-input"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        placeholder="请输入宠物昵称"
                      />
                    </div>

                    <div className="ptp-field">
                      <span className="ptp-field-label">性别<em>*</em></span>
                      <div className="ptp-seg">
                        {['雄性', '雌性'].map((g) => (
                          <button
                            key={g}
                            type="button"
                            className={gender === g ? 'is-active' : ''}
                            onClick={() => setGender(g)}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="ptp-field">
                      <span className="ptp-field-label">绝育情况<em>*</em></span>
                      <div className="ptp-seg">
                        {['已绝育', '未绝育'].map((n) => (
                          <button
                            key={n}
                            type="button"
                            className={neutered === n ? 'is-active' : ''}
                            onClick={() => setNeutered(n)}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="ptp-field">
                      <span className="ptp-field-label">体重<em>*</em></span>
                      <div className="ptp-weight-stepper">
                        <button
                          type="button"
                          className="ptp-step-mini"
                          onClick={() => {
                            setCrateOverride(null);
                            setWeightKg((w) => Math.max(1.5, Number((w - 2).toFixed(1))));
                          }}
                        >
                          −
                        </button>
                        <strong style={{ fontSize: 12.5, minWidth: 46, textAlign: 'center' }}>
                          {weightKg} kg
                        </strong>
                        <button
                          type="button"
                          className="ptp-step-mini"
                          onClick={() => {
                            setCrateOverride(null);
                            setWeightKg((w) => Math.min(30, Number((w + 2).toFixed(1))));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="ptp-field">
                      <span className={`ptp-field-label${!ageObj.eligible ? ' is-err' : ''}`}>
                        年龄<em>*</em>
                      </span>
                      <button
                        type="button"
                        className={`ptp-field-val${!ageObj.eligible ? ' is-err' : ''}`}
                        onClick={() => setModal('age')}
                      >
                        {ageObj.label} ›
                      </button>
                    </div>
                    {!ageObj.eligible && (
                      <div className="ptp-inline-err">⚠ {ageObj.note}</div>
                    )}
                  </div>

                  {/* 寄宠与上门信息 */}
                  <div className="ptp-form-card">
                    <div className="ptp-form-card-head">
                      <h4>寄宠与上门信息</h4>
                    </div>

                    <div className="ptp-field">
                      <span className="ptp-field-label">发件地址<em>*</em></span>
                      <button
                        type="button"
                        className="ptp-field-val"
                        onClick={() => setModal('addrSend')}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{senderAddr.detail}</span>
                        <span style={{ flexShrink: 0 }}>›</span>
                      </button>
                    </div>

                    <div className="ptp-field">
                      <span className={`ptp-field-label${!pickupSlot ? ' is-err' : ''}`}>
                        上门时间<em>*</em>
                      </span>
                      <button
                        type="button"
                        className={`ptp-field-val${!pickupSlot ? ' is-err' : ''}`}
                        onClick={() => setModal('slot')}
                      >
                        {pickupSlot || '请选择日期与时段 ›'}
                      </button>
                    </div>
                    {!pickupSlot && (
                      <div className="ptp-inline-err">
                        ⚠ 上门时间不能为空，请选择合理的上门揽收时段
                      </div>
                    )}
                  </div>

                  {/* 收宠与提宠信息 */}
                  <div className="ptp-form-card">
                    <div className="ptp-form-card-head">
                      <h4>收宠与提宠信息</h4>
                    </div>
                    <div className="ptp-field">
                      <span className="ptp-field-label">收宠地址<em>*</em></span>
                      <button
                        type="button"
                        className="ptp-field-val"
                        onClick={() => setModal('addrRecv')}
                      >
                        {receiverAddr.detail} ›
                      </button>
                    </div>
                    <div className="ptp-field">
                      <span className="ptp-field-label">联系人姓名<em>*</em></span>
                      <input
                        className="ptp-inline-input"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="提宠人姓名"
                      />
                    </div>
                    <div className="ptp-field">
                      <span className="ptp-field-label">联系电话<em>*</em></span>
                      <input
                        className="ptp-inline-input"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="提宠人手机号"
                      />
                    </div>
                  </div>

                  {/* 运输箱规格（智能推荐） */}
                  <div className="ptp-form-card">
                    <div className="ptp-form-card-head">
                      <h4>运输箱规格</h4>
                      <span className="ptp-smart-badge">系统智能推荐</span>
                    </div>
                    <div className="ptp-crate-grid">
                      {[
                        { num: 1, label: '1号箱', cap: '≤ 6kg' },
                        { num: 2, label: '2号箱', cap: '≤ 15kg' },
                        { num: 3, label: '3号箱', cap: '≤ 32kg' },
                      ].map((c) => (
                        <button
                          key={c.num}
                          type="button"
                          className={`ptp-crate-opt${activeCrate === c.num ? ' is-active' : ''}`}
                          onClick={() => setCrateOverride(c.num)}
                        >
                          {recommendedCrate === c.num && (
                            <span className="ptp-crate-rec-tag">推荐</span>
                          )}
                          <strong>{c.label}</strong>
                          <span>{c.cap}</span>
                        </button>
                      ))}
                    </div>
                    <div className="ptp-crate-note">
                      ✓ 已根据宠物活体净重 {weightKg}kg 自动匹配合规 {recommendedCrate}号航空箱规格
                    </div>
                  </div>

                  {/* 影像与资质材料（OCR 提效） */}
                  <div className="ptp-form-card">
                    <div className="ptp-form-card-head">
                      <h4>影像与资质材料</h4>
                      <span className="ptp-req-badge">* 必填</span>
                    </div>
                    <div className="ptp-upload-grid">
                      <button
                        type="button"
                        className={`ptp-upload-slot${photoUploaded ? ' is-ok' : ' is-missing'}`}
                        onClick={() => {
                          setPhotoUploaded((v) => !v);
                          showToast(photoUploaded ? '已移除合照' : '✓ 已上传宠物与航空箱合照');
                        }}
                      >
                        <span style={{ fontSize: 16 }}>{photoUploaded ? '📸' : '＋'}</span>
                        <strong>宠物与箱合照</strong>
                        <span className={photoUploaded ? 'ptp-ocr-pill' : 'ptp-miss-pill'}>
                          {photoUploaded ? '已上传' : '未上传'}
                        </span>
                      </button>

                      <button
                        type="button"
                        className={`ptp-upload-slot${quarantineOcr ? ' is-ok' : ''}`}
                        onClick={() => setModal('ocr')}
                      >
                        <span style={{ fontSize: 11, color: '#7c8b83' }}>[检疫证原件]</span>
                        <strong>动物检疫证</strong>
                        <span className="ptp-ocr-pill">OCR已提</span>
                      </button>

                      <button
                        type="button"
                        className={`ptp-upload-slot${vaccineUploaded ? ' is-ok' : ''}`}
                        onClick={() => {
                          setVaccineUploaded((v) => !v);
                          showToast(vaccineUploaded ? '已取消疫苗本' : '✓ 疫苗本狂犬贴纸已核验');
                        }}
                      >
                        <span style={{ fontSize: 16 }}>{vaccineUploaded ? '💉' : '＋'}</span>
                        <strong>疫苗本原件</strong>
                        <span style={{ fontSize: 9.5, color: vaccineUploaded ? '#249b59' : '#8e9d95' }}>
                          {vaccineUploaded ? '已核验' : '含狂犬贴纸'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* 增值服务 */}
                  <div className="ptp-form-card">
                    <div className="ptp-form-card-head">
                      <h4>增值服务（可选）</h4>
                    </div>
                    <button
                      type="button"
                      className={`ptp-addon-row${addonInsurance ? ' is-active' : ''}`}
                      onClick={() => setAddonInsurance((v) => !v)}
                    >
                      <span className={`ptp-check${addonInsurance ? ' is-checked' : ''}`}>
                        {addonInsurance ? '✓' : ''}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 700 }}>宠运无忧综合险</div>
                        <div style={{ fontSize: 10.5, color: '#7e8e86' }}>
                          全程意外伤害与应急丢失保障，最高赔付 1 万元
                        </div>
                      </div>
                      <strong style={{ fontSize: 12, color: '#249b59' }}>¥19</strong>
                    </button>

                    <button
                      type="button"
                      className={`ptp-addon-row${addonValuation ? ' is-active' : ''}`}
                      onClick={() => setAddonValuation((v) => !v)}
                    >
                      <span className={`ptp-check${addonValuation ? ' is-checked' : ''}`}>
                        {addonValuation ? '✓' : ''}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 700 }}>全额保价服务</div>
                        <div style={{ fontSize: 10.5, color: '#7e8e86' }}>
                          声明宠物实际估值，享独立保额超额赔付
                        </div>
                      </div>
                      <strong style={{ fontSize: 12, color: '#6b7b72' }}>¥40</strong>
                    </button>
                  </div>

                  {/* 订单备注 */}
                  <div className="ptp-form-card" style={{ marginBottom: 12 }}>
                    <div className="ptp-form-card-head">
                      <h4>订单备注（选填）</h4>
                    </div>
                    <input
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      placeholder="例如：狗狗比较胆小，请轻声安抚"
                      style={{
                        width: '100%',
                        height: 36,
                        borderRadius: 8,
                        border: '1px solid #e6ece9',
                        background: '#f8faf9',
                        padding: '0 10px',
                        fontSize: 12,
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Sticky Validation & Submit Bar */}
                <div className="ptp-sticky-bar">
                  {formMissing.length > 0 && (
                    <button
                      type="button"
                      className="ptp-form-banner-err"
                      onClick={() =>
                        showToast(`待完善：${formMissing.join('、')}（点右上角「一键填」可快速体验）`)
                      }
                    >
                      ⚠ 还有 {formMissing.length} 项未正确填写，请完善后提交
                    </button>
                  )}
                  <div className="ptp-agree-row">
                    <button
                      type="button"
                      className={`ptp-check${agreed ? ' is-checked' : ''}`}
                      style={{ marginTop: 0 }}
                      onClick={() => setAgreed((v) => !v)}
                    >
                      {agreed ? '✓' : ''}
                    </button>
                    <span>
                      我已阅读并同意 <em style={{ fontStyle: 'normal', color: '#249b59' }}>《承运方活体免责声明》</em>
                    </span>
                  </div>
                  <div className="ptp-submit-pill">
                    <div className="ptp-submit-left">
                      <div>
                        <strong>¥{totalPrice}</strong>
                        <span style={{ marginLeft: 6 }}>订单金额</span>
                      </div>
                      <button type="button" onClick={() => setModal('price')}>
                        <span>明细 ▲</span>
                      </button>
                    </div>
                    <button
                      type="button"
                      className={`ptp-submit-btn${formMissing.length > 0 ? ' is-disabled' : ''}`}
                      onClick={() => {
                        if (formMissing.length > 0) {
                          showToast(`请先完善：${formMissing[0]}`);
                          return;
                        }
                        setHasOrder(true);
                        setTrackStageIdx(2);
                        navigate('success');
                      }}
                    >
                      提交订单
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ══ SCREEN 6: ORDER SUCCESS ══ */}
            {screen === 'success' && (
              <div key="success" className="ptp-viewport">
                <div className="ptp-status-page">
                  <img src={PROTO_ASSETS.statusSuccess} alt="云吞机长确认提交成功" />
                  <h3>订单提交成功</h3>
                  <p>
                    「{petName || '小航'}」的宠物托运申请已进入系统
                    <br />
                    预计 15 分钟内为您锁定 {selectedFlight.code} 有氧舱位
                  </p>
                  <button
                    type="button"
                    className="ptp-btn-green-lg"
                    onClick={() => navigate('tracking')}
                  >
                    查看订单详情（实时追踪）
                  </button>
                  <button
                    type="button"
                    className="ptp-btn-gray-lg"
                    onClick={() => navigate('hub')}
                  >
                    返回首页
                  </button>
                </div>
              </div>
            )}

            {/* ══ SCREEN 6B: EMPTY ORDERS ══ */}
            {screen === 'orders' && (
              <div key="orders" className="ptp-viewport" style={{ background: '#ffffff' }}>
                <div className="ptp-nav">
                  <button type="button" className="ptp-nav-btn" onClick={goBack}>
                    ‹
                  </button>
                  <span className="ptp-nav-title">我的订单</span>
                  <span style={{ fontSize: 11.5, color: '#6b7b72' }}>我的发票</span>
                </div>
                <div className="ptp-status-page">
                  <img src={PROTO_ASSETS.statusEmpty} alt="暂无订单" />
                  <h3>暂无订单</h3>
                  <p>还没有宠物出行托运记录，去为毛孩子预约一次安心飞行吧</p>
                  <button
                    type="button"
                    className="ptp-btn-green-lg"
                    onClick={() => navigate('soloSearch')}
                  >
                    立即查询托运方案
                  </button>
                </div>
              </div>
            )}

            {/* ══ SCREEN 7: LIVE FLIGHT TRACKING (黑盒可视化) ══ */}
            {screen === 'tracking' && (
              <div key="tracking" className="ptp-viewport">
                <div className="ptp-track-wrap">
                  <div className="ptp-map-box">
                    {/* Floating Transparent Header */}
                    <div
                      className="ptp-nav"
                      style={{ position: 'absolute', top: 44, left: 0, right: 0, zIndex: 12 }}
                    >
                      <button
                        type="button"
                        className="ptp-nav-btn"
                        style={{ background: 'rgba(255,255,255,0.88)', fontWeight: 700 }}
                        onClick={() => navigate('hub')}
                      >
                        ‹
                      </button>
                      <span
                        className="ptp-nav-title"
                        style={{
                          background: 'rgba(255,255,255,0.88)',
                          padding: '4px 14px',
                          borderRadius: 999,
                          fontSize: 13.5,
                        }}
                      >
                        {trackStage.headerTitle}
                      </span>
                      <button
                        type="button"
                        className="ptp-nav-btn"
                        style={{ background: 'rgba(255,255,255,0.88)' }}
                        onClick={() => setModal('poster')}
                        title="生成分享海报"
                      >
                        ↗
                      </button>
                    </div>

                    {/* Stylized China Eastern Coast Route Map SVG */}
                    <svg className="ptp-map-svg" viewBox="0 0 370 315" fill="none">
                      {/* Soft land polygons & coastline */}
                      <path
                        d="M0 0 H290 C282 36 270 64 252 84 C272 98 292 106 300 124 C282 142 268 152 284 182 C298 206 310 232 296 266 C284 290 274 304 268 315 H0 Z"
                        fill="#f8fbf9"
                        stroke="#cde0e8"
                        strokeWidth="1.5"
                      />
                      {/* Subtle province dividers */}
                      <path d="M62 128 Q140 120 226 142" stroke="#e4eef2" strokeWidth="1" />
                      <path d="M40 202 Q155 190 282 214" stroke="#e4eef2" strokeWidth="1" />
                      <path d="M138 56 Q150 155 128 280" stroke="#e4eef2" strokeWidth="1" />

                      {/* City Labels */}
                      <text x="58" y="150" fill="#8b9da6" fontSize="9.5">太原</text>
                      <text x="96" y="218" fill="#8b9da6" fontSize="9.5">郑州</text>
                      <text x="198" y="106" fill="#6b8089" fontSize="9.5">天津</text>
                      <text x="292" y="176" fill="#8b9da6" fontSize="9.5">青岛</text>

                      {/* Dashed full flight route */}
                      <path
                        d={`M ${ROUTE_P0.x} ${ROUTE_P0.y} C ${ROUTE_P1.x} ${ROUTE_P1.y}, ${ROUTE_P2.x} ${ROUTE_P2.y}, ${ROUTE_P3.x} ${ROUTE_P3.y}`}
                        stroke="#bfe8d2"
                        strokeWidth="3.5"
                        strokeDasharray="6 5"
                        strokeLinecap="round"
                      />
                      {/* Completed solid green flight route */}
                      <path
                        d={`M ${ROUTE_P0.x} ${ROUTE_P0.y} C ${ROUTE_P1.x} ${ROUTE_P1.y}, ${ROUTE_P2.x} ${ROUTE_P2.y}, ${ROUTE_P3.x} ${ROUTE_P3.y}`}
                        stroke="#2eb86c"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        pathLength="100"
                        strokeDasharray={`${Math.max(4, trackStage.progress * 100)} 100`}
                      />

                      {/* Origin pill: 上海虹桥 */}
                      <g transform="translate(216, 240)">
                        <rect x="0" y="0" width="72" height="20" rx="10" fill="#2c7bf2" />
                        <text x="36" y="13.5" textAnchor="middle" fill="#fff" fontSize="9.5" fontWeight="700">
                          ● 上海虹桥
                        </text>
                      </g>

                      {/* Destination pill: 北京大兴 */}
                      <g transform="translate(140, 96)">
                        <rect x="0" y="0" width="72" height="20" rx="10" fill="#2fb96c" />
                        <text x="36" y="13.5" textAnchor="middle" fill="#fff" fontSize="9.5" fontWeight="700">
                          ● 北京大兴
                        </text>
                      </g>
                    </svg>

                    {/* Animated ETA Bubble + Flying 云吞机长 */}
                    <div
                      className="ptp-map-eta-bubble"
                      style={{
                        left: `${(planeCoord.x / 370) * 100}%`,
                        top: `${Math.max(26, ((planeCoord.y - 26) / 315) * 100)}%`,
                      }}
                    >
                      {trackStage.etaPill}
                    </div>
                    <img
                      src={PROTO_ASSETS.planeCaptain}
                      alt="云吞机长飞行中"
                      className="ptp-map-plane"
                      style={{
                        left: `${(planeCoord.x / 370) * 100}%`,
                        top: `${(planeCoord.y / 315) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Bottom Tracking Sheet */}
                  <div className="ptp-track-sheet">
                    <div className="ptp-eta-head">
                      <div>
                        <div style={{ fontSize: 11, color: '#7a8a82', fontWeight: 600 }}>
                          {trackStage.etaPrefix}
                        </div>
                        <div className="ptp-eta-big">{trackStage.etaTime}</div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#2b3c33', marginTop: 2 }}>
                          {trackStage.etaPlace}
                        </div>
                      </div>
                      <button
                        type="button"
                        style={{
                          fontSize: 11.5,
                          fontWeight: 600,
                          color: '#25352d',
                          background: '#f2f6f4',
                          padding: '6px 11px',
                          borderRadius: 999,
                        }}
                        onClick={() => showToast('已接入 24h 宠物运输专属管家')}
                      >
                        🎧 联系客服
                      </button>
                    </div>

                    <div className="ptp-guide-bar">
                      请接机人 <strong>{contactName || '阿童'}</strong> 携带有效身份证件，至{' '}
                      <strong>T2 提取处</strong> 办理提宠。
                    </div>

                    <div className="ptp-pet-mini-card">
                      <div className="ptp-pet-mini-left">
                        <img src={PROTO_ASSETS.petAvatar} alt="小航头像" />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <strong style={{ fontSize: 14 }}>{petName || '小航'}</strong>
                            <span
                              style={{
                                fontSize: 10,
                                padding: '1px 6px',
                                borderRadius: 999,
                                background: '#e7f8ef',
                                color: '#218e52',
                                fontWeight: 700,
                              }}
                            >
                              ● 有氧舱
                            </span>
                          </div>
                          <div style={{ fontSize: 10.5, color: '#7f8e86', marginTop: 2 }}>
                            {breed} · PT-20250519001
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        style={{ textAlign: 'right' }}
                        onClick={() => setModal('price')}
                      >
                        <div style={{ fontSize: 15, fontWeight: 800, color: '#24342b' }}>¥ {totalPrice}</div>
                        <div style={{ fontSize: 10.5, color: '#249b59', fontWeight: 600 }}>明细 ▼</div>
                      </button>
                    </div>

                    {/* Interactive 5-Stage Progress Rail */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: 12.5 }}>全流程追踪</strong>
                      <button
                        type="button"
                        style={{ fontSize: 11, color: '#249b59', fontWeight: 600 }}
                        onClick={() => setModal('timeline')}
                      >
                        查看全部 ›
                      </button>
                    </div>

                    <div className="ptp-stage-rail">
                      {TRACKING_STAGES.map((st, idx) => {
                        const isDone = idx < trackStageIdx;
                        const isNow = idx === trackStageIdx;
                        return (
                          <button
                            key={st.key}
                            type="button"
                            className={`ptp-stage-node${isDone ? ' is-done' : ''}${isNow ? ' is-now' : ''}`}
                            onClick={() => setTrackStageIdx(idx)}
                          >
                            <span className="ptp-stage-dot">{isDone ? '✓' : ''}</span>
                            <span>{st.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="ptp-log-strip">
                      <strong style={{ color: '#1b2b23', marginRight: 6 }}>{trackStage.summaryTime}</strong>
                      {trackStage.summaryText}
                    </div>

                    {/* Peak-End Arrival Celebration Card */}
                    {trackStageIdx === 4 ? (
                      <div className="ptp-arrived-banner">
                        <img src={PROTO_ASSETS.arrivedCaptain} alt="小航已平安落地" />
                        <div style={{ flex: 1 }}>
                          <strong style={{ display: 'block', fontSize: 14, color: '#15251c' }}>
                            {petName || '小航'} 已平安落地北京！
                          </strong>
                          <span style={{ display: 'block', fontSize: 11, color: '#5b6d64', margin: '3px 0 8px' }}>
                            总计飞行 1760 公里 · 快给朋友们报个平安吧
                          </span>
                          <button
                            type="button"
                            className="ptp-btn-green-sm"
                            style={{ width: '100%', height: 32 }}
                            onClick={() => setModal('poster')}
                          >
                            生成专属接机海报 📷
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="ptp-link-green"
                        style={{ width: '100%', textAlign: 'center' }}
                        onClick={() => {
                          setTrackStageIdx(4);
                          showToast('航班已模拟抵达北京大兴，可生成专属接机海报！');
                        }}
                      >
                        快进至「已到达」体验峰终接机海报 ›
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ════════════ HALF-SHEET MODALS INSIDE PHONE ════════════ */}

            {/* City Picker Modal */}
            {(modal === 'cityFrom' || modal === 'cityTo') && (
              <div className="ptp-modal-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-head">
                    <span>选择{modal === 'cityFrom' ? '出发' : '到达'}城市</span>
                    <button type="button" onClick={() => setModal(null)}>关闭</button>
                  </div>
                  <div className="ptp-sheet-body">
                    {CITIES.map((c, idx) => (
                      <button
                        key={c.code}
                        type="button"
                        className="ptp-breed-item"
                        onClick={() => {
                          if (modal === 'cityFrom') {
                            if (idx === toCityIdx) setToCityIdx(fromCityIdx);
                            setFromCityIdx(idx);
                          } else {
                            if (idx === fromCityIdx) setFromCityIdx(toCityIdx);
                            setToCityIdx(idx);
                          }
                          setModal(null);
                        }}
                      >
                        <div>
                          <strong>{c.name} ({c.code})</strong>
                          <span>{c.cargoA}</span>
                        </div>
                        <span style={{ color: '#249b59', fontWeight: 700 }}>
                          {(modal === 'cityFrom' ? fromCityIdx : toCityIdx) === idx ? '✓' : ''}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Drawer 1: Breed Picker with Search + Ban Alert */}
            {modal === 'breed' && (
              <div className="ptp-modal-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-head">
                    <button type="button" style={{ color: '#7e8e86', fontSize: 12.5 }} onClick={() => setModal(null)}>
                      取消
                    </button>
                    <span>选择品种</span>
                    <button type="button" style={{ color: '#249b59', fontSize: 12.5 }} onClick={() => setModal(null)}>
                      确定
                    </button>
                  </div>
                  <input
                    className="ptp-sheet-search"
                    value={breedSearch}
                    onChange={(e) => setBreedSearch(e.target.value)}
                    placeholder="🔍 搜索品种（试试搜“法斗”触发禁飞拦截）"
                  />
                  {!breedSearch && (
                    <div className="ptp-seg" style={{ marginBottom: 10 }}>
                      {[
                        { id: 'dog', label: '犬类' },
                        { id: 'cat', label: '猫类' },
                        { id: 'other', label: '其他' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          className={breedTab === t.id ? 'is-active' : ''}
                          onClick={() => {
                            setBreedTab(t.id);
                            setBreedAlert(null);
                          }}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  )}
                  {breedAlert && (
                    <div className="ptp-inline-err" style={{ marginTop: 0 }}>
                      🚫 <strong>民航风控拦截：</strong>{breedAlert}
                    </div>
                  )}
                  <div className="ptp-sheet-body">
                    {visibleBreeds.map((b) => (
                      <button
                        key={b.name}
                        type="button"
                        className={`ptp-breed-item${b.banned ? ' is-banned' : ''}`}
                        onClick={() => {
                          if (b.banned) {
                            setBreedAlert(`${b.name} — ${b.banReason}`);
                            return;
                          }
                          setBreed(b.name);
                          setBreedAlert(null);
                          setModal(null);
                        }}
                      >
                        <div>
                          <strong>{b.name}</strong>
                          <span>{b.sub}</span>
                        </div>
                        {b.banned ? (
                          <span className="ptp-miss-pill">禁飞</span>
                        ) : breed === b.name ? (
                          <span style={{ color: '#249b59', fontWeight: 700 }}>✓</span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Drawer 2: Age Picker with Live Eligibility Rule */}
            {modal === 'age' && (
              <div className="ptp-modal-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-head">
                    <button type="button" style={{ color: '#7e8e86', fontSize: 12.5 }} onClick={() => setModal(null)}>
                      取消
                    </button>
                    <span>选择宠物年龄</span>
                    <span style={{ width: 28 }} />
                  </div>
                  <div className="ptp-sheet-body" style={{ maxHeight: 190, marginBottom: 10 }}>
                    {AGE_OPTIONS.map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        className="ptp-breed-item"
                        style={{
                          justifyContent: 'center',
                          background: ageObj.label === opt.label ? '#eefaf3' : 'transparent',
                          borderRadius: 10,
                        }}
                        onClick={() => setAgeObj(opt)}
                      >
                        <strong
                          style={{
                            color: !opt.eligible
                              ? '#dc4741'
                              : ageObj.label === opt.label
                              ? '#1f8e51'
                              : '#34443c',
                          }}
                        >
                          {opt.label}
                        </strong>
                      </button>
                    ))}
                  </div>
                  <div className={`ptp-alert-box ${ageObj.eligible ? 'is-green' : 'is-red'}`}>
                    <strong>
                      {ageObj.eligible ? '● 年龄符合客舱与有氧舱要求' : '⚠ 不符合航空适航年龄要求'}
                    </strong>
                    {ageObj.note}
                  </div>
                  <button
                    type="button"
                    className="ptp-btn-green-lg"
                    style={{ marginTop: 10 }}
                    onClick={() => setModal(null)}
                  >
                    确认选择
                  </button>
                </div>
              </div>
            )}

            {/* Drawer 3: Saved Address Picker */}
            {(modal === 'addrSend' || modal === 'addrRecv') && (
              <div className="ptp-modal-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-head">
                    <button type="button" style={{ color: '#7e8e86', fontSize: 12.5 }} onClick={() => setModal(null)}>
                      取消
                    </button>
                    <span>{modal === 'addrSend' ? '选择发件地址' : '选择收宠地址'}</span>
                    <span style={{ width: 28 }} />
                  </div>
                  <div className="ptp-sheet-body">
                    {SAVED_ADDRESSES.map((a) => {
                      const active = (modal === 'addrSend' ? senderAddr.id : receiverAddr.id) === a.id;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          className={`ptp-addon-row${active ? ' is-active' : ''}`}
                          onClick={() => {
                            if (modal === 'addrSend') setSenderAddr(a);
                            else setReceiverAddr(a);
                            setModal(null);
                          }}
                        >
                          <span className={`ptp-check${active ? ' is-checked' : ''}`}>
                            {active ? '✓' : ''}
                          </span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12.5, fontWeight: 700 }}>
                              {a.name} {a.phone}{' '}
                              <span className="ptp-smart-badge" style={{ marginLeft: 4 }}>{a.tag}</span>
                            </div>
                            <div style={{ fontSize: 11, color: '#6b7b72', marginTop: 3 }}>{a.detail}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Pickup Time Slot Picker */}
            {modal === 'slot' && (
              <div className="ptp-modal-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-head">
                    <span>选择专车上门揽收时段</span>
                    <button type="button" onClick={() => setModal(null)}>关闭</button>
                  </div>
                  {PICKUP_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={`ptp-addon-row${pickupSlot === slot ? ' is-active' : ''}`}
                      onClick={() => {
                        setPickupSlot(slot);
                        setModal(null);
                        showToast('✓ 已选择上门揽收时段');
                      }}
                    >
                      <span className={`ptp-check${pickupSlot === slot ? ' is-checked' : ''}`}>
                        {pickupSlot === slot ? '✓' : ''}
                      </span>
                      <span style={{ fontSize: 12.5, fontWeight: 600 }}>{slot}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* OCR Certificate Preview */}
            {modal === 'ocr' && (
              <div className="ptp-modal-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-head">
                    <span>动物检疫合格证 · OCR 自动提取</span>
                    <button type="button" onClick={() => setModal(null)}>完成</button>
                  </div>
                  <div className="ptp-alert-box is-green" style={{ marginBottom: 10 }}>
                    <strong>✓ OCR 识别置信度 99.4% · 已自动核验有效期</strong>
                    无需手动输入 18 位检疫证编号，系统已与民航货运预审通道同步。
                  </div>
                  <div className="ptp-fee-row"><span>证书编号</span><strong>NO.31010420260519088</strong></div>
                  <div className="ptp-fee-row"><span>货主姓名</span><strong>{contactName || '阿童'}</strong></div>
                  <div className="ptp-fee-row"><span>动物种类</span><strong>犬类（{breed}）</strong></div>
                  <div className="ptp-fee-row"><span>有效期至</span><strong className="is-free">2026-05-23（有效）</strong></div>
                  <button
                    type="button"
                    className="ptp-btn-green-lg"
                    style={{ marginTop: 12 }}
                    onClick={() => {
                      setQuarantineOcr(true);
                      setModal(null);
                    }}
                  >
                    确认无误
                  </button>
                </div>
              </div>
            )}

            {/* Price Breakdown Sheet */}
            {modal === 'price' && (
              <div className="ptp-modal-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-head">
                    <span>价格明细</span>
                    <button type="button" onClick={() => setModal(null)}>关闭</button>
                  </div>
                  {selectedFlight.breakdown.map((b) => (
                    <div key={b.label} className="ptp-fee-row">
                      <span>{b.label}</span>
                      <strong className={b.highlight ? 'is-free' : ''}>{b.price}</strong>
                    </div>
                  ))}
                  {addonInsurance && (
                    <div className="ptp-fee-row"><span>宠运无忧综合险</span><strong>¥ 19</strong></div>
                  )}
                  {addonValuation && (
                    <div className="ptp-fee-row"><span>全额保价服务</span><strong>¥ 40</strong></div>
                  )}
                  <div className="ptp-fee-total">
                    <span>合计实付</span>
                    <span style={{ color: '#e45044', fontSize: 18 }}>¥ {totalPrice}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Full Vertical Timeline Sheet */}
            {modal === 'timeline' && (
              <div className="ptp-modal-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-head">
                    <span>全流程追踪</span>
                    <button type="button" onClick={() => setModal(null)}>关闭</button>
                  </div>
                  <div className="ptp-pet-mini-card" style={{ paddingTop: 0, borderTop: 'none' }}>
                    <div className="ptp-pet-mini-left">
                      <img src={PROTO_ASSETS.petAvatar} alt="小航" />
                      <div>
                        <strong style={{ fontSize: 13 }}>{petName || '小航'} · {breed}</strong>
                        <div style={{ fontSize: 10.5, color: '#7e8e86' }}>订单号：PT-20250519001</div>
                      </div>
                    </div>
                  </div>
                  <div className="ptp-sheet-body">
                    {FULL_TIMELINE_LOGS.filter((l) => l.minStage <= trackStageIdx).map((log, i) => (
                      <div
                        key={log.time}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '16px 1fr',
                          gap: 10,
                          paddingBottom: 14,
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <span
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: '50%',
                              marginTop: 4,
                              background: i === 0 ? '#2eb66b' : '#cbd7d0',
                            }}
                          />
                          <span style={{ flex: 1, width: 1.5, background: '#e5ece8', marginTop: 4 }} />
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: '#8a9991' }}>{log.time}</div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#16221c', margin: '2px 0' }}>
                            {log.title}
                          </div>
                          <div style={{ fontSize: 11.5, color: '#5f6f67', lineHeight: 1.55 }}>{log.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Peak-End Social Share Poster Overlay */}
            {modal === 'poster' && (
              <div className="ptp-modal-mask" onClick={() => setModal(null)}>
                <div className="ptp-poster-stage" onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-poster-card">
                    <div style={{ textAlign: 'center' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: 10,
                          fontWeight: 700,
                          padding: '2px 10px',
                          borderRadius: 999,
                          background: 'rgba(20, 92, 66, 0.35)',
                          marginBottom: 4,
                        }}
                      >
                        全程实时看得见
                      </span>
                      <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '0.04em' }}>
                        安心宠物托运 🐾
                      </div>
                    </div>

                    <div className="ptp-poster-white">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <img
                          src={PROTO_ASSETS.petAvatar}
                          alt="小航"
                          style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', border: '2px solid #65d295' }}
                        />
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 800 }}>
                            {petName || '小航'} 平安落地{toCity.name}！
                          </div>
                          <div style={{ fontSize: 11, color: '#249b59', fontWeight: 600 }}>
                            1760 公里 · 2 小时 40 分的奔赴
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr auto 1fr',
                          alignItems: 'center',
                          padding: '10px 0',
                          borderTop: '1px dashed #e5ece8',
                          borderBottom: '1px dashed #e5ece8',
                          marginBottom: 10,
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 18, fontWeight: 800 }}>18:40</div>
                          <div style={{ fontSize: 10.5, color: '#7a8a82' }}>虹桥机场</div>
                        </div>
                        <div style={{ color: '#2eb66b', fontSize: 16 }}>✈</div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 18, fontWeight: 800 }}>20:40</div>
                          <div style={{ fontSize: 10.5, color: '#7a8a82' }}>大兴机场</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10.5, color: '#8b9991' }}>
                        <div>
                          <div>@TiceeZz</div>
                          <div>2026/05/20 周三</div>
                        </div>
                        <span
                          style={{
                            padding: '4px 8px',
                            borderRadius: 6,
                            background: '#eefaf3',
                            color: '#1f8e51',
                            fontWeight: 700,
                          }}
                        >
                          航旅纵横 · 宠物上机
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ptp-sheet" style={{ paddingTop: 12 }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
                    分享至
                  </div>
                  <div className="ptp-share-grid">
                    {[
                      { name: '微信', bg: '#2dc100', ico: '💬' },
                      { name: '朋友圈', bg: '#3b82f6', ico: '◎' },
                      { name: 'QQ', bg: '#1e293b', ico: '🐧' },
                      { name: '保存图片', bg: '#64748b', ico: '↓' },
                    ].map((ch) => (
                      <button
                        key={ch.name}
                        type="button"
                        className="ptp-share-item"
                        onClick={() => {
                          showToast(`已生成「${petName || '小航'}平安落地」海报并触发${ch.name}`);
                          setModal(null);
                        }}
                      >
                        <span className="ptp-share-dot" style={{ background: ch.bg }}>
                          {ch.ico}
                        </span>
                        <span>{ch.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className={`ptp-home-indicator${screen === 'splash' ? ' is-light' : ''}`} />
          </div>
        </div>
      </div>

      {/* ════════════ RIGHT: UX STORYBOARD & DIRECTOR PANEL ════════════ */}
      <aside className="ptp-director">
        {/* Live Synced Design Insight Card */}
        <div className="ptp-dir-card">
          <div className="ptp-dir-kicker">
            <span className="ptp-dir-step">SCREEN {activeScene.step}</span>
            <span className="ptp-dir-tag">{activeScene.tag}</span>
          </div>
          <h2 className="ptp-dir-title">{activeScene.title}</h2>
          <p className="ptp-dir-insight">{activeScene.insight}</p>
          <div className="ptp-dir-tip">💡 {activeScene.tip}</div>

          {/* Contextual Interactive Demo Controls */}
          <div className="ptp-dir-actions">
            {screen === 'random' && (
              <>
                <button
                  type="button"
                  className={`ptp-dir-btn${randomState === 'empty' ? ' is-primary' : ''}`}
                  onClick={() => setRandomState('empty')}
                >
                  态 1：无票空态
                </button>
                <button
                  type="button"
                  className={`ptp-dir-btn${randomState === 'available' ? ' is-primary' : ''}`}
                  onClick={() => setRandomState('available')}
                >
                  态 2：名额充足
                </button>
                <button
                  type="button"
                  className={`ptp-dir-btn${randomState === 'full' ? ' is-primary' : ''}`}
                  onClick={() => setRandomState('full')}
                >
                  态 3：名额已满兜底
                </button>
              </>
            )}

            {screen === 'form' && (
              <>
                <button type="button" className="ptp-dir-btn is-primary" onClick={handleAutoFillForm}>
                  一键补全演示数据
                </button>
                <button
                  type="button"
                  className="ptp-dir-btn"
                  onClick={() => {
                    setBreedSearch('法斗');
                    setBreedAlert('法国斗牛犬 — 短鼻犬高空易呼吸困难，民航规定严格禁飞');
                    setModal('breed');
                  }}
                >
                  演示短鼻犬风控拦截
                </button>
                <button
                  type="button"
                  className="ptp-dir-btn"
                  onClick={() => {
                    setWeightKg(18.5);
                    setCrateOverride(null);
                    showToast('体重已调至 18.5kg，航空箱自动切换推荐 3号箱');
                  }}
                >
                  调重至 18.5kg 看荐箱联动
                </button>
              </>
            )}

            {screen === 'tracking' && (
              <>
                <button
                  type="button"
                  className={`ptp-dir-btn${trackStageIdx === 2 ? ' is-primary' : ''}`}
                  onClick={() => {
                    setModal(null);
                    setTrackStageIdx(2);
                  }}
                >
                  状态：高空飞行中
                </button>
                <button
                  type="button"
                  className={`ptp-dir-btn${trackStageIdx === 4 && modal !== 'poster' ? ' is-primary' : ''}`}
                  onClick={() => {
                    setModal(null);
                    setTrackStageIdx(4);
                  }}
                >
                  模拟平安落地
                </button>
                <button
                  type="button"
                  className="ptp-dir-btn"
                  onClick={() => {
                    setTrackStageIdx(4);
                    setModal('poster');
                  }}
                >
                  弹出接机纪念海报
                </button>
              </>
            )}

            {screen !== 'form' && screen !== 'random' && screen !== 'tracking' && (
              <button
                type="button"
                className="ptp-dir-btn is-primary"
                onClick={() => {
                  const idx = SCENES.findIndex((s) => s.id === activeSceneId);
                  const next = SCENES[(idx + 1) % SCENES.length];
                  navigate(next.id);
                }}
              >
                下一步演示 →
              </button>
            )}

            <button type="button" className="ptp-dir-btn" onClick={handleResetDemo}>
              重置演示
            </button>
          </div>
        </div>

        {/* 10-Screen Quick-Jump Storyboard */}
        <div className="ptp-dir-card">
          <div className="ptp-storyboard-head">
            <span>QUICK JUMP · 10 CORE SCREENS</span>
            <span>点击直达关键体验节点</span>
          </div>
          <div className="ptp-scene-grid">
            {SCENES.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`ptp-scene-btn${activeSceneId === s.id ? ' is-active' : ''}`}
                onClick={() => navigate(s.id)}
              >
                <em>{s.step}</em>
                <strong>{s.short}</strong>
              </button>
            ))}
          </div>
        </div>

        <p className="ptp-dir-footnote">
          该交互原型基于 Figma 原始设计稿 1:1 视觉与逻辑还原，结合前端代码完整实现了「随机飞三态兜底」「宽体机筛选」「品种/年龄/地址三大防错弹窗」「体重联动智能荐箱」「OCR 识别反馈」「航线动态追踪」与「峰终定律接机海报」等核心交互。切换上方「完整提案」可阅览 22 页调研与设计推导全案。
        </p>
      </aside>
    </div>
  );
}
