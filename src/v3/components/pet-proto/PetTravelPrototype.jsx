import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  HYBRID_ASSETS,
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
} from './petHybridData';
import './petTravelProto.css';

/* Minimal clean inline SVG chevrons & icons where real UI needs crisp vector strokes */
const BackSvg = ({ color = '#1c2c24' }) => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M12.5 4.5L7 10L12.5 15.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RightSvg = ({ color = '#9aa8a0' }) => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path d="M6 3.5L10.5 8L6 12.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ClockSvg = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="6" stroke="#8b9a92" strokeWidth="1.3" />
    <path d="M8 4.8V8.2L10.2 9.5" stroke="#8b9a92" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const SearchIconSvg = () => (
  <svg width="14" height="14" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="5.5" stroke="#9aa8a0" strokeWidth="1.5" />
    <path d="M12.2 12.2L15.8 15.8" stroke="#9aa8a0" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CopySvg = () => (
  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, verticalAlign: 'middle' }}>
    <rect x="5" y="5" width="8.5" height="9" rx="1.5" stroke="#9aa8a0" strokeWidth="1.4" />
    <path d="M10.5 5V3.5A1.5 1.5 0 0 0 9 2H3.5A1.5 1.5 0 0 0 2 3.5V9.5A1.5 1.5 0 0 0 3.5 11H5" stroke="#9aa8a0" strokeWidth="1.4" />
  </svg>
);

const CheckMiniSvg = ({ color = '#ffffff', size = 10, strokeWidth = 1.9 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0, display: 'block' }}>
    <path d="M2.2 6.2L4.8 8.8L9.8 3.4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlusMiniSvg = ({ color = 'currentColor', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, display: 'block' }}>
    <path d="M8 3.2V12.8M3.2 8H12.8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CloseCircleSvg = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ display: 'block' }}>
    <circle cx="7" cy="7" r="7" fill="#7c878d" />
    <path d="M4.6 4.6L9.4 9.4M9.4 4.6L4.6 9.4" stroke="#ffffff" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const WarnTriSvg = ({ size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0, display: 'block' }}>
    <path d="M7 1.8L12.6 11.8H1.4L7 1.8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M7 5.3V8.2M7 10.1V10.4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

const AlertCircleSvg = ({ bg = '#e34f47', type = 'bang' }) => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, display: 'block', marginTop: 1 }}>
    <circle cx="8" cy="8" r="7.5" fill={bg} />
    {type === 'bang' ? (
      <>
        <path d="M8 4.4V8.9" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="8" cy="11.5" r="0.95" fill="#ffffff" />
      </>
    ) : (
      <>
        <circle cx="8" cy="4.8" r="0.95" fill="#ffffff" />
        <path d="M8 7.2V11.6" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
      </>
    )}
  </svg>
);

const DownTriSvg = ({ color = 'currentColor', size = 8 }) => (
  <svg width={size} height={Math.round(size * 0.65)} viewBox="0 0 10 6.5" fill="none" aria-hidden="true" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M1 1.2L5 5.4L9 1.2H1Z" fill={color} />
  </svg>
);

const StageNodeSvg = ({ state }) => {
  if (state === 'done') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ display: 'block' }}>
        <circle cx="9" cy="9" r="7.2" fill="#33b96d" />
        <path d="M5.7 9.2L7.9 11.4L12.4 6.7" stroke="#ffffff" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (state === 'now') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ display: 'block' }}>
        <circle cx="9" cy="9" r="8.8" fill="rgba(46, 182, 107, 0.16)" />
        <circle cx="9" cy="9" r="6.3" fill="#ffffff" stroke="#2eb66b" strokeWidth="1.8" />
        <circle cx="9" cy="9" r="3.0" fill="#2eb66b" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ display: 'block' }}>
      <circle cx="9" cy="9" r="6.6" fill="#ffffff" stroke="#cfd8d4" strokeWidth="1.5" />
    </svg>
  );
};

const CameraSvg = () => (
  <svg width="22" height="20" viewBox="0 0 24 22" fill="none" style={{ flexShrink: 0 }}>
    <rect x="2.2" y="5.5" width="19.6" height="13.5" rx="3.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 5.5L9.4 3.4C9.7 3 10.1 2.8 10.6 2.8H13.4C13.9 2.8 14.3 3 14.6 3.4L16 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="9.6" cy="11.2" r="1.15" fill="currentColor" />
    <circle cx="14.4" cy="11.2" r="1.15" fill="currentColor" />
    <path d="M9.6 14.1C10.5 15.1 13.5 15.1 14.4 14.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const RandomPlaneSvg = ({ muted = false }) => (
  <svg width="28" height="20" viewBox="0 0 36 24" fill="none" style={{ flexShrink: 0 }}>
    {/* 1:1 Figma takeoff plane silhouette: tilted fuselage + swept-back wing + diagonal tail cutout */}
    <path
      d="M5.4 12.1L9.2 14.9L6.4 16.1L3.3 13.4C2.9 13 3.1 12.2 3.7 12C4.3 11.8 4.9 11.8 5.4 12.1Z"
      fill={muted ? '#a6dec1' : '#3db885'}
    />
    <path
      d="M7.6 17.4L11.2 16.0L16.3 14.1L10.3 6.2C9.8 5.5 10.3 4.5 11.2 4.6L13.1 4.9C13.6 5 14.1 5.3 14.5 5.7L22.3 12.0L29.1 9.6C31.1 8.9 33.1 9.5 33.6 11.0C34.1 12.5 32.8 14.1 30.8 14.8L13.2 20.6C11.1 21.3 8.9 20.4 7.8 18.6L7.4 17.9C7.3 17.7 7.4 17.5 7.6 17.4Z"
      fill={muted ? '#a6dec1' : '#3db885'}
    />
  </svg>
);

const PawSearchSvg = () => (
  <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <path d="M10.5 15.8H4.8A2.3 2.3 0 0 1 2.5 13.5V4.8A2.3 2.3 0 0 1 4.8 2.5H13.5A2.3 2.3 0 0 1 15.8 4.8V9.2" stroke="#45554d" strokeWidth="1.35" strokeLinecap="round" />
    <circle cx="6.8" cy="7.2" r="1" fill="#45554d" />
    <circle cx="9.2" cy="6.4" r="1" fill="#45554d" />
    <circle cx="11.5" cy="7.3" r="1" fill="#45554d" />
    <path d="M7.4 10.6C7.4 9.5 8.3 8.8 9.2 8.8C10.1 8.8 11 9.5 11 10.6C11 11.4 10.2 11.9 9.2 11.9C8.2 11.9 7.4 11.4 7.4 10.6Z" fill="#45554d" />
    <circle cx="13.8" cy="13.6" r="2.7" stroke="#45554d" strokeWidth="1.35" fill="#fff" />
    <path d="M15.8 15.6L17.8 17.6" stroke="#45554d" strokeWidth="1.45" strokeLinecap="round" />
  </svg>
);

const MiniTimelinePlaneSvg = () => (
  <svg width="15" height="11" viewBox="0 0 24 16" fill="none" style={{ flexShrink: 0 }}>
    <path d="M2.6 9.8L6.2 10.4L10.6 9.2L7.4 3.4L9.2 3.6L14.4 8.2L19.4 7.0C20.7 6.7 21.8 7.2 22.0 8.1C22.2 9.0 21.3 9.9 20.0 10.2L7.8 13.2C6.4 13.5 5.0 12.9 4.2 11.8L2.6 9.8Z" fill="#b8c3bd" />
  </svg>
);

const BulbRaysSvg = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <path d="M10 4.5A3.8 3.8 0 0 0 7.4 11.1C8 11.7 8.3 12.3 8.4 13.1H11.6C11.7 12.3 12 11.7 12.6 11.1A3.8 3.8 0 0 0 10 4.5Z" stroke="#24342c" strokeWidth="1.35" strokeLinejoin="round" />
    <path d="M8.5 15.3H11.5M10 1.8V2.9M10 17.3V17.8M3.3 8.2H4.5M15.5 8.2H16.7M5.2 3.8L6.1 4.6M14.8 3.8L13.9 4.6" stroke="#24342c" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const ShieldCheckMiniSvg = () => (
  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path d="M8 1.8L13.2 3.8V7.8C13.2 11.1 10.9 13.4 8 14.5C5.1 13.4 2.8 11.1 2.8 7.8V3.8L8 1.8Z" fill="#704a1e" fillOpacity="0.88" />
    <path d="M5.8 8.0L7.3 9.5L10.4 6.4" stroke="#f7d59c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SoloNoticeWatermarkSvg = () => (
  <svg className="ptp-notice-wm" width="76" height="76" viewBox="0 0 88 88" fill="none" aria-hidden="true">
    <rect x="24" y="12" width="48" height="64" rx="9" fill="#d8dcda" fillOpacity="0.42" />
    <rect x="37" y="8" width="22" height="9" rx="4.5" fill="#cfd4d1" fillOpacity="0.55" />
    <path d="M40 34L46.5 40.5L59 27.5" stroke="#eef0ef" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="36" y="48" width="24" height="4" rx="2" fill="#eef0ef" />
    <rect x="36" y="57" width="18" height="4" rx="2" fill="#eef0ef" />
    <g fill="#cfd4d1" fillOpacity="0.62">
      <circle cx="15" cy="48" r="4.2" />
      <circle cx="24" cy="43" r="4.2" />
      <circle cx="33" cy="47" r="4.2" />
      <circle cx="38" cy="56" r="3.8" />
      <path d="M16.5 60C16.5 54.5 21.5 51.5 26 51.5C30.5 51.5 34.5 55 34.5 60C34.5 64 31.2 66.5 25.5 66.5C19.8 66.5 16.5 64 16.5 60Z" />
    </g>
  </svg>
);

const StatusBar = ({ light = false, bg }) => (
  <div className="ptp-statusbar" style={bg ? { background: bg } : undefined} aria-hidden="true">
    <img src={light ? HYBRID_ASSETS.iosBarLight : HYBRID_ASSETS.iosBarDark} alt="" />
  </div>
);

export default function PetTravelPrototype() {
  const [screen, setScreen] = useState('splash');
  const [navDir, setNavDir] = useState('push');
  const [history, setHistory] = useState([]);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const pulseTimer = useRef(null);
  const chassisRef = useRef(null);
  const mobileStripRef = useRef(null);
  const formScrollRef = useRef(null);
  const [phoneScale, setPhoneScale] = useState(1);
  const [swapCount, setSwapCount] = useState(0);
  const [pulseField, setPulseField] = useState(null);
  const [sheetDragY, setSheetDragY] = useState(0);
  const [isSheetDragging, setIsSheetDragging] = useState(false);
  const sheetDragStart = useRef({ y: 0, active: false });

  // Random Flight 3-state machine
  const [randomState, setRandomState] = useState('available'); // 'empty' | 'available' | 'full'

  // Solo Search & Flights
  const [tripType, setTripType] = useState('oneway');
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(1);
  const [dateStr, setDateStr] = useState('5月20日 明天');
  const [weightKey, setWeightKey] = useState('w15');
  const [flightFilter, setFlightFilter] = useState('all'); // 'all' | 'wide' | 'mu' | 'ca'
  const [selectedFlightId, setSelectedFlightId] = useState('MU5101');

  // Real Interactive Order Form
  const [breed, setBreed] = useState('柯基犬');
  const [breedTouched, setBreedTouched] = useState(false);
  const [petName, setPetName] = useState('小航');
  const [gender, setGender] = useState('雄性');
  const [neutered, setNeutered] = useState('已绝育');
  const [weightKg, setWeightKg] = useState(9.2);
  const [ageObj, setAgeObj] = useState(AGE_OPTIONS[2]); // 2岁 6个月
  const [senderAddr, setSenderAddr] = useState(SAVED_ADDRESSES[0]);
  const [receiverAddr, setReceiverAddr] = useState(SAVED_ADDRESSES[1]);
  const [pickupSlot, setPickupSlot] = useState('');
  const [contactName, setContactName] = useState('阿童');
  const [contactPhone, setContactPhone] = useState('19974677449');
  const [crateOverride, setCrateOverride] = useState(null);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [vaccineUploaded, setVaccineUploaded] = useState(false);
  const [addonInsurance, setAddonInsurance] = useState(true);
  const [addonValuation, setAddonValuation] = useState(false);
  const [orderNote, setOrderNote] = useState('');
  const [agreed, setAgreed] = useState(true);

  // Tracking & Modals & Orders & Scroll Chrome
  const [trackStageIdx, setTrackStageIdx] = useState(2); // 0..4
  const [modal, setModal] = useState(null);
  const [draftWeightKg, setDraftWeightKg] = useState(9.2);
  const [draftAgeObj, setDraftAgeObj] = useState(AGE_OPTIONS[2]);
  const [breedTab, setBreedTab] = useState('dog');
  const [breedSearch, setBreedSearch] = useState('');
  const [breedAlert, setBreedAlert] = useState(null);
  const [orderTab, setOrderTab] = useState('全部');
  const [onlyValidOrders, setOnlyValidOrders] = useState(false);
  const [detailScrolled, setDetailScrolled] = useState(false);
  const [formScrolled, setFormScrolled] = useState(false);
  const [mapSatellite, setMapSatellite] = useState(false);
  const [showWeatherCard, setShowWeatherCard] = useState(false);

  const showToast = useCallback((msg) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    if (pulseTimer.current) clearTimeout(pulseTimer.current);
  }, []);

  useEffect(() => {
    setSheetDragY(0);
    setIsSheetDragging(false);
    sheetDragStart.current = { y: 0, active: false };
  }, [modal]);

  const navigate = useCallback((next, dirOverride) => {
    if (next === 'poster') {
      setNavDir('push');
      setTrackStageIdx(4);
      setScreen('tracking');
      setModal('poster');
      return;
    }
    const curIdx = SCENES.findIndex((s) => s.id === screen);
    const nxtIdx = SCENES.findIndex((s) => s.id === next);
    const inferredDir = dirOverride || (curIdx >= 0 && nxtIdx >= 0 && nxtIdx < curIdx ? 'pop' : 'push');
    setNavDir(inferredDir);
    setModal(null);
    setDetailScrolled(false);
    setFormScrolled(false);
    setHistory((prev) => [...prev.slice(-8), screen]);
    setScreen(next);
  }, [screen]);

  const goBack = useCallback(() => {
    setNavDir('pop');
    setModal(null);
    setHistory((prev) => {
      if (!prev.length) { setScreen('hub'); return []; }
      const last = prev[prev.length - 1];
      setScreen(last);
      return prev.slice(0, -1);
    });
  }, []);

  const fromCity = CITIES[fromIdx];
  const toCity = CITIES[toIdx];
  const dateDayLabel = dateStr.split(' ')[0];
  const dateWeekday = dateStr.includes('21') ? '周四' : '周三';
  const selectedWeightLabel = WEIGHT_OPTIONS.find((w) => w.id === weightKey)?.label || '≤ 15kg';
  const dynamicPickupSlots = useMemo(
    () => PICKUP_SLOTS.map((s) => s.replace('5月20日', dateDayLabel)),
    [dateDayLabel]
  );
  const breedCategoryLabel = useMemo(() => {
    if (BREED_GROUPS.cat.some((b) => b.name === breed)) return '猫类';
    if (BREED_GROUPS.other.some((b) => b.name === breed)) return '其他宠物';
    return '犬类';
  }, [breed]);
  const selectedFlight = useMemo(() => FLIGHTS.find((f) => f.id === selectedFlightId) || FLIGHTS[0], [selectedFlightId]);

  const filteredFlights = useMemo(() => {
    if (flightFilter === 'wide') return FLIGHTS.filter((f) => f.isWidebody);
    if (flightFilter === 'mu') return FLIGHTS.filter((f) => f.airlineKey === 'mu');
    if (flightFilter === 'ca') return FLIGHTS.filter((f) => f.airlineKey === 'ca');
    return FLIGHTS;
  }, [flightFilter]);

  const recommendedCrate = useMemo(() => (weightKg <= 6 ? 1 : weightKg <= 15 ? 2 : 3), [weightKg]);
  const activeCrate = crateOverride || recommendedCrate;

  const formMissing = useMemo(() => {
    const m = [];
    if (!petName.trim()) m.push({ key: 'petName', label: '宠物昵称' });
    if (!ageObj.eligible) m.push({ key: 'age', label: '适航年龄' });
    if (!pickupSlot) m.push({ key: 'pickupSlot', label: '上门揽收时间' });
    if (!contactName.trim() || contactPhone.trim().length < 7) m.push({ key: 'contact', label: '提宠联系人' });
    if (!photoUploaded) m.push({ key: 'photo', label: '宠物与箱合照' });
    if (!agreed) m.push({ key: 'agreed', label: '活体免责声明' });
    return m;
  }, [petName, ageObj, pickupSlot, contactName, contactPhone, photoUploaded, agreed]);

  const focusMissingField = useCallback((item, customToast) => {
    if (!item) return;
    const scroller = formScrollRef.current;
    if (scroller) {
      const target = scroller.querySelector(`[data-form-field="${item.key}"]`);
      if (target) {
        const sRect = scroller.getBoundingClientRect();
        const tRect = target.getBoundingClientRect();
        const targetTop = Math.max(0, scroller.scrollTop + (tRect.top - sRect.top) - sRect.height * 0.36);
        scroller.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    }
    setPulseField(item.key);
    if (pulseTimer.current) clearTimeout(pulseTimer.current);
    pulseTimer.current = setTimeout(() => setPulseField(null), 1150);
    showToast(customToast || `请先完善：${item.label}`);
  }, [showToast]);

  const onSheetTouchStart = useCallback((e) => {
    if (!e.touches?.length) return;
    const sheetBody = e.currentTarget.querySelector('.ptp-sheet-body');
    const insideBody = sheetBody && sheetBody.contains(e.target);
    if (insideBody && sheetBody.scrollTop > 2) {
      sheetDragStart.current = { y: 0, active: false };
      return;
    }
    sheetDragStart.current = { y: e.touches[0].clientY, active: true };
    setIsSheetDragging(true);
  }, []);

  const onSheetTouchMove = useCallback((e) => {
    if (!sheetDragStart.current.active || !e.touches?.length) return;
    const dy = e.touches[0].clientY - sheetDragStart.current.y;
    if (dy > 0) {
      const damped = dy <= 120 ? dy : 120 + (dy - 120) * 0.45;
      setSheetDragY(Math.min(260, damped));
    } else {
      setSheetDragY(0);
    }
  }, []);

  const onSheetTouchEnd = useCallback(() => {
    if (!sheetDragStart.current.active) return;
    sheetDragStart.current.active = false;
    setIsSheetDragging(false);
    setSheetDragY((curr) => {
      if (curr > 72) {
        setModal(null);
      }
      return 0;
    });
  }, []);

  const sheetSwipeHandlers = {
    onTouchStart: onSheetTouchStart,
    onTouchMove: onSheetTouchMove,
    onTouchEnd: onSheetTouchEnd,
    onTouchCancel: onSheetTouchEnd,
  };

  const sheetSwipeStyle = sheetDragY > 0
    ? { transform: `translateY(${sheetDragY}px)`, transition: isSheetDragging ? 'none' : 'transform 0.24s cubic-bezier(0.22, 1, 0.36, 1)' }
    : isSheetDragging
      ? { transition: 'none' }
      : undefined;

  const totalPrice = selectedFlight.price + (addonInsurance ? 19 : 0) + (addonValuation ? 40 : 0);

  const activeSceneId = modal === 'poster' ? 'poster' : screen === 'orders' ? 'success' : screen;
  const activeSceneIdx = useMemo(() => Math.max(0, SCENES.findIndex((s) => s.id === activeSceneId)), [activeSceneId]);
  const activeScene = SCENES[activeSceneIdx] || SCENES[0];
  const trackStage = TRACKING_STAGES[trackStageIdx];

  const sceneMood = useMemo(() => {
    if (activeSceneId === 'splash') return 'sky';
    if (activeSceneId === 'poster') return 'poster';
    if (activeSceneId === 'tracking') return 'map';
    if (activeSceneId === 'flights' || activeSceneId === 'detail' || activeSceneId === 'form') return 'emerald';
    if (activeSceneId === 'success') return 'clean';
    return 'mint';
  }, [activeSceneId]);

  const journeyPhases = useMemo(() => [
    { key: 'p1', label: '01 · 入口分流', ids: ['splash', 'hub'] },
    { key: 'p2', label: '02 · 查订决策', ids: ['random', 'soloSearch', 'flights', 'detail'] },
    { key: 'p3', label: '03 · 填单防错', ids: ['form', 'success'] },
    { key: 'p4', label: '04 · 履约追踪', ids: ['tracking', 'poster'] },
  ], []);

  const stepScene = useCallback((delta) => {
    const nextIdx = (activeSceneIdx + delta + SCENES.length) % SCENES.length;
    navigate(SCENES[nextIdx].id, delta < 0 ? 'pop' : 'push');
  }, [activeSceneIdx, navigate]);

  useEffect(() => {
    const el = chassisRef.current;
    if (!el) return undefined;
    const updateScale = () => {
      const style = window.getComputedStyle(el);
      const padX = (parseFloat(style.paddingLeft) || 0) + (parseFloat(style.paddingRight) || 0);
      const availW = Math.max(240, el.clientWidth - padX);
      const next = availW >= 360 ? 1 : Number((availW / 360).toFixed(4));
      setPhoneScale(next);
    };
    updateScale();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateScale);
      return () => window.removeEventListener('resize', updateScale);
    }
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const strip = mobileStripRef.current;
    if (!strip) return;
    const activeEl = strip.querySelector('.is-active');
    if (activeEl && strip.scrollWidth > strip.clientWidth) {
      const targetLeft = activeEl.offsetLeft - (strip.clientWidth - activeEl.clientWidth) / 2;
      strip.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
    }
  }, [activeSceneId]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && modal) {
        e.preventDefault();
        setModal(null);
        return;
      }
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        stepScene(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        stepScene(-1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [stepScene, modal]);

  const visibleBreeds = useMemo(() => {
    const q = breedSearch.trim();
    const pool = q ? [...BREED_GROUPS.dog, ...BREED_GROUPS.cat, ...BREED_GROUPS.other] : BREED_GROUPS[breedTab] || [];
    return q
      ? pool.filter((b) => b.name.includes(q) || b.sub.includes(q) || (b.aliases && b.aliases.some((a) => a.includes(q))))
      : pool;
  }, [breedTab, breedSearch]);

  const handleAutoFill = () => {
    setPetName('小航');
    setBreed('柯基犬');
    setAgeObj(AGE_OPTIONS[2]);
    setPickupSlot(dynamicPickupSlots[1]);
    setPhotoUploaded(true);
    setVaccineUploaded(true);
    setContactName('阿童');
    setContactPhone('19974677449');
    setAgreed(true);
    showToast('已补全全部必填项，提交订单按钮已解锁');
  };

  const handleReset = () => {
    setScreen('splash');
    setHistory([]);
    setModal(null);
    setRandomState('available');
    setTripType('oneway');
    setFromIdx(0);
    setToIdx(1);
    setDateStr('5月20日 明天');
    setWeightKey('w15');
    setFlightFilter('all');
    setSelectedFlightId('MU5101');
    setBreed('柯基犬');
    setBreedTouched(false);
    setPetName('小航');
    setGender('雄性');
    setNeutered('已绝育');
    setWeightKg(9.2);
    setAgeObj(AGE_OPTIONS[2]);
    setSenderAddr(SAVED_ADDRESSES[0]);
    setReceiverAddr(SAVED_ADDRESSES[1]);
    setPickupSlot('');
    setContactName('阿童');
    setContactPhone('19974677449');
    setCrateOverride(null);
    setPhotoUploaded(false);
    setVaccineUploaded(false);
    setAddonInsurance(true);
    setAddonValuation(false);
    setOrderNote('');
    setAgreed(true);
    setTrackStageIdx(2);
    setBreedTab('dog');
    setBreedSearch('');
    setBreedAlert(null);
    setOrderTab('全部');
    setOnlyValidOrders(false);
    setDetailScrolled(false);
    setFormScrolled(false);
    setMapSatellite(false);
    setShowWeatherCard(false);
    showToast('已重置交互原型');
  };

  return (
    <div className="ptp-studio" role="region" data-scene-mood={sceneMood} aria-label="航旅纵横宠物出行 1:1 交互原型演示台">
      <div className="ptp-studio-ambient" aria-hidden="true" />

      {/* ── Top Studio Control Bar ── */}
      <div className="ptp-studio-bar">
        <div className="ptp-studio-brand">
          <span className="ptp-live-dot" aria-hidden="true" />
          <span className="ptp-studio-label">INTERACTIVE PROTOTYPE</span>
          <span className="ptp-studio-pill">UMETRIP · PET TRAVEL</span>
          <span className="ptp-studio-mobile-step">
            <strong>{String(activeSceneIdx + 1).padStart(2, '0')}</strong> / {String(SCENES.length).padStart(2, '0')} · {activeScene.short}
          </span>
        </div>

        <div className="ptp-studio-progress" aria-label={`当前第 ${activeSceneIdx + 1} 屏，共 ${SCENES.length} 屏`}>
          <span className="ptp-studio-count">
            <strong>{String(activeSceneIdx + 1).padStart(2, '0')}</strong> / {String(SCENES.length).padStart(2, '0')}
          </span>
          <div className="ptp-studio-rail">
            <div className="ptp-studio-rail-fill" style={{ width: `${((activeSceneIdx + 1) / SCENES.length) * 100}%` }} />
          </div>
        </div>

        <div className="ptp-studio-nav">
          <button type="button" className="ptp-studio-icon-btn" onClick={() => stepScene(-1)} title="上一屏 (←)" aria-label="上一屏">
            ←
          </button>
          <button type="button" className="ptp-studio-icon-btn" onClick={() => stepScene(1)} title="下一屏 (→)" aria-label="下一屏">
            →
          </button>
          <button type="button" className="ptp-studio-reset-btn" onClick={handleReset}>
            <span className="ptp-desktop-only">重置演示</span>
            <span className="ptp-mobile-only">重置</span>
          </button>
        </div>
      </div>

      {/* ── Mobile & Tablet Quick Horizontal Scene Switcher ── */}
      <div ref={mobileStripRef} className="ptp-mobile-strip" role="tablist" aria-label="快捷切换原型页面">
        {SCENES.map((s) => {
          const isActive = activeSceneId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`ptp-mobile-chip${isActive ? ' is-active' : ''}`}
              onClick={() => navigate(s.id)}
            >
              <em>{s.step}</em>
              <span>{s.short}</span>
            </button>
          );
        })}
      </div>

      <div className="ptp-stage">
        {/* ════════════ LEFT: 1:1 HYBRID REAL-INTERACTION IPHONE ════════════ */}
        <div className="ptp-phone-col">
          <div className="ptp-phone-aura" aria-hidden="true" />
          <div ref={chassisRef} className="ptp-chassis" role="region" aria-label="航旅纵横宠物出行可交互原型">
            {/* Realistic machined titanium side hardware keys */}
            <span className="ptp-hw-btn ptp-hw-action" aria-hidden="true" />
            <span className="ptp-hw-btn ptp-hw-vol-up" aria-hidden="true" />
            <span className="ptp-hw-btn ptp-hw-vol-dn" aria-hidden="true" />
            <span className="ptp-hw-btn ptp-hw-power" aria-hidden="true" />
            <div className="ptp-screen-viewport" style={{ '--ptp-scale': phoneScale }}>
            <div className="ptp-screen" data-nav-dir={navDir}>
            {toast && <div className="ptp-toast">{toast}</div>}

            {/* ══ 00: 1:1 UNTOUCHED FIGMA SPLASH ══ */}
            {screen === 'splash' && (
              <div
                key="splash"
                className="ptp-splash-full"
                onClick={() => navigate('hub')}
                role="button"
                tabIndex={0}
                aria-label="点击进入宠物出行"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('hub'); }}
              >
                <img src={HYBRID_ASSETS.splash} alt="宠物上机 机长云吞正在待命 航旅纵横" />
              </div>
            )}

            {/* ══ 01: SERVICE HUB (Uncut 1:1 Figma Header + Real Scroll & Buttons) ══ */}
            {screen === 'hub' && (
              <div key="hub" className="ptp-view" style={{ background: '#f2f5f4' }}>
                <div className="ptp-scroll">
                  <div className="ptp-figma-hdr">
                    <img src={HYBRID_ASSETS.hubHeader} alt="宠物出行" />
                    <button
                      type="button"
                      className="ptp-hdr-back"
                      style={{ top: '34%', height: '30%' }}
                      aria-label="返回开屏"
                      onClick={() => navigate('splash')}
                    />
                  </div>

                  <div className="ptp-hub-body">
                    <div className="ptp-svc-card">
                      <img src={HYBRID_ASSETS.cardSolo} alt="宠物单独飞" />
                      <div className="ptp-svc-info">
                        <div>
                          <h4>宠物单独飞</h4>
                          <div className="ptp-green-tags">
                            <span>服务多样</span>
                            <span>经济实惠</span>
                            <span>实时追踪</span>
                          </div>
                          <p className="ptp-svc-desc">宠物独立乘坐航班，无需主人同行，专业团队全程照护</p>
                        </div>
                        <div className="ptp-svc-foot">
                          <span className="ptp-cutoff"><ClockSvg /> 起飞前60分钟停办</span>
                          <button type="button" className="ptp-btn-green" onClick={() => navigate('soloSearch')}>
                            立即办理
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="ptp-svc-card">
                      <img src={HYBRID_ASSETS.cardCabin} alt="宠物随机飞" />
                      <div className="ptp-svc-info">
                        <div>
                          <h4>宠物随机飞</h4>
                          <div className="ptp-green-tags">
                            <span>同机抵达</span>
                            <span>主人同行</span>
                            <span>陪同办理</span>
                          </div>
                          <p className="ptp-svc-desc">全程贴身相伴，专属座下空间，飞行不再分离</p>
                        </div>
                        <div className="ptp-svc-foot">
                          <span className="ptp-cutoff"><ClockSvg /> 起飞前60分钟停办</span>
                          <button type="button" className="ptp-btn-green" onClick={() => navigate('random')}>
                            立即办理
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="ptp-rules-card">
                      <div className="ptp-rules-hd">
                        <span className="ptp-dots-deco" aria-hidden="true" />
                        服务说明
                        <span className="ptp-dots-deco" aria-hidden="true" />
                      </div>
                      <h5>1、办理说明</h5>
                      <p>宠物上机服务由航旅纵横联合执飞航司共同提供，仅支持猫、犬等小型伴侣动物，需提前完成申报，审核通过后方可携宠登机。</p>
                      <h5>2、注意事项</h5>
                      <p>1）乘机前12小时禁食，4小时禁水，防止宠物晕机</p>
                      <p>2）请确保宠物已注射所有必要疫苗，并携带相关证件原件</p>
                      <p>3）宠物到达目的地前须系挂识别标签（含主人手机号）</p>
                      <p>4）每位乘客每次最多携带1只宠物，总重含箱不超过5kg</p>
                    </div>
                  </div>
                </div>

                <button type="button" className="ptp-side-orders" onClick={() => navigate('orders')}>
                  我的订单
                </button>
                <div className="ptp-home-bar" />
              </div>
            )}

            {/* ══ 02B: RANDOM FLIGHT (Uncut 1:1 Figma Header + Real 3-State Machine) ══ */}
            {screen === 'random' && (
              <div key="random" className="ptp-view" style={{ background: '#f4f6f5' }}>
                <div className="ptp-scroll">
                  <div className="ptp-figma-hdr">
                    <img src={HYBRID_ASSETS.randomHeader} alt="宠物随机飞" />
                    <button
                      type="button"
                      className="ptp-hdr-back"
                      style={{ top: '24%', height: '18%' }}
                      aria-label="返回"
                      onClick={goBack}
                    />
                  </div>

                  <div className="ptp-quick-bar">
                    <button
                      type="button"
                      onClick={() => {
                        const next = randomState === 'empty' ? 'available' : randomState === 'available' ? 'full' : 'empty';
                        setRandomState(next);
                        showToast(next === 'empty' ? '已切换：无票空态' : next === 'available' ? '已切换：有氧舱名额充足' : '已切换：名额已满兜底态');
                      }}
                    >
                      <PawSearchSvg />
                      <span>库存查询</span>
                    </button>
                    <button type="button" onClick={() => navigate('orders')}>
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                        <rect x="2.5" y="2.5" width="10.5" height="12.5" rx="2" stroke="#45554d" strokeWidth="1.35" />
                        <path d="M5.2 6.2H10.2M5.2 9.2H8.4" stroke="#45554d" strokeWidth="1.25" strokeLinecap="round" />
                        <circle cx="13.2" cy="12.8" r="3" fill="#fff" stroke="#45554d" strokeWidth="1.25" />
                        <path d="M13.2 11.4V12.9L14.2 13.5" stroke="#45554d" strokeWidth="1.1" strokeLinecap="round" />
                      </svg>
                      <span>历史订单</span>
                    </button>
                  </div>

                  {randomState === 'empty' ? (
                    <div className="ptp-random-empty">
                      <img
                        src={HYBRID_ASSETS.randomEmptyDog}
                        alt="暂无行程"
                        style={{ width: 146, height: 122, objectFit: 'contain', margin: '0 auto 12px', display: 'block', mixBlendMode: 'multiply' }}
                      />
                      <p style={{ fontSize: 12, color: '#9aa5a0', margin: '0 0 24px', lineHeight: 1.65 }}>
                        宠物随机飞，需要预订相应航班
                        <br />
                        机票后进行预约
                      </p>
                      <button
                        type="button"
                        className="ptp-btn-green-full"
                        style={{ height: 45, fontSize: 14.5 }}
                        onClick={() => {
                          setRandomState('available');
                          showToast('已模拟预订并自动关联东方航空 MU5101 行程');
                        }}
                      >
                        去预订国内机票
                      </button>
                      <button
                        type="button"
                        style={{ marginTop: 18, fontSize: 12.5, fontWeight: 600, color: '#2eb56b' }}
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
                      <div className="ptp-random-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#6b7972', paddingBottom: 11, borderBottom: '1px solid #eef1f3', marginBottom: 14 }}>
                          <strong style={{ color: '#1b2922', fontSize: 12.5 }}>5月20日 明天</strong>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                            <img src={HYBRID_ASSETS.muLogo} alt="东航" style={{ width: 15, height: 14, objectFit: 'contain' }} />
                            东方航空 MU5101
                          </span>
                        </div>
                        <div className="ptp-times" style={{ marginBottom: 14 }}>
                          <div className="ptp-tcol">
                            <strong style={{ fontFamily: "'PingFang SC UI', 'PingFang SC', sans-serif", fontSize: 18.5, fontWeight: 600, color: randomState === 'full' ? '#78837e' : '#16221c' }}>上海虹桥</strong>
                            <span style={{ fontSize: 11, color: randomState === 'full' ? '#aeb8b3' : '#7a8580' }}>虹桥国际机场 T2</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <RandomPlaneSvg muted={randomState === 'full'} />
                          </div>
                          <div className="ptp-tcol is-r">
                            <strong style={{ fontFamily: "'PingFang SC UI', 'PingFang SC', sans-serif", fontSize: 18.5, fontWeight: 600, color: randomState === 'full' ? '#78837e' : '#16221c' }}>北京大兴</strong>
                            <span style={{ fontSize: 11, color: randomState === 'full' ? '#aeb8b3' : '#7a8580' }}>大兴国际机场</span>
                          </div>
                        </div>
                        <div style={{ background: '#f5f7f8', borderRadius: 10, padding: '10px 12px', fontSize: 11.5, color: '#56655d', lineHeight: 1.72, marginBottom: 14 }}>
                          <div>乘机人信息：张*三</div>
                          <div>电子客票号：781-2345678901</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #f0f3f2' }}>
                          {randomState === 'available' ? (
                            <>
                              <span style={{ fontSize: 12, fontWeight: 600, color: '#2eb56b' }}>● 有氧舱名额：充足</span>
                              <button
                                type="button"
                                className="ptp-btn-green"
                                style={{ height: 31, padding: '0 19px', fontSize: 12 }}
                                onClick={() => { setSelectedFlightId('MU5101'); navigate('form'); }}
                              >
                                立即预约
                              </button>
                            </>
                          ) : (
                            <>
                              <span style={{ fontSize: 12, fontWeight: 600, color: '#d45c56' }}>● 本航班宠物名额已满</span>
                              <button
                                type="button"
                                className="ptp-btn-soft-green"
                                style={{ height: 31, padding: '0 19px', fontSize: 12 }}
                                onClick={() => { showToast('已无缝切换至同日可托运航班方案'); navigate('flights'); }}
                              >
                                申请托运
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <div style={{ textAlign: 'center', margin: '14px 0 18px' }}>
                        <button
                          type="button"
                          style={{ fontSize: 12, fontWeight: 600, color: '#2eb56b' }}
                          onClick={() => {
                            const next = randomState === 'available' ? 'full' : 'available';
                            setRandomState(next);
                            showToast(next === 'full' ? '已切换：本航班宠物名额已满兜底态' : '已切回：有氧舱名额充足');
                          }}
                        >
                          已购票未显示？尝试手动导入 ›
                        </button>
                      </div>
                    </>
                  )}

                  <div style={{ margin: '0 16px', fontSize: 11, color: '#839189', lineHeight: 1.72 }}>
                    <strong style={{ display: 'block', fontSize: 12, color: '#394941', marginBottom: 5 }}>温馨提示</strong>
                    1、请不晚于航班<strong style={{ color: '#2f3d36' }}>起飞前90分钟</strong>到达宠物专属值机柜台办理乘机手续。<br />
                    2、预约成功代表您具备托运名额资格，具体是否可以成行，请以现场工作人员<strong style={{ color: '#2f3d36' }}>审核为准，审核标准详见</strong> <span style={{ color: '#2eb56b' }}>《宠物同机飞(托运)服务运输规则》</span>。<br />
                    3、仅有氧舱机型可承运宠物，若遇机型临时调整等特殊情况，<strong style={{ color: '#2f3d36' }}>可能导致无法承运宠物</strong>，现场工作人员将协助旅客妥善处置后续事宜。<br />
                    4、已预约宠物同机飞(托运)服务的旅客，如遇航班临时变更，或因个人原因取消、改签行程，需及时登录航旅纵横APP/小程序<strong style={{ color: '#2f3d36' }}>主动取消预约</strong>，并按需<strong style={{ color: '#2f3d36' }}>重新申请</strong>。<br />
                    5、宠物同机飞(托运)服务预约申请截止时间为航班计划起飞前60分钟。
                  </div>
                </div>
                <div className="ptp-home-bar" />
              </div>
            )}

            {/* ══ 02A: SOLO SEARCH (Uncut 1:1 Figma Airplane Header + Real Search Controls) ══ */}
            {screen === 'soloSearch' && (
              <div key="soloSearch" className="ptp-view" style={{ background: '#f4f6f5' }}>
                <div className="ptp-scroll">
                  <div className="ptp-figma-hdr">
                    <img src={HYBRID_ASSETS.soloHeader} alt="宠物单独飞" />
                    <button
                      type="button"
                      className="ptp-hdr-back"
                      style={{ top: '34%', height: '28%' }}
                      aria-label="返回"
                      onClick={goBack}
                    />
                  </div>

                  <div className="ptp-search-card">
                    <div className="ptp-trip-tabs">
                      <button type="button" className={tripType === 'oneway' ? 'is-active' : ''} onClick={() => setTripType('oneway')}>单程</button>
                      <button type="button" className={tripType === 'round' ? 'is-active' : ''} onClick={() => setTripType('round')}>往返</button>
                    </div>

                    <div className="ptp-city-row">
                      <button key={`from-${fromCity.code}`} type="button" className="ptp-city-btn" onClick={() => setModal('cityFrom')}>
                        {fromCity.name}
                      </button>
                      <button
                        type="button"
                        aria-label="互换城市"
                        onClick={() => { setFromIdx(toIdx); setToIdx(fromIdx); setSwapCount((c) => c + 1); }}
                      >
                        <img
                          src={HYBRID_ASSETS.swapCircle}
                          alt="互换"
                          className="ptp-swap-img"
                          style={{ transform: `rotate(${swapCount * 180}deg)` }}
                        />
                      </button>
                      <button key={`to-${toCity.code}`} type="button" className="ptp-city-btn is-right" onClick={() => setModal('cityTo')}>
                        {toCity.name}
                      </button>
                    </div>

                    <button
                      type="button"
                      className="ptp-line-row"
                      onClick={() => {
                        const nextDate = dateStr === '5月20日 明天' ? '5月21日 周四' : '5月20日 明天';
                        setDateStr(nextDate);
                        const nextDay = nextDate.split(' ')[0];
                        setPickupSlot((prev) => (prev ? prev.replace(/5月2[01]日/, nextDay) : ''));
                      }}
                    >
                      <span className="ptp-solo-ico-badge">
                        <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                          <rect x="2.4" y="3.8" width="13.2" height="11.6" rx="2.2" stroke="#3eb77a" strokeWidth="1.5" />
                          <path d="M5.8 2.2V4.8M12.2 2.2V4.8M2.8 7.5H15.2M6 10.6H12" stroke="#3eb77a" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                      </span>
                      <span className="ptp-line-main">{dateStr.split(' ')[0]}</span>
                      <span className="sub">{dateStr.split(' ')[1]}</span>
                    </button>

                    <button
                      type="button"
                      className="ptp-line-row"
                      onClick={() => {
                        const idx = WEIGHT_OPTIONS.findIndex((w) => w.id === weightKey);
                        const next = WEIGHT_OPTIONS[(idx + 1) % WEIGHT_OPTIONS.length];
                        setWeightKey(next.id);
                        setWeightKg(next.sampleWeight);
                        setCrateOverride(null);
                        showToast(`已切换宠物预估总重：${next.label}（后续自动推荐对应航空箱）`);
                      }}
                    >
                      <span className="ptp-solo-ico-badge">
                        <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                          <path d="M9 2.2L14.8 5.4V12.6L9 15.8L3.2 12.6V5.4L9 2.2Z" stroke="#3eb77a" strokeWidth="1.5" strokeLinejoin="round" />
                          <path d="M3.2 5.4L9 8.6L14.8 5.4M9 8.6V15.8" stroke="#3eb77a" strokeWidth="1.35" />
                        </svg>
                      </span>
                      <strong className="ptp-line-main" style={{ fontSize: 18 }}>
                        {WEIGHT_OPTIONS.find((w) => w.id === weightKey)?.label}
                      </strong>
                      <span className="sub">宠物预估总重量（含航空箱）</span>
                    </button>

                    <div className="ptp-promo-strip">
                      <svg width="11" height="13" viewBox="0 0 12 14" fill="none" style={{ flexShrink: 0 }}>
                        <rect x="0.8" y="1" width="10.4" height="12" rx="1.6" fill="#d93b34" />
                        <path d="M2 5.2C4.2 6.6 7.8 6.6 10 5.2" stroke="#ffd49c" strokeWidth="1.1" strokeLinecap="round" />
                        <circle cx="6" cy="6.2" r="1.2" fill="#ffd49c" />
                      </svg>
                      <span>首单免费赠送宠物航空意外险 去领取!</span>
                    </div>

                    <div className="ptp-search-cta-row">
                      <button type="button" className="ptp-btn-gold" onClick={() => navigate('flights')}>
                        <strong>查询方案</strong>
                        <span><ShieldCheckMiniSvg /> 40+国内航空公司直销</span>
                      </button>
                      <button
                        type="button"
                        aria-label="AI 预订"
                        onClick={() => {
                          setFlightFilter('wide');
                          showToast('AI 预订：已为您优先匹配宽体机独立有氧舱方案');
                          navigate('flights');
                        }}
                      >
                        <img src={HYBRID_ASSETS.aiOrb} alt="AI预订" className="ptp-ai-orb" />
                      </button>
                    </div>
                  </div>

                  <div className="ptp-notice-box">
                    <SoloNoticeWatermarkSvg />
                    <strong style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 5, color: '#1b2620', fontSize: 12, marginBottom: 10 }}>
                      <BulbRaysSvg />
                      货运托运须知：
                    </strong>
                    <div className="ptp-notice-item"><span style={{ color: '#39b974' }}>•</span><span>单独货运不与主人客票绑定，宠物独立由货运站安排舱机。</span></div>
                    <div className="ptp-notice-item"><span style={{ color: '#39b974' }}>•</span><span>宽体客机货舱或全货机均配置独立供氧与恒温控制系统。</span></div>
                  </div>
                </div>
                <div className="ptp-home-bar" />
              </div>
            )}

            {/* ══ 03: FLIGHT LIST (1:1 Continuous Emerald World-Map Header + Floating White Filter Card + 1:1 Flight Cards) ══ */}
            {screen === 'flights' && (
              <div key="flights" className="ptp-view" style={{ background: '#f4f6f5' }}>
                <div className="ptp-emerald-bg-layer" />
                <div style={{ position: 'relative', zIndex: 4, flexShrink: 0, color: '#ffffff' }}>
                  <StatusBar light />
                  <div className="ptp-nav">
                    <button type="button" className="ptp-nav-btn" onClick={goBack}><BackSvg color="#fff" /></button>
                    <button
                      type="button"
                      className="ptp-nav-title"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: '#ffffff' }}
                      onClick={() => { setFromIdx(toIdx); setToIdx(fromIdx); showToast('已互换出发与到达城市'); }}
                    >
                      <span>{fromCity.name}</span>
                      <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="8.5" stroke="#ffffff" strokeWidth="1.25" strokeOpacity="0.88" />
                        <path d="M5.8 11.2L14.2 8.2L11.5 11.4L10.3 13.5L9.4 11.2L5.8 11.2Z" fill="#ffffff" />
                      </svg>
                      <span>{toCity.name}</span>
                      <DownTriSvg color="rgba(255,255,255,0.92)" size={8} />
                    </button>
                    <button type="button" className="ptp-nav-btn" onClick={() => showToast('航旅宠物专线 24h 在线')}>帮助</button>
                  </div>
                  <div className="ptp-meta-pill">
                    {dateDayLabel} ({dateWeekday}) &nbsp;|&nbsp; 宠物含箱{selectedWeightLabel.replace(/\s+/g, '')} &nbsp;|&nbsp; {tripType === 'oneway' ? '单程货运' : '往返货运'}
                  </div>
                </div>

                <div className="ptp-filter-card">
                  {[
                    { id: 'all', label: '综合排序 ▾' },
                    { id: 'wide', label: '宽体机' },
                    { id: 'mu', label: `东方航空 (${FLIGHTS.filter((fl) => fl.airlineKey === 'mu').length})` },
                    { id: 'ca', label: `中国国航 (${FLIGHTS.filter((fl) => fl.airlineKey === 'ca').length})` },
                  ].map((f) => {
                    const isChipActive = f.id !== 'all' && flightFilter === f.id;
                    const isAllActive = f.id === 'all' && flightFilter === 'all';
                    return (
                      <button
                        key={f.id}
                        type="button"
                        className={`ptp-fchip${isChipActive ? ' is-active' : ''}`}
                        style={isAllActive ? { color: '#16221c', fontWeight: 500 } : undefined}
                        onClick={() => setFlightFilter(f.id !== 'all' && flightFilter === f.id ? 'all' : f.id)}
                      >
                        {f.label}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    className="ptp-fchip"
                    onClick={() => showToast('当前航线暂无南方航空有氧舱执飞')}
                  >
                    南方
                  </button>
                  <button
                    type="button"
                    className="ptp-fchip"
                    style={{ fontWeight: 500, color: '#1b2821' }}
                    onClick={() => { setFlightFilter('all'); showToast('已重置全部筛选条件'); }}
                  >
                    筛选
                  </button>
                </div>

                <div className="ptp-scroll" style={{ position: 'relative', zIndex: 4, padding: '10px 12px 24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                    {filteredFlights.map((fl) => (
                      <div key={fl.id} className={`ptp-flight-card${fl.hasRecBadge ? ' has-rec' : ''}`}>
                        {fl.hasRecBadge && <img src={HYBRID_ASSETS.recBadge} alt="官方推荐全包无忧" className="ptp-rec-img" />}
                        <div className="ptp-air-row">
                          <img src={fl.airlineKey === 'mu' ? HYBRID_ASSETS.muLogo : HYBRID_ASSETS.caLogo} alt={fl.airline} />
                          <span>{fl.airline} {fl.code}</span>
                          <span className="ptp-air-tag">{fl.aircraft}</span>
                        </div>
                        <div className="ptp-times">
                          <div className="ptp-tcol">
                            <small>交接</small>
                            <strong>{fl.handoffTime}</strong>
                            <span>{fromCity[fl.fromStationKey]}</span>
                          </div>
                          <div className="ptp-tmid">
                            <div><span className="ptp-din-med">{fl.takeoffText.split(' ')[0]}</span> {fl.takeoffText.split(' ').slice(1).join(' ')}</div>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', margin: '4px 0' }}>
                              <div className="ptp-tmid-line" style={{ flex: 1, margin: 0 }} />
                              <span style={{ padding: '0 3px', display: 'inline-flex', alignItems: 'center' }}><MiniTimelinePlaneSvg /></span>
                              <div className="ptp-tmid-line" style={{ flex: 1, margin: 0 }} />
                            </div>
                            <div>{fl.duration}</div>
                          </div>
                          <div className="ptp-tcol is-r">
                            <small>提取</small>
                            <strong>{fl.pickupTime}</strong>
                            <span>{toCity[fl.toStationKey]}</span>
                          </div>
                        </div>
                        <div className="ptp-perks">
                          {fl.perks.map((p) => <span key={p}>{p}</span>)}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid #ecefed' }}>
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 400, color: '#7f8b85' }}>{fl.priceLabel}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 3 }}>
                              <span className="ptp-price-num">
                                <em style={{ fontFamily: "'PingFang SC UI', 'PingFang SC', sans-serif", fontStyle: 'normal', fontSize: 13.5, fontWeight: 400, marginRight: 2 }}>¥</em>
                                {fl.price}
                              </span>
                              {fl.scarcity && (
                                <span style={{ fontSize: 10.5, padding: '2.5px 11px', borderRadius: 6, background: '#fff4e8', color: '#df8743', fontWeight: 400 }}>
                                  {fl.scarcity}
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            className="ptp-btn-buy"
                            onClick={() => { setSelectedFlightId(fl.id); navigate('detail'); }}
                          >
                            立即购买
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ptp-home-bar" />
              </div>
            )}

            {/* ══ 04: PLAN DETAIL (1:1 Continuous Emerald Header + Scroll-Reactive Sticky White Nav + Real Long Scroll) ══ */}
            {screen === 'detail' && (
              <div key="detail" className="ptp-view" style={{ background: '#f4f6f5' }}>
                <div className="ptp-emerald-bg-layer" style={{ height: 268, opacity: detailScrolled ? 0 : 1, transition: 'opacity 0.2s ease' }} />
                <div className={`ptp-chrome-top${detailScrolled ? ' is-scrolled' : ''}`}>
                  <StatusBar light={!detailScrolled} />
                  <div className="ptp-nav">
                    <button type="button" className="ptp-nav-btn" onClick={goBack}>
                      <BackSvg color={detailScrolled ? '#16221c' : '#fff'} />
                    </button>
                    <span className="ptp-nav-title">方案详情</span>
                    <span className="ptp-nav-btn" />
                  </div>
                </div>

                <div
                  className="ptp-scroll"
                  style={{ position: 'relative', zIndex: 4, paddingTop: 6 }}
                  onScroll={(e) => setDetailScrolled(e.currentTarget.scrollTop > 110)}
                >
                  <div style={{ margin: '0 12px 12px', padding: '13px 14px', borderRadius: 15, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.22)', color: '#ffffff', position: 'relative', overflow: 'hidden' }}>
                    {selectedFlight.hasRecBadge && (
                      <img src={HYBRID_ASSETS.recBadge} alt="官方推荐" style={{ position: 'absolute', top: 0, right: 0, height: 22, borderRadius: '0 15px 0 9px' }} />
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 700, marginBottom: 5 }}>
                      <img src={selectedFlight.airlineKey === 'mu' ? HYBRID_ASSETS.muLogo : HYBRID_ASSETS.caLogo} alt={selectedFlight.airline} style={{ width: 17, height: 15, objectFit: 'contain' }} />
                      <span>{selectedFlight.airline} {selectedFlight.code}</span>
                    </div>
                    <div style={{ fontSize: 11.5, opacity: 0.94, marginBottom: 9 }}>
                      {dateDayLabel} ({dateWeekday}) &nbsp;|&nbsp; 宠物含箱 {selectedWeightLabel}
                    </div>
                    <div style={{ display: 'flex', gap: 7 }}>
                      <span style={{ fontSize: 10.5, padding: '2.5px 9px', borderRadius: 5, background: 'rgba(0,0,0,0.14)' }}>{selectedFlight.aircraft}</span>
                      <span style={{ fontSize: 10.5, padding: '2.5px 9px', borderRadius: 5, background: 'rgba(0,0,0,0.14)' }}>{selectedFlight.oxygenTag}</span>
                    </div>
                  </div>

                  <div className="ptp-card">
                    <div className="ptp-times" style={{ marginBottom: 0 }}>
                      <div className="ptp-tcol">
                        <small>交接</small>
                        <strong>{selectedFlight.handoffTime}</strong>
                        <span>{fromCity[selectedFlight.fromStationKey]}</span>
                      </div>
                      <div className="ptp-tmid">
                        <div><span className="ptp-din-med">{selectedFlight.takeoffText.split(' ')[0]}</span> {selectedFlight.takeoffText.split(' ').slice(1).join(' ')}</div>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', margin: '4px 0' }}>
                          <div className="ptp-tmid-line" style={{ flex: 1, margin: 0 }} />
                          <span style={{ padding: '0 3px', display: 'inline-flex', alignItems: 'center' }}><MiniTimelinePlaneSvg /></span>
                          <div className="ptp-tmid-line" style={{ flex: 1, margin: 0 }} />
                        </div>
                        <div>{selectedFlight.duration}</div>
                      </div>
                      <div className="ptp-tcol is-r">
                        <small>提取</small>
                        <strong>{selectedFlight.pickupTime}</strong>
                        <span>{toCity[selectedFlight.toStationKey]}</span>
                      </div>
                    </div>
                  </div>

                  {/* 1:1 Figma 3D Benefits Diagram */}
                  <div className="ptp-card">
                    <h4 className="ptp-sec-h">服务包含项目</h4>
                    <img
                      src={HYBRID_ASSETS.detailBenefits}
                      alt="代办三证 同城专车 赠送保险 标准航空箱"
                      style={{ display: 'block', width: '100%', height: 'auto' }}
                    />
                  </div>

                  <div className="ptp-card">
                    <h4 className="ptp-sec-h">费用构成明细</h4>
                    {selectedFlight.breakdown.map((b) => (
                      <div key={b.label} className="ptp-fee-row">
                        <span>{b.label}</span>
                        <strong className={b.highlight ? 'is-free' : 'ptp-din-med'}>{b.price}</strong>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, marginTop: 6, borderTop: '1px solid #f1f4f2', fontSize: 14, fontWeight: 600 }}>
                      <span>方案预估总价</span>
                      <span className="ptp-din-med" style={{ color: '#e45044', fontSize: 18 }}>
                        <em style={{ fontFamily: "'PingFang SC UI', 'PingFang SC', sans-serif", fontStyle: 'normal', fontSize: 13.5, fontWeight: 500, marginRight: 2 }}>¥</em>
                        {selectedFlight.price}
                      </span>
                    </div>
                  </div>

                  <div className="ptp-card">
                    <h4 className="ptp-sec-h">托运限制及健康要求</h4>
                    <div className="ptp-alert is-red">
                      <AlertCircleSvg bg="#e34f47" type="bang" />
                      <div>
                        <strong>严格禁飞品种</strong>
                        短鼻类猫犬（如法斗、巴哥、加菲猫、波斯猫等）由于高空易窒息，属于民航禁运品种，本方案不支持承运。
                      </div>
                    </div>
                    <div className="ptp-alert is-green">
                      <AlertCircleSvg bg="#2eb66b" type="info" />
                      <div>
                        <strong>健康及适运状态</strong>
                        宠物年龄须在8周至10周岁内，处于非怀孕、非术后康复期。为了起飞安全，交接前4小时请务必让宠物保持断食。
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ptp-sticky-bar">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: 10.5, color: '#83918a' }}>方案预估总价</div>
                      <div className="ptp-din-bold" style={{ fontSize: 22.5, color: '#e4554b', lineHeight: 1.15, marginTop: 1 }}>
                        <em style={{ fontFamily: "'PingFang SC UI', 'PingFang SC', sans-serif", fontStyle: 'normal', fontSize: 13, fontWeight: 500, marginRight: 2 }}>¥</em>
                        {selectedFlight.price}
                      </div>
                    </div>
                    <button type="button" className="ptp-btn-green-full" style={{ width: 150, height: 42, fontSize: 14, fontWeight: 500, background: 'linear-gradient(90deg, #52c693 0%, #3ab75e 100%)' }} onClick={() => navigate('form')}>
                      前往填写订单
                    </button>
                  </div>
                </div>
                <div className="ptp-home-bar" />
              </div>
            )}

            {/* ══ 05: REAL SCROLLABLE & INTERACTIVE FORM (1:1 Continuous Emerald Header + Scroll-Reactive Sticky White Nav) ══ */}
            {screen === 'form' && (
              <div key="form" className="ptp-view" style={{ background: '#f4f6f5' }}>
                <div className="ptp-emerald-bg-layer" style={{ height: 220, opacity: formScrolled ? 0 : 1, transition: 'opacity 0.2s ease' }} />
                <div className={`ptp-chrome-top${formScrolled ? ' is-scrolled' : ''}`}>
                  <StatusBar light={!formScrolled} />
                  <div className="ptp-nav">
                    <button type="button" className="ptp-nav-btn" onClick={goBack}>
                      <BackSvg color={formScrolled ? '#16221c' : '#fff'} />
                    </button>
                    <span className="ptp-nav-title">填写订单信息</span>
                    <span className="ptp-nav-btn" />
                  </div>
                  {!formScrolled && (
                    <div className="ptp-steps">
                      <span className="is-on"><CheckMiniSvg color="#ffffff" size={11} strokeWidth={2.1} /> 选航班</span>
                      <i />
                      <span className="is-on"><span className="ptp-step-num">2</span>填信息</span>
                      <i />
                      <span>3 支付</span>
                    </div>
                  )}
                </div>

                <div
                  ref={formScrollRef}
                  className="ptp-scroll"
                  style={{ position: 'relative', zIndex: 4, paddingTop: 10 }}
                  onScroll={(e) => setFormScrolled(e.currentTarget.scrollTop > 56)}
                >
                  <div className="ptp-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <strong style={{ fontSize: 14 }}>宠物档案</strong>
                      <span style={{ fontSize: 10.5, color: '#e45044' }}>* 必填项</span>
                    </div>
                    <div className="ptp-field">
                      <span className="ptp-field-l">品种<em>*</em></span>
                      <button type="button" className="ptp-field-v" onClick={() => { setBreedSearch(''); setBreedAlert(null); setModal('breed'); }}>
                        <span>{breed}</span><RightSvg />
                      </button>
                    </div>
                    <div data-form-field="petName" className={`ptp-field${pulseField === 'petName' ? ' ptp-pulse-err' : ''}`}>
                      <span className="ptp-field-l">昵称<em>*</em></span>
                      <input className="ptp-inline-inp" maxLength={8} value={petName} onChange={(e) => setPetName(e.target.value)} placeholder="宠物姓名" />
                    </div>
                    <div className="ptp-field">
                      <span className="ptp-field-l">性别<em>*</em></span>
                      <div className="ptp-seg">
                        {['雄性', '雌性'].map((g) => (
                          <button key={g} type="button" className={gender === g ? 'is-active' : ''} onClick={() => setGender(g)}>{g}</button>
                        ))}
                      </div>
                    </div>
                    <div className="ptp-field">
                      <span className="ptp-field-l">绝育情况<em>*</em></span>
                      <div className="ptp-seg">
                        {['已绝育', '未绝育'].map((n) => (
                          <button key={n} type="button" className={neutered === n ? 'is-active' : ''} onClick={() => setNeutered(n)}>{n}</button>
                        ))}
                      </div>
                    </div>
                    <div className="ptp-field">
                      <span className="ptp-field-l">体重<em>*</em></span>
                      <button type="button" className="ptp-field-v" onClick={() => { setDraftWeightKg(weightKg); setModal('weight'); }}>
                        <span>{weightKg} kg</span><RightSvg />
                      </button>
                    </div>
                    <div data-form-field="age" className={`ptp-field${pulseField === 'age' ? ' ptp-pulse-err' : ''}`}>
                      <span className={`ptp-field-l${!ageObj.eligible ? ' is-err' : ''}`}>年龄<em>*</em></span>
                      <button type="button" className={`ptp-field-v${!ageObj.eligible ? ' is-err' : ''}`} onClick={() => { setDraftAgeObj(ageObj); setModal('age'); }}>
                        <span>{ageObj.label}</span><RightSvg color={!ageObj.eligible ? '#e45044' : '#9aa8a0'} />
                      </button>
                    </div>
                    {!ageObj.eligible && <div className="ptp-err-strip">{ageObj.note}</div>}
                  </div>

                  <div className="ptp-card">
                    <strong style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>寄宠与上门信息</strong>
                    <div className="ptp-field">
                      <span className="ptp-field-l">发件地址<em>*</em></span>
                      <button type="button" className="ptp-field-v" onClick={() => setModal('addrSend')}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{senderAddr.detail}</span>
                        <RightSvg />
                      </button>
                    </div>
                    <div data-form-field="pickupSlot" className={`ptp-field${pulseField === 'pickupSlot' ? ' ptp-pulse-err' : ''}`}>
                      <span className={`ptp-field-l${!pickupSlot ? ' is-err' : ''}`}>上门时间<em>*</em></span>
                      <button type="button" className={`ptp-field-v${!pickupSlot ? ' is-err' : ''}`} onClick={() => setModal('slot')}>
                        <span>{pickupSlot || '请选择日期与时段'}</span>
                        <RightSvg color={!pickupSlot ? '#e45044' : '#9aa8a0'} />
                      </button>
                    </div>
                    {!pickupSlot && (
                      <div className="ptp-err-strip" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <WarnTriSvg size={11} />
                        <span>上门时间不能为空，请选择合理的上门揽收时段</span>
                      </div>
                    )}
                  </div>

                  <div className="ptp-card">
                    <strong style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>收宠与提宠信息</strong>
                    <div className="ptp-field">
                      <span className="ptp-field-l">收宠地址<em>*</em></span>
                      <button type="button" className="ptp-field-v" onClick={() => setModal('addrRecv')}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{receiverAddr.detail}</span>
                        <RightSvg />
                      </button>
                    </div>
                    <div data-form-field="contact" className={`ptp-field${pulseField === 'contact' ? ' ptp-pulse-err' : ''}`}>
                      <span className="ptp-field-l">联系人姓名<em>*</em></span>
                      <input className="ptp-inline-inp" maxLength={12} value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="提宠人姓名" />
                    </div>
                    <div className="ptp-field">
                      <span className="ptp-field-l">联系电话<em>*</em></span>
                      <input className="ptp-inline-inp" maxLength={15} value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="提宠人手机号" />
                    </div>
                  </div>

                  <div className="ptp-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <strong style={{ fontSize: 14 }}>运输箱规格</strong>
                      <span style={{ fontSize: 10.5, padding: '2px 8px', borderRadius: 4, background: '#e7f8ef', color: '#219053', fontWeight: 600 }}>系统智能推荐</span>
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
                          {recommendedCrate === c.num && <span className="ptp-crate-rec">推荐</span>}
                          <strong>{c.label}</strong>
                          <span className="ptp-crate-cap">{c.cap}</span>
                        </button>
                      ))}
                    </div>
                    <div style={{ background: '#eaf8f0', color: '#279e5e', fontSize: 10.5, padding: '6px 9px', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                      <CheckMiniSvg color="#279e5e" size={11} strokeWidth={2} />
                      <span>已根据宠物活体净重{weightKg}kg 自动匹配合规 {recommendedCrate}号航空箱规格</span>
                    </div>
                  </div>

                  <div className="ptp-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <strong style={{ fontSize: 14 }}>影像与资质材料</strong>
                      <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: '#fff1f0', color: '#e45044', fontWeight: 600 }}>* 必填</span>
                    </div>
                    <div className="ptp-upload-grid">
                      <button
                        type="button"
                        data-form-field="photo"
                        className={`ptp-upload-slot${photoUploaded ? ' is-ok' : ' is-miss'}${pulseField === 'photo' ? ' ptp-pulse-err' : ''}`}
                        onClick={() => { setPhotoUploaded((v) => !v); showToast(photoUploaded ? '已移除合照' : '已上传宠物与航空箱合照'); }}
                      >
                        {photoUploaded ? <CheckMiniSvg color="#249b59" size={16} strokeWidth={2.1} /> : <PlusMiniSvg color="#e45044" size={16} />}
                        <strong>宠物与箱合照</strong>
                        <span
                          style={{
                            fontSize: 9.5,
                            padding: '1px 6px',
                            borderRadius: 4,
                            background: photoUploaded ? '#2eb66b' : '#ffffff',
                            border: photoUploaded ? 'none' : '1px solid #f09590',
                            color: photoUploaded ? '#fff' : '#df4b44',
                            fontWeight: 600,
                          }}
                        >
                          {photoUploaded ? '已上传' : '未上传'}
                        </span>
                      </button>

                      <button type="button" className="ptp-upload-slot is-ocr" style={{ position: 'relative' }} onClick={() => setModal('ocr')}>
                        <div style={{ width: '100%', background: '#e3e8ec', padding: '14px 4px 12px', position: 'relative' }}>
                          <span style={{ position: 'absolute', top: 5, right: 5, display: 'inline-flex' }}>
                            <CloseCircleSvg />
                          </span>
                          <span style={{ fontSize: 10.5, color: '#8a959e' }}>[检疫证原件]</span>
                        </div>
                        <div style={{ width: '100%', padding: '5px 5px 7px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 3 }}>
                          <span style={{ fontSize: 9, padding: '1px 7px', borderRadius: 999, background: '#3ec172', color: '#fff', fontWeight: 700 }}>OCR已提</span>
                          <strong style={{ fontSize: 10.5 }}>动物检疫合格证</strong>
                        </div>
                      </button>

                      <button
                        type="button"
                        className={`ptp-upload-slot${vaccineUploaded ? ' is-ok' : ''}`}
                        onClick={() => { setVaccineUploaded((v) => !v); showToast(vaccineUploaded ? '已取消疫苗本' : '疫苗本已核验'); }}
                      >
                        {vaccineUploaded ? <CheckMiniSvg color="#249b59" size={16} strokeWidth={2.1} /> : <PlusMiniSvg color="#6c7c74" size={16} />}
                        <strong>疫苗本原件</strong>
                        <span style={{ fontSize: 9.5, color: '#8a9991' }}>{vaccineUploaded ? '已核验' : '含狂犬贴纸'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="ptp-card">
                    <strong style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 10 }}>增值服务 <span style={{ fontSize: 11.5, fontWeight: 400, color: '#7d8c84' }}>(可选)</span></strong>
                    <button type="button" className={`ptp-addon${addonInsurance ? ' is-active' : ''}`} onClick={() => setAddonInsurance((v) => !v)}>
                      <span className={`ptp-chk${addonInsurance ? ' is-on' : ''}`}>{addonInsurance ? <CheckMiniSvg color="#ffffff" size={10} strokeWidth={2.2} /> : null}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: '#16221c' }}>宠运无忧综合险</div>
                        <div style={{ fontSize: 10.5, fontWeight: 400, color: '#7e8d85', marginTop: 2 }}>全程意外伤害与应急丢失保障，最高赔付 1 万元</div>
                      </div>
                      <strong style={{ fontSize: 12.5, fontWeight: 500, color: '#2eb66b' }}>¥19</strong>
                    </button>
                    <button type="button" className={`ptp-addon${addonValuation ? ' is-active' : ''}`} onClick={() => setAddonValuation((v) => !v)}>
                      <span className={`ptp-chk${addonValuation ? ' is-on' : ''}`}>{addonValuation ? <CheckMiniSvg color="#ffffff" size={10} strokeWidth={2.2} /> : null}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: addonValuation ? 500 : 400, color: addonValuation ? '#16221c' : '#56645d' }}>全额保价服务</div>
                        <div style={{ fontSize: 10.5, fontWeight: 400, color: '#8a9891', marginTop: 2 }}>声明宠物实际估值，享独立保额超额全额赔付</div>
                      </div>
                      <strong style={{ fontSize: 11.5, fontWeight: 400, color: addonValuation ? '#2eb66b' : '#8a9891' }}>{addonValuation ? '¥40' : '按比例'}</strong>
                    </button>
                  </div>

                  <div className="ptp-card">
                    <strong style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>订单备注 <span style={{ fontSize: 11.5, fontWeight: 400, color: '#7d8c84' }}>(选填)</span></strong>
                    <textarea
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      placeholder="例如：狗狗比较胆小，请轻声安抚"
                      rows={2}
                      style={{ width: '100%', height: 60, resize: 'none', borderRadius: 10, border: '1px solid #e4ebe7', background: '#f7f8f9', padding: '9px 11px', fontSize: 12, fontFamily: 'inherit', outline: 'none' }}
                    />
                  </div>
                </div>

                <div className="ptp-sticky-bar ptp-form-sticky-bar">
                  {formMissing.length > 0 && (
                    <button
                      type="button"
                      className="ptp-form-warn-bar"
                      onClick={() =>
                        focusMissingField(
                          formMissing[0],
                          `已定位至「${formMissing[0].label}」（共缺 ${formMissing.map((m) => m.label).join('、')}）`
                        )
                      }
                    >
                      <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                        <path d="M7 1.8L12.6 11.8H1.4L7 1.8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                        <path d="M7 5.3V8.2M7 10.1V10.4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                      </svg>
                      <span>还有 {formMissing.length} 项未正确填写，点击定位完善</span>
                    </button>
                  )}
                  <div data-form-field="agreed" className={`ptp-form-agree-row${pulseField === 'agreed' ? ' ptp-pulse-err' : ''}`}>
                    <span className="ptp-form-agree-text">
                      我已阅读并同意以下条款：<em style={{ fontStyle: 'normal', color: '#45b776' }}>《承运方活体免责声明》、《活体运输协议》</em>
                    </span>
                    <button
                      type="button"
                      className={`ptp-agree-chk${agreed && formMissing.length === 0 ? ' is-ready' : agreed ? ' is-on' : ''}`}
                      onClick={() => setAgreed((v) => !v)}
                      aria-label="同意协议条款"
                    >
                      {agreed ? (
                        <svg width="8.5" height="7" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                          <path d="M1.2 4.1L3.7 6.6L8.8 1.4" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : null}
                    </button>
                  </div>
                  <div className="ptp-submit-pill">
                    <div className="ptp-submit-l">
                      <div className="ptp-submit-price-grp">
                        <span className="ptp-submit-price">
                          <small>¥</small>
                          <strong>{totalPrice}</strong>
                        </span>
                        <i className="ptp-submit-sep" aria-hidden="true" />
                        <span className="ptp-submit-lbl">订单金额</span>
                      </div>
                      <button type="button" className="ptp-submit-detail-btn" onClick={() => setModal('price')}>
                        <span>明细</span>
                        <svg width="11" height="6.5" viewBox="0 0 12 7" fill="none" aria-hidden="true">
                          <path d="M1.2 5.8L6 1.2L10.8 5.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                    <button
                      type="button"
                      className={`ptp-submit-btn${formMissing.length > 0 ? ' is-off' : ''}`}
                      onClick={() => {
                        if (formMissing.length > 0) { focusMissingField(formMissing[0]); return; }
                        setTrackStageIdx(2);
                        navigate('success');
                      }}
                    >
                      提交订单
                    </button>
                  </div>
                </div>
                <div className="ptp-home-bar" />
              </div>
            )}

            {/* ══ 06: ORDER SUCCESS & EMPTY ORDERS ══ */}
            {screen === 'success' && (
              <div key="success" className="ptp-view" style={{ background: '#ffffff' }}>
                <StatusBar bg="#ffffff" />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px 68px', textAlign: 'center' }}>
                  <img src={HYBRID_ASSETS.successDog} alt="提交成功" style={{ width: 128, height: 126, objectFit: 'contain', marginBottom: 14, mixBlendMode: 'multiply' }} />
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#19221e', margin: '0 0 8px' }}>订单提交成功</h3>
                  <p style={{ fontSize: 11.5, color: '#8a958f', lineHeight: 1.65, margin: '0 0 38px' }}>
                    您的宠物托运申请已进入系统<br />预计 15 分钟内为您锁定舱位
                  </p>
                  <button
                    type="button"
                    className="ptp-btn-green-full"
                    style={{ width: '80%', maxWidth: 268, height: 42, background: 'linear-gradient(90deg, #43c192 0%, #24b358 100%)', fontSize: 13.5 }}
                    onClick={() => navigate('tracking')}
                  >
                    查看订单详情
                  </button>
                  <button
                    type="button"
                    style={{ width: '80%', maxWidth: 268, height: 42, borderRadius: 999, background: '#d0d3d2', color: '#19221e', fontSize: 13.5, fontWeight: 500, marginTop: 14 }}
                    onClick={() => navigate('hub')}
                  >
                    返回首页
                  </button>
                </div>
                <div className="ptp-home-bar" />
              </div>
            )}

            {screen === 'orders' && (
              <div key="orders" className="ptp-view" style={{ background: '#ffffff' }}>
                <StatusBar bg="#ffffff" />
                <div className="ptp-nav">
                  <button type="button" className="ptp-nav-btn" onClick={goBack}><BackSvg /></button>
                  <span className="ptp-nav-title">我的订单</span>
                  <button type="button" style={{ fontSize: 12, color: '#5c6b63' }} onClick={() => showToast('暂无可开票订单')}>我的发票</button>
                </div>
                <div className="ptp-ord-tabs">
                  {['全部', '待支付', '处理中', '已完成', '售后/退改', '待评价'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`ptp-ord-tab${orderTab === t ? ' is-active' : ''}`}
                      onClick={() => setOrderTab(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="ptp-ord-filters">
                  <button type="button" className="ptp-ord-pill" onClick={() => showToast('当前筛选：全部订单')}>全部订单 ▾</button>
                  <button type="button" className="ptp-ord-pill" onClick={() => showToast('按最近下单日期排序')}>下单日期 ▾</button>
                  <button
                    type="button"
                    style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#55635c' }}
                    onClick={() => setOnlyValidOrders((v) => !v)}
                  >
                    <span
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        background: onlyValidOrders ? '#2eb66b' : '#d8dedb',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CheckMiniSvg color="#ffffff" size={9} strokeWidth={2.2} />
                    </span>
                    只看有效订单
                  </button>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '110px 32px 48px', textAlign: 'center' }}>
                  <img src={HYBRID_ASSETS.emptyDog} alt="暂无订单" style={{ width: 118, height: 94, objectFit: 'contain', marginBottom: 14, mixBlendMode: 'multiply' }} />
                  <h3 style={{ fontSize: 15.5, fontWeight: 700, margin: 0, color: '#2b3530' }}>暂无订单</h3>
                </div>
                <div className="ptp-home-bar" />
              </div>
            )}

            {/* ══ 07: LIVE TRACKING ON 1:1 AMAP ══ */}
            {screen === 'tracking' && (() => {
              const isArrived = trackStageIdx === 4;
              const stagePct = `${(trackStageIdx / 4) * 100}%`;
              const trackingCardBody = (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 11, color: '#45544c', fontWeight: 500 }}>{trackStage.etaPrefix}</div>
                      <div className="ptp-track-eta-time">{trackStage.etaTime}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1b2620', marginTop: 3 }}>{trackStage.etaPlace}</div>
                    </div>
                    <button
                      type="button"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 600, color: '#1e2c25', marginTop: 2 }}
                      onClick={() => showToast('已接通航旅纵横宠物专属客服')}
                    >
                      <img src={HYBRID_ASSETS.umetripCs} alt="客服" style={{ width: 15, height: 16, objectFit: 'contain' }} />
                      联系客服
                    </button>
                  </div>

                  <div style={{ fontSize: 10.8, color: '#24302a', paddingBottom: 12, borderBottom: '1px solid #f0f3f2', marginBottom: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    请接机人 <strong style={{ color: '#000000', fontWeight: 800, fontSize: 11.8 }}>{contactName || '阿童'}</strong> 携带有效身份证件，至 <strong style={{ color: '#26a862', fontWeight: 700, fontSize: 11.8 }}>T2 提取处</strong> 办理提宠。
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                      <div className="ptp-track-avatar-ring">
                        <img src={HYBRID_ASSETS.petAvatar} alt="小航" />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <strong style={{ fontSize: 17, fontWeight: 800, color: '#121c17' }}>{petName || '小航'}</strong>
                          <span style={{ fontSize: 10, padding: '1.5px 7px', borderRadius: 999, background: '#e5f8ed', color: '#24a55f', fontWeight: 600 }}>● 有氧舱</span>
                        </div>
                        <div style={{ fontSize: 10.5, color: '#8a9991', marginTop: 2 }}>{breedTouched ? breed : '中华田园犬'}</div>
                        <button
                          type="button"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10.5, color: '#9ba8a1', marginTop: 1 }}
                          onClick={() => showToast('已复制订单号：PT-20250519001')}
                        >
                          <span>订单号：PT-20250519001</span>
                          <CopySvg />
                        </button>
                      </div>
                    </div>
                    <button type="button" style={{ textAlign: 'right' }} onClick={() => setModal('price')}>
                      <div style={{ fontSize: 17, color: '#8a949c', fontVariantNumeric: 'tabular-nums' }}>
                        <span style={{ fontSize: 12.5, fontWeight: 500, marginRight: 2 }}>¥</span>
                        <span className="ptp-din-bold">613</span>
                      </div>
                      <div style={{ fontSize: 10, color: '#8c9891', marginTop: 1, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                        <span>明细</span>
                        <DownTriSvg color="#8c9891" size={7} />
                      </div>
                    </button>
                  </div>

                  <div style={{ background: '#f7f8f9', borderRadius: 12, padding: '12px 12px 11px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: 12.5, color: '#18251e' }}>全流程追踪</strong>
                      <button type="button" style={{ fontSize: 10.5, color: '#8c9a92', display: 'inline-flex', alignItems: 'center', gap: 2 }} onClick={() => setModal('timeline')}>
                        <span>查看全部</span>
                        <RightSvg color="#8c9a92" />
                      </button>
                    </div>
                    <div className="ptp-stage-rail">
                      <div className="ptp-stage-track">
                        <div className="ptp-stage-track-fill" style={{ width: stagePct }} />
                      </div>
                      {TRACKING_STAGES.map((st, idx) => {
                        const nodeState = idx < trackStageIdx ? 'done' : idx === trackStageIdx ? 'now' : 'todo';
                        return (
                          <button
                            key={st.key}
                            type="button"
                            className={`ptp-stage-node${nodeState === 'done' ? ' is-done' : ''}${nodeState === 'now' ? ' is-now' : ''}`}
                            onClick={() => setTrackStageIdx(idx)}
                          >
                            <span className="ptp-stage-dot">
                              <StageNodeSvg state={nodeState} />
                            </span>
                            <span>{st.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <button
                      type="button"
                      className="ptp-track-log-box"
                      onClick={() => setModal('timeline')}
                    >
                      <span className="ptp-log-time-pill">{trackStage.summaryTime}</span>
                      <span>{trackStage.summaryText}</span>
                    </button>
                  </div>
                </>
              );

              const mapStatusText =
                trackStageIdx === 0
                  ? '揽收中'
                  : trackStageIdx === 1
                    ? '安检中'
                    : trackStageIdx === 2
                      ? '运输中'
                      : '即将降落';

              const showArrivedLayout = isArrived;

              return (
                <div key="tracking" className="ptp-view" style={{ background: '#d8edf7' }}>
                  {showArrivedLayout ? (
                    <div className="ptp-arrived-view">
                      <img
                        src={HYBRID_ASSETS.mapArrivedFull}
                        alt="航旅纵横已到达高德实景地图"
                        className={`ptp-arrived-full-bg${mapSatellite ? ' is-sat' : ''}`}
                      />
                      {/* Interactive Back & Layer Buttons on Full Arrived Map */}
                      <button
                        type="button"
                        aria-label="返回"
                        onClick={goBack}
                        style={{ position: 'absolute', left: 10, top: 44, width: 34, height: 34, zIndex: 12 }}
                      />
                      <button
                        type="button"
                        aria-label="切换地图图层"
                        onClick={() => {
                          setMapSatellite((v) => !v);
                          showToast(!mapSatellite ? '已切换卫星地形视图' : '已切回标准平面地图');
                        }}
                        style={{ position: 'absolute', right: 8, top: 48, width: 34, height: 42, zIndex: 12 }}
                      />
                      <button
                        type="button"
                        aria-label="目的机场信息"
                        onClick={() => showToast('北京大兴国际机场 · T2 活体宠物专用提取处（恒温 22℃）')}
                        style={{ position: 'absolute', left: '33%', top: 48, width: 88, height: 26, zIndex: 12 }}
                      />

                      <div className="ptp-arrived-overlay">
                        <div className="ptp-arrived-card">{trackingCardBody}</div>

                        <div className="ptp-arrived-celeb">
                          <img
                            src={HYBRID_ASSETS.arrivedDog}
                            alt="小航平安落地"
                            className="ptp-arrived-dog-pop"
                          />
                          <div className="ptp-arrived-dog-shadow" aria-hidden="true" />
                          <div className="ptp-arrived-copy">
                            <strong>{petName || '小航'} 已平安落地{toCity.name}！</strong>
                            <div className="ptp-arrived-km">
                              总计飞行 <span>1760</span> 公里
                            </div>
                            <div className="ptp-arrived-sub">快给朋友们报个平安吧</div>
                          </div>
                          <button
                            type="button"
                            className="ptp-btn-green-full ptp-arrived-cta"
                            onClick={() => setModal('poster')}
                          >
                            <span>生成专属接机海报</span>
                            <CameraSvg />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="ptp-fly-view">
                      <img
                        src={HYBRID_ASSETS.mapFlyFull}
                        alt="航旅纵横高德实景航线图"
                        className={`ptp-arrived-full-bg${mapSatellite ? ' is-sat' : ''}`}
                      />
                      {/* Unified plain map status title (NO box/border — 1:1 with Figma 运输中 / 已到达) */}
                      <div className="ptp-map-stage-title">{mapStatusText}</div>
                      {/* Interactive Back Button */}
                      <button
                        type="button"
                        aria-label="返回"
                        onClick={goBack}
                        style={{ position: 'absolute', left: 10, top: 44, width: 34, height: 34, zIndex: 12 }}
                      />
                      {/* Interactive Map Layer (平面) */}
                      <button
                        type="button"
                        aria-label="切换地图图层"
                        onClick={() => {
                          setMapSatellite((v) => !v);
                          showToast(!mapSatellite ? '已切换卫星地形视图' : '已切回标准平面地图');
                        }}
                        style={{ position: 'absolute', right: 8, top: 48, width: 34, height: 42, zIndex: 12 }}
                      />
                      {/* Interactive Weather Toggle (天气) & Airport Pills + GPS */}
                      <button
                        type="button"
                        aria-label="航路天气"
                        onClick={() => setShowWeatherCard((v) => !v)}
                        style={{ position: 'absolute', right: 8, top: 92, width: 34, height: 38, zIndex: 12 }}
                      />
                      <button
                        type="button"
                        aria-label="目的机场信息"
                        onClick={() => showToast('北京大兴国际机场 · T2 活体宠物专用提取处（恒温 22℃）')}
                        style={{ position: 'absolute', left: '33%', top: 48, width: 88, height: 26, zIndex: 12 }}
                      />
                      <button
                        type="button"
                        aria-label="出发机场信息"
                        onClick={() => showToast('上海虹桥货运站 · 活体专用通道已完成交接')}
                        style={{ position: 'absolute', left: '62%', top: 304, width: 84, height: 28, zIndex: 12 }}
                      />
                      <button
                        type="button"
                        aria-label="重新定位"
                        onClick={() => showToast(`已定位至「${petName || '小航'}」当前航迹：高度 10,600m`)}
                        style={{ position: 'absolute', right: 8, top: 304, width: 32, height: 32, zIndex: 12 }}
                      />
                      {showWeatherCard && (
                        <div className="ptp-map-weather-card" onClick={() => setShowWeatherCard(false)}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginBottom: 3 }}>
                            <span>航路实时天气 · 适宜飞行</span>
                            <span style={{ color: '#249b59' }}>关闭 ×</span>
                          </div>
                          <div>出发：上海虹桥 晴 21℃ · 东南风 2 级</div>
                          <div>抵达：北京大兴 多云 19℃ · 有氧舱恒温 22℃</div>
                        </div>
                      )}

                      <div className="ptp-fly-overlay">
                        <div className="ptp-track-sheet">
                          {trackingCardBody}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="ptp-home-bar" />
                </div>
              );
            })()}

            {/* ════════════ REAL INTERACTIVE HALF-SHEET MODALS ════════════ */}

            {(modal === 'cityFrom' || modal === 'cityTo') && (
              <div className="ptp-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" style={sheetSwipeStyle} {...sheetSwipeHandlers} onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-grab" onClick={() => setModal(null)} />
                  <div className="ptp-sheet-hd">
                    <span>选择{modal === 'cityFrom' ? '出发' : '到达'}城市</span>
                    <button type="button" style={{ fontSize: 12.5, color: '#7d8c84' }} onClick={() => setModal(null)}>关闭</button>
                  </div>
                  <div className="ptp-sheet-body">
                    {CITIES.map((c, idx) => (
                      <button
                        key={c.code}
                        type="button"
                        style={{ width: '100%', padding: '11px 4px', borderBottom: '1px solid #f1f4f2', display: 'flex', justifyContent: 'space-between', textAlign: 'left' }}
                        onClick={() => {
                          if (modal === 'cityFrom') { if (idx === toIdx) setToIdx(fromIdx); setFromIdx(idx); }
                          else { if (idx === fromIdx) setFromIdx(toIdx); setToIdx(idx); }
                          setModal(null);
                        }}
                      >
                        <div>
                          <strong style={{ display: 'block', fontSize: 13.5 }}>{c.name} ({c.code})</strong>
                          <span style={{ fontSize: 11, color: '#8a9991' }}>{c.cargoA}</span>
                        </div>
                        <span style={{ color: '#249b59', fontWeight: 700 }}>{(modal === 'cityFrom' ? fromIdx : toIdx) === idx ? '✓' : ''}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {modal === 'breed' && (
              <div className="ptp-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" style={sheetSwipeStyle} {...sheetSwipeHandlers} onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-grab" onClick={() => setModal(null)} />
                  <div className="ptp-sheet-hd">
                    <button type="button" style={{ fontSize: 12.5, color: '#84938b' }} onClick={() => setModal(null)}>取消</button>
                    <span>选择品种</span>
                    <button type="button" style={{ fontSize: 12.5, color: '#249b59' }} onClick={() => setModal(null)}>确定</button>
                  </div>
                  <div style={{ position: 'relative', marginBottom: 10 }}>
                    <input
                      value={breedSearch}
                      onChange={(e) => { setBreedSearch(e.target.value); if (!e.target.value.trim()) setBreedAlert(null); }}
                      placeholder="搜索品种..."
                      style={{ width: '100%', height: 35, borderRadius: 10, border: 'none', background: '#f2f4f7', padding: '0 34px 0 12px', fontSize: 12.5, outline: 'none' }}
                    />
                    {breedSearch ? (
                      <button
                        type="button"
                        aria-label="清空搜索"
                        onClick={() => { setBreedSearch(''); setBreedAlert(null); }}
                        style={{ position: 'absolute', right: 9, top: '50%', transform: 'translateY(-50%)', display: 'flex', padding: 2 }}
                      >
                        <CloseCircleSvg />
                      </button>
                    ) : (
                      <span style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex' }}>
                        <SearchIconSvg />
                      </span>
                    )}
                  </div>
                  {!breedSearch && (
                    <div style={{ display: 'flex', gap: 18, borderBottom: '1px solid #eff2f0', marginBottom: 6 }}>
                      {[{ id: 'dog', label: '犬类' }, { id: 'cat', label: '猫类' }, { id: 'other', label: '其他' }].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          style={{
                            paddingBottom: 7,
                            fontSize: 13,
                            fontWeight: breedTab === t.id ? 700 : 500,
                            color: breedTab === t.id ? '#249b59' : '#7d8c84',
                            borderBottom: breedTab === t.id ? '2px solid #249b59' : '2px solid transparent',
                          }}
                          onClick={() => { setBreedTab(t.id); setBreedAlert(null); }}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  )}
                  {breedAlert && <div className="ptp-err-strip">民航禁飞拦截：{breedAlert}</div>}
                  <div className="ptp-sheet-body">
                    {visibleBreeds.length === 0 ? (
                      <div style={{ padding: '26px 8px', textAlign: 'center', fontSize: 12, color: '#8a9991' }}>
                        未找到匹配「{breedSearch}」的品种
                      </div>
                    ) : visibleBreeds.map((b) => (
                      <button
                        key={b.name}
                        type="button"
                        style={{ width: '100%', padding: '10px 4px', borderBottom: '1px solid #f2f5f3', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}
                        onClick={() => {
                          if (b.banned) { setBreedAlert(`${b.name} — ${b.banReason}`); return; }
                          setBreed(b.name);
                          setBreedTouched(true);
                          setBreedAlert(null);
                          setModal(null);
                        }}
                      >
                        <div>
                          <strong style={{ display: 'block', fontSize: 13.5, color: b.banned ? '#d6453f' : breed === b.name ? '#249b59' : '#16221c' }}>{b.name}</strong>
                          <span style={{ fontSize: 10.5, color: '#8a9991' }}>{b.sub}</span>
                        </div>
                        {b.banned ? (
                          <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: '#ffe9e8', color: '#df4b44', fontWeight: 700 }}>禁飞</span>
                        ) : breed === b.name ? (
                          <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#33b96e', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CheckMiniSvg color="#ffffff" size={11} strokeWidth={2.2} />
                          </span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {modal === 'weight' && (() => {
              const draftCrate = draftWeightKg <= 6 ? 1 : draftWeightKg <= 15 ? 2 : 3;
              const commitWeight = () => {
                setWeightKg(draftWeightKg);
                setCrateOverride(null);
                setModal(null);
              };
              return (
                <div className="ptp-mask" onClick={() => setModal(null)}>
                  <div className="ptp-sheet" style={sheetSwipeStyle} {...sheetSwipeHandlers} onClick={(e) => e.stopPropagation()}>
                    <div className="ptp-sheet-grab" onClick={() => setModal(null)} />
                    <div className="ptp-sheet-hd">
                      <button type="button" style={{ fontSize: 12.5, color: '#84938b' }} onClick={() => setModal(null)}>取消</button>
                      <span>设置宠物体重</span>
                      <button type="button" style={{ fontSize: 12.5, color: '#249b59' }} onClick={commitWeight}>确定</button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, padding: '16px 0 20px' }}>
                      <button
                        type="button"
                        style={{ width: 38, height: 38, borderRadius: 10, background: '#eef7f2', color: '#218e52', fontSize: 20, fontWeight: 700 }}
                        onClick={() => setDraftWeightKg((w) => Math.max(1.5, Number((w - 1).toFixed(1))))}
                      >−</button>
                      <div style={{ textAlign: 'center', minWidth: 96 }}>
                        <strong style={{ fontSize: 24, fontVariantNumeric: 'tabular-nums', color: '#16221c' }}>{draftWeightKg} kg</strong>
                        <div style={{ fontSize: 11, color: '#249b59', marginTop: 2 }}>自动匹配 {draftCrate}号箱</div>
                      </div>
                      <button
                        type="button"
                        style={{ width: 38, height: 38, borderRadius: 10, background: '#eef7f2', color: '#218e52', fontSize: 20, fontWeight: 700 }}
                        onClick={() => setDraftWeightKg((w) => Math.min(30, Number((w + 1).toFixed(1))))}
                      >+</button>
                    </div>
                    <button type="button" className="ptp-btn-green-full" style={{ borderRadius: 12 }} onClick={commitWeight}>确认体重</button>
                  </div>
                </div>
              );
            })()}

            {modal === 'age' && (
              <div className="ptp-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" style={sheetSwipeStyle} {...sheetSwipeHandlers} onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-grab" onClick={() => setModal(null)} />
                  <div className="ptp-sheet-hd">
                    <button type="button" style={{ fontSize: 12.5, color: '#84938b' }} onClick={() => setModal(null)}>取消</button>
                    <span>选择宠物年龄</span>
                    <span style={{ width: 28 }} />
                  </div>
                  <div style={{ position: 'relative', marginBottom: 14 }}>
                    <div className="ptp-sheet-body" style={{ maxHeight: 174, padding: '8px 0' }}>
                      {AGE_OPTIONS.map((o) => {
                        const active = draftAgeObj.label === o.label;
                        return (
                          <button
                            key={o.label}
                            type="button"
                            style={{
                              width: '100%',
                              padding: active ? '11px 0' : '8px 0',
                              borderRadius: 10,
                              background: active ? '#f3f5f8' : 'transparent',
                              fontSize: active ? 18 : 14,
                              fontWeight: active ? 700 : 500,
                              color: active && !o.eligible ? '#d6453f' : active ? '#16221c' : '#a4aeb5',
                            }}
                            onClick={() => setDraftAgeObj(o)}
                          >
                            {o.label}
                          </button>
                        );
                      })}
                    </div>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 22, background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0) 100%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 22, background: 'linear-gradient(0deg, #ffffff 0%, rgba(255,255,255,0) 100%)', pointerEvents: 'none' }} />
                  </div>
                  <div style={{ borderRadius: 11, padding: '11px 12px', background: draftAgeObj.eligible ? '#f8faf9' : '#fff4f3', border: `1px solid ${draftAgeObj.eligible ? '#e6ece9' : '#f7d5d2'}`, fontSize: 11, lineHeight: 1.58, color: '#7b8781' }}>
                    <strong style={{ display: 'block', fontSize: 12, marginBottom: 4, color: draftAgeObj.eligible ? '#26a95f' : '#d6453f' }}>
                      ● {draftAgeObj.eligible ? '年龄符合客舱同行要求' : '超出航空适航年龄限制'}
                    </strong>
                    {draftAgeObj.note}
                  </div>
                  <button type="button" className="ptp-btn-green-full" style={{ marginTop: 14, borderRadius: 12 }} onClick={() => { setAgeObj(draftAgeObj); setModal(null); }}>确认选择</button>
                </div>
              </div>
            )}

            {(modal === 'addrSend' || modal === 'addrRecv') && (
              <div className="ptp-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" style={sheetSwipeStyle} {...sheetSwipeHandlers} onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-grab" onClick={() => setModal(null)} />
                  <div className="ptp-sheet-hd">
                    <button type="button" style={{ fontSize: 12.5, color: '#84938b' }} onClick={() => setModal(null)}>取消</button>
                    <span>{modal === 'addrSend' ? '选择发件地址' : '选择收货地址'}</span>
                    <span style={{ width: 28 }} />
                  </div>
                  <div className="ptp-sheet-body" style={{ marginBottom: 12 }}>
                    {SAVED_ADDRESSES.map((a) => {
                      const active = (modal === 'addrSend' ? senderAddr.id : receiverAddr.id) === a.id;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          className={`ptp-addon${active ? ' is-active' : ''}`}
                          onClick={() => { if (modal === 'addrSend') setSenderAddr(a); else setReceiverAddr(a); setModal(null); }}
                        >
                          <span
                            style={{
                              width: 15,
                              height: 15,
                              borderRadius: '50%',
                              marginTop: 2,
                              flexShrink: 0,
                              border: active ? '2px solid #2eb66b' : '1.5px solid #cbd4cf',
                              background: '#ffffff',
                            }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 700 }}>{a.name} <span style={{ fontWeight: 400, color: '#7d8c84', marginLeft: 4 }}>{a.phone}</span></div>
                            <div style={{ fontSize: 11, color: '#6b7b72', marginTop: 4 }}>
                              <span style={{ padding: '1px 6px', borderRadius: 4, marginRight: 6, fontSize: 10, background: a.tagType === 'blue' ? '#eaf2ff' : '#e7f8ef', color: a.tagType === 'blue' ? '#2563eb' : '#249b59', fontWeight: 600 }}>{a.tag}</span>
                              {a.detail}
                            </div>
                          </div>
                          <span style={{ fontSize: 11, color: '#9aa8a0', alignSelf: 'center', flexShrink: 0 }}>编辑</span>
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      style={{ width: '100%', height: 40, borderRadius: 11, border: '1px solid #e5eae7', background: '#ffffff', fontSize: 12, color: '#5c6b63', fontWeight: 600, marginTop: 2 }}
                      onClick={() => showToast('演示模式：已支持快速切换预置地址')}
                    >
                      {modal === 'addrSend' ? '+ 新增发件地址' : '+ 新增收货地址'}
                    </button>
                  </div>
                  <button type="button" className="ptp-btn-green-full" style={{ borderRadius: 12 }} onClick={() => setModal(null)}>确认选择</button>
                </div>
              </div>
            )}

            {modal === 'slot' && (
              <div className="ptp-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" style={sheetSwipeStyle} {...sheetSwipeHandlers} onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-grab" onClick={() => setModal(null)} />
                  <div className="ptp-sheet-hd">
                    <span>选择上门揽收时段</span>
                    <button type="button" style={{ fontSize: 12.5, color: '#84938b' }} onClick={() => setModal(null)}>关闭</button>
                  </div>
                  {dynamicPickupSlots.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`ptp-addon${pickupSlot === s ? ' is-active' : ''}`}
                      onClick={() => { setPickupSlot(s); setModal(null); showToast('已选择上门揽收时段'); }}
                    >
                      <span className={`ptp-chk${pickupSlot === s ? ' is-on' : ''}`} style={{ borderRadius: '50%' }}>
                        {pickupSlot === s ? <CheckMiniSvg color="#ffffff" size={10} strokeWidth={2.2} /> : null}
                      </span>
                      <span style={{ fontSize: 12.5, fontWeight: 600 }}>{s}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {modal === 'ocr' && (
              <div className="ptp-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" style={sheetSwipeStyle} {...sheetSwipeHandlers} onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-grab" onClick={() => setModal(null)} />
                  <div className="ptp-sheet-hd">
                    <span>动物检疫合格证 · OCR 自动提取</span>
                    <button type="button" style={{ fontSize: 12.5, color: '#249b59' }} onClick={() => setModal(null)}>完成</button>
                  </div>
                  <div className="ptp-alert is-green" style={{ marginBottom: 10 }}>
                    <AlertCircleSvg bg="#2eb66b" type="info" />
                    <div>
                      <strong>OCR 识别置信度 99.4% · 有效期核验通过</strong>
                      自动提取检疫证编号并与航司货运预审同步，免去手动输入 18 位长编码。
                    </div>
                  </div>
                  <div className="ptp-fee-row"><span>检疫证编号</span><strong>NO.31010420260519088</strong></div>
                  <div className="ptp-fee-row"><span>动物品种</span><strong>{breedCategoryLabel}（{breed}）</strong></div>
                  <div className="ptp-fee-row"><span>有效期至</span><strong className="is-free">2026-05-23（有效）</strong></div>
                </div>
              </div>
            )}

            {modal === 'price' && (
              <div className="ptp-mask" onClick={() => setModal(null)}>
                <div className="ptp-price-sheet" style={sheetSwipeStyle} {...sheetSwipeHandlers} onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-grab" style={{ background: '#dce4ec', width: 36, marginBottom: 10 }} onClick={() => setModal(null)} />
                  <div className="ptp-price-title">价格明细</div>
                  {screen === 'tracking' ? (
                    <>
                      <div className="ptp-price-row">
                        <span>运输费 · MU5103</span>
                        <span className="ptp-dots" />
                        <span className="ptp-pv">¥ 580</span>
                      </div>
                      <div className="ptp-price-row is-sub">
                        <span>货舱位 + 燃油</span>
                        <span style={{ flex: 1 }} />
                        <span className="ptp-pv">¥ 520</span>
                      </div>
                      <div className="ptp-price-row is-sub">
                        <span>机场操作费</span>
                        <span style={{ flex: 1 }} />
                        <span className="ptp-pv">¥ 60</span>
                      </div>
                      <div className="ptp-price-row" style={{ marginTop: 6 }}>
                        <span>增值服务（3 项）</span>
                        <span className="ptp-dots" />
                        <span className="ptp-pv">¥ 88</span>
                      </div>
                      <div className="ptp-price-row">
                        <span>保险 · 含 ¥20,000 基础</span>
                        <span className="ptp-dots" />
                        <span className="ptp-pv">¥ 20</span>
                      </div>
                      <div className="ptp-price-row">
                        <span>航旅会员折扣</span>
                        <span className="ptp-dots" />
                        <span className="ptp-pv is-disc">- ¥ 20</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="ptp-price-row">
                        <span>运输费 · {selectedFlight.code}</span>
                        <span className="ptp-dots" />
                        <span className="ptp-pv">¥ {selectedFlight.price}</span>
                      </div>
                      {selectedFlight.breakdown.map((b) => (
                        <div key={b.label} className="ptp-price-row is-sub">
                          <span>{b.label}</span>
                          <span style={{ flex: 1 }} />
                          <span className="ptp-pv">{b.price}</span>
                        </div>
                      ))}
                      {addonInsurance && (
                        <div className="ptp-price-row" style={{ marginTop: 6 }}>
                          <span>宠运无忧综合险</span>
                          <span className="ptp-dots" />
                          <span className="ptp-pv">¥ 19</span>
                        </div>
                      )}
                      {addonValuation && (
                        <div className="ptp-price-row">
                          <span>全额保价服务</span>
                          <span className="ptp-dots" />
                          <span className="ptp-pv">¥ 40</span>
                        </div>
                      )}
                      <div className="ptp-price-row" style={{ marginTop: 8, paddingTop: 10, borderTop: '1px solid #eef1f3', fontWeight: 600 }}>
                        <span>订单预估合计</span>
                        <span style={{ flex: 1 }} />
                        <span className="ptp-pv ptp-din-med" style={{ color: '#e4554b', fontSize: 15 }}>¥ {totalPrice}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {modal === 'timeline' && (
              <div className="ptp-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" style={{ minHeight: '76%', maxHeight: '84%', padding: '12px 20px 26px', ...sheetSwipeStyle }} {...sheetSwipeHandlers} onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-grab" style={{ background: '#dbe2ea', width: 38 }} onClick={() => setModal(null)} />
                  <div className="ptp-sheet-hd" style={{ marginBottom: 14 }}>
                    <span>全流程追踪</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 14px', borderRadius: 12, background: '#f6f8fa', marginBottom: 18 }}>
                    <img src={HYBRID_ASSETS.petAvatar} alt="小航" style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #d5e5dc' }} />
                    <div>
                      <strong style={{ fontSize: 14, color: '#17231d' }}>{petName || '小航'} · {breedTouched ? breed : '中华田园犬'}</strong>
                      <div style={{ fontSize: 10.5, color: '#8a9991', marginTop: 2 }}>订单号：PT-20250519001</div>
                    </div>
                  </div>
                  <div className="ptp-sheet-body">
                    {FULL_TIMELINE_LOGS.filter((l) => l.minStage <= trackStageIdx).map((log, i, arr) => (
                      <div key={log.time} style={{ display: 'grid', gridTemplateColumns: '18px 1fr', gap: 11, paddingBottom: i === arr.length - 1 ? 6 : 16 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <span
                            style={{
                              width: i === 0 ? 10 : 8,
                              height: i === 0 ? 10 : 8,
                              borderRadius: '50%',
                              marginTop: 4,
                              background: i === 0 ? '#2eb66b' : '#cfd7df',
                              boxShadow: i === 0 ? '0 0 0 4px rgba(46, 182, 107, 0.22)' : 'none',
                            }}
                          />
                          {i < arr.length - 1 && (
                            <span
                              style={{
                                flex: 1,
                                width: 1.5,
                                marginTop: 5,
                                background: i === 0 ? 'linear-gradient(180deg, #3ec077 0%, #e5ece8 100%)' : '#edf1f4',
                              }}
                            />
                          )}
                        </div>
                        <div>
                          <div style={{ fontSize: 11.5, color: i === 0 ? '#249b59' : '#96a1a8', fontWeight: i === 0 ? 600 : 400 }}>{log.time}</div>
                          <div style={{ fontSize: 13.5, fontWeight: 700, color: '#17231d', margin: '3px 0 4px' }}>{log.title}</div>
                          <div style={{ fontSize: 11.5, color: '#617068', lineHeight: 1.6 }}>{log.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ══ 08: PEAK-END SHARE POSTER (1:1 Seamless Full Poster BG + True Transparent Ticket Notches + Alimama ShuHeiTi) ══ */}
            {modal === 'poster' && (
              <div className="ptp-mask" onClick={() => setModal(null)}>
                <div style={{ padding: '0 24px 18px', marginTop: 'auto' }} onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-poster-card">
                    <img src={HYBRID_ASSETS.posterBgFull} alt="全程实时看得见 安心宠物托运" className="ptp-poster-bg-img" />
                    <div className="ptp-poster-ticket">
                      {/* Soft pastel globe & ribbon watercolor watermark (1:1 page_021 top-right corner) */}
                      <svg className="ptp-poster-wm" viewBox="0 0 120 110" fill="none" aria-hidden="true">
                        <defs>
                          <linearGradient id="ptpWmGlobe" x1="20" y1="10" x2="105" y2="95" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#d9ecff" />
                            <stop offset="55%" stopColor="#e8f5ff" />
                            <stop offset="100%" stopColor="#d2f4e2" />
                          </linearGradient>
                          <linearGradient id="ptpWmRibbon" x1="16" y1="78" x2="108" y2="18" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#fde0b8" />
                            <stop offset="55%" stopColor="#fff0cc" />
                            <stop offset="100%" stopColor="#f9d29d" />
                          </linearGradient>
                        </defs>
                        <circle cx="72" cy="54" r="44" fill="url(#ptpWmGlobe)" />
                        <path d="M52 24C64 20 82 26 90 38C95 46 86 58 76 62C66 66 56 58 50 48C45 40 44 27 52 24Z" fill="#d9f4d8" />
                        <path d="M68 68C78 65 92 70 96 80C86 92 66 96 54 88C54 78 60 70 68 68Z" fill="#d3f2df" />
                        <path d="M22 86C42 74 68 46 106 16" stroke="url(#ptpWmRibbon)" strokeWidth="10" strokeLinecap="round" opacity="0.85" />
                      </svg>

                      <div className="ptp-poster-top-area">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div className="ptp-poster-avatar-wrap">
                            <svg width="54" height="54" viewBox="0 0 64 64" fill="none" style={{ position: 'absolute', inset: 0 }}>
                              <path d="M32 2C35.2 2 37.2 5.4 40.2 6.2C43.2 7 46.8 5.2 49.4 7.2C52 9.2 51.6 13.2 53.6 15.6C55.6 18 59.6 18.6 60.4 21.6C61.2 24.6 58.6 27.6 58.6 30.8C58.6 34 61.2 37 60.4 40C59.6 43 55.6 43.6 53.6 46C51.6 48.4 52 52.4 49.4 54.4C46.8 56.4 43.2 54.6 40.2 55.4C37.2 56.2 35.2 59.6 32 59.6C28.8 59.6 26.8 56.2 23.8 55.4C20.8 54.6 17.2 56.4 14.6 54.4C12 52.4 12.4 48.4 10.4 46C8.4 43.6 4.4 43 3.6 40C2.8 37 5.4 34 5.4 30.8C5.4 27.6 2.8 24.6 3.6 21.6C4.4 18.6 8.4 18 10.4 15.6C12.4 13.2 12 9.2 14.6 7.2C17.2 5.2 20.8 7 23.8 6.2C26.8 5.4 28.8 2 32 2Z" fill="#aef2c6" />
                            </svg>
                            <img src={HYBRID_ASSETS.petAvatar} alt="小航" />
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div className="ptp-poster-headline">
                              {petName || '小航'}{' '}
                              <span className="ptp-poster-brush-wrap">
                                平安落地{toCity.name}！
                                <svg className="ptp-poster-brush-svg" viewBox="0 0 130 22" preserveAspectRatio="none" fill="none">
                                  <defs>
                                    <linearGradient id="ptpBrushGrad" x1="0" y1="10" x2="130" y2="10" gradientUnits="userSpaceOnUse">
                                      <stop offset="0%" stopColor="#9bf5bd" />
                                      <stop offset="55%" stopColor="#a0f6d8" />
                                      <stop offset="100%" stopColor="#a2f3f0" />
                                    </linearGradient>
                                  </defs>
                                  <path
                                    d="M4 13.5 C26 7.5, 48 5.2, 68 5.8 L44 15.8 C64 11.2, 86 11.0, 108 13.2"
                                    stroke="url(#ptpBrushGrad)"
                                    strokeWidth="5.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </div>
                            <div className="ptp-poster-stats">
                              <span className="ptp-poster-stat-num">1760</span> 公里&nbsp;
                              <span className="ptp-poster-stat-num">2</span> 小时
                              <span className="ptp-poster-stat-num"> 40</span> 分 的奔赴
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 4, padding: '0 2px' }}>
                          <div>
                            <div className="ptp-poster-time">18:40</div>
                            <div style={{ fontSize: 10.5, color: '#4f5d56', marginTop: 2 }}>{fromCity.code === 'SHA' ? '虹桥机场' : fromCity.cargoA.replace('货运站', '')}</div>
                          </div>
                          <div className="ptp-poster-arc-wrap">
                            <svg className="ptp-poster-arc-svg" viewBox="0 0 132 34" fill="none" aria-hidden="true">
                              <circle cx="8" cy="21" r="1.7" fill="#bce8cf" />
                              <circle cx="19" cy="17.2" r="1.7" fill="#bce8cf" />
                              <circle cx="31" cy="14.4" r="1.7" fill="#bce8cf" />
                              <circle cx="43" cy="12.6" r="1.7" fill="#bce8cf" />
                              <circle cx="89" cy="12.6" r="1.7" fill="#bce8cf" />
                              <circle cx="101" cy="14.4" r="1.7" fill="#bce8cf" />
                              <circle cx="113" cy="17.2" r="1.7" fill="#bce8cf" />
                              <circle cx="124" cy="21" r="1.7" fill="#bce8cf" />
                            </svg>
                            <img src={HYBRID_ASSETS.posterPlane} alt="" className="ptp-poster-plane-img" />
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div className="ptp-poster-time">20:40</div>
                            <div style={{ fontSize: 10.5, color: '#4f5d56', marginTop: 2 }}>{toCity.code === 'BJS' ? '大兴机场' : toCity.cargoA.replace('货运站', '')}</div>
                          </div>
                        </div>
                      </div>

                      <div className="ptp-poster-divider" />

                      <div className="ptp-poster-foot">
                        <div>
                          <div style={{ fontWeight: 500 }}>@TiceeZz</div>
                          <div style={{ marginTop: 2 }}>{dateStr.includes('21') ? '2026/05/21 周四' : '2026/05/20 周三'}</div>
                        </div>
                        <img src={HYBRID_ASSETS.posterQr} alt="航旅纵横小程序码" style={{ width: 42, height: 42, mixBlendMode: 'multiply' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ptp-sheet" style={{ paddingTop: 14, ...sheetSwipeStyle }} {...sheetSwipeHandlers} onClick={(e) => e.stopPropagation()}>
                  <div style={{ textAlign: 'center', fontSize: 14.5, fontWeight: 700, color: '#162238', marginBottom: 10 }}>分享至</div>
                  <div style={{ position: 'relative' }}>
                    <img src={HYBRID_ASSETS.shareBar} alt="微信 朋友圈 QQ 保存图片" style={{ display: 'block', width: '100%', height: 'auto', mixBlendMode: 'multiply' }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                      {['微信', '朋友圈', 'QQ', '保存图片'].map((ch) => (
                        <button
                          key={ch}
                          type="button"
                          aria-label={ch}
                          onClick={() => { showToast(`已生成「${petName || '小航'}平安落地」海报并触发${ch}`); setModal(null); }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            </div>
            </div>
          </div>

          <div className="ptp-phone-caption">
            <span className="ptp-caption-pulse" aria-hidden="true" />
            <span>
              可直接在机内点击与滑动
              <span className="ptp-desktop-only"> · 支持键盘 ← / → 切换页面</span>
            </span>
          </div>
        </div>

        {/* ════════════ RIGHT: EDITORIAL UX STORYBOARD & INTERACTION STUDIO ════════════ */}
        <aside className="ptp-director">
          {/* 1. Active Screen Editorial Brief */}
          <div className="ptp-dir-card ptp-dir-hero">
            <span className="ptp-dir-watermark" aria-hidden="true">{activeScene.step}</span>
            <div className="ptp-dir-kicker">
              <span className="ptp-dir-step">SCREEN {activeScene.step}</span>
              <span className="ptp-dir-tag">{activeScene.tag}</span>
            </div>
            <h2 className="ptp-dir-title">{activeScene.title}</h2>
            <p className="ptp-dir-insight">{activeScene.insight}</p>

            <div className="ptp-dir-mission">
              <span className="ptp-dir-mission-badge">体验提示</span>
              <span>{activeScene.tip}</span>
            </div>

            <div className="ptp-dir-actions">
              {screen === 'random' && (
                <>
                  <button type="button" className={`ptp-dir-btn${randomState === 'empty' ? ' is-primary' : ''}`} onClick={() => setRandomState('empty')}>态 1：无票空态</button>
                  <button type="button" className={`ptp-dir-btn${randomState === 'available' ? ' is-primary' : ''}`} onClick={() => setRandomState('available')}>态 2：名额充足</button>
                  <button type="button" className={`ptp-dir-btn${randomState === 'full' ? ' is-primary' : ''}`} onClick={() => setRandomState('full')}>态 3：名额已满兜底</button>
                </>
              )}

              {screen === 'soloSearch' && (
                <>
                  <button type="button" className="ptp-dir-btn" onClick={() => { setFromIdx(toIdx); setToIdx(fromIdx); setSwapCount((c) => c + 1); showToast('已互换出发与到达城市'); }}>互换起降城市</button>
                  <button
                    type="button"
                    className="ptp-dir-btn"
                    onClick={() => {
                      const idx = WEIGHT_OPTIONS.findIndex((w) => w.id === weightKey);
                      const next = WEIGHT_OPTIONS[(idx + 1) % WEIGHT_OPTIONS.length];
                      setWeightKey(next.id);
                      setWeightKg(next.sampleWeight);
                      setCrateOverride(null);
                      showToast(`已切换体重档位：${next.label}`);
                    }}
                  >
                    切换体重档位
                  </button>
                  <button type="button" className="ptp-dir-btn is-primary" onClick={() => navigate('flights')}>查询航线方案 →</button>
                </>
              )}

              {screen === 'flights' && (
                <>
                  <button type="button" className={`ptp-dir-btn${flightFilter === 'all' ? ' is-primary' : ''}`} onClick={() => setFlightFilter('all')}>全部航班</button>
                  <button type="button" className={`ptp-dir-btn${flightFilter === 'wide' ? ' is-primary' : ''}`} onClick={() => setFlightFilter('wide')}>仅看宽体机</button>
                  <button type="button" className={`ptp-dir-btn${flightFilter === 'ca' ? ' is-primary' : ''}`} onClick={() => setFlightFilter('ca')}>筛选中国国航</button>
                </>
              )}

              {screen === 'form' && (
                <>
                  <button type="button" className="ptp-dir-btn is-primary" onClick={handleAutoFill}>一键补全解锁提交</button>
                  <button
                    type="button"
                    className="ptp-dir-btn"
                    onClick={() => {
                      setBreedSearch('法斗');
                      setBreedAlert('法国斗牛犬 — 短鼻类犬高空易窒息，民航规定严格禁运');
                      setModal('breed');
                    }}
                  >
                    触发法斗禁飞拦截
                  </button>
                  <button
                    type="button"
                    className="ptp-dir-btn"
                    onClick={() => { setWeightKg(18.5); setCrateOverride(null); showToast('体重已调至 18.5kg，航空箱自动切换推荐 3号箱'); }}
                  >
                    调重 18.5kg 换 3号箱
                  </button>
                </>
              )}

              {screen === 'success' && (
                <>
                  <button type="button" className="ptp-dir-btn is-primary" onClick={() => navigate('tracking')}>查看实时飞行追踪 →</button>
                  <button type="button" className="ptp-dir-btn" onClick={() => navigate('orders')}>预览空订单态</button>
                </>
              )}

              {screen === 'orders' && (
                <>
                  <button type="button" className="ptp-dir-btn is-primary" onClick={() => navigate('success')}>返回提交成功态</button>
                  <button type="button" className="ptp-dir-btn" onClick={() => navigate('hub')}>返回服务大厅</button>
                </>
              )}

              {screen === 'tracking' && (
                <>
                  <button type="button" className={`ptp-dir-btn${trackStageIdx === 2 && !modal ? ' is-primary' : ''}`} onClick={() => { setModal(null); setTrackStageIdx(2); }}>高空飞行中</button>
                  <button type="button" className={`ptp-dir-btn${trackStageIdx === 4 && modal !== 'poster' ? ' is-primary' : ''}`} onClick={() => { setModal(null); setTrackStageIdx(4); }}>平安落地</button>
                  <button type="button" className={`ptp-dir-btn${modal === 'price' ? ' is-primary' : ''}`} onClick={() => setModal('price')}>价格明细</button>
                  <button type="button" className={`ptp-dir-btn${modal === 'timeline' ? ' is-primary' : ''}`} onClick={() => setModal('timeline')}>全流程抽屉</button>
                  <button type="button" className={`ptp-dir-btn${modal === 'poster' ? ' is-primary' : ''}`} onClick={() => { setTrackStageIdx(4); setModal('poster'); }}>接机海报</button>
                </>
              )}

              {(screen === 'splash' || screen === 'hub' || screen === 'detail') && (
                <button type="button" className="ptp-dir-btn is-primary" onClick={() => stepScene(1)}>
                  进入下一屏演示 →
                </button>
              )}
            </div>
          </div>

          {/* 2. Live Prototype State Telemetry */}
          <div className="ptp-telemetry" aria-label="原型实时状态联动面板">
            <div className="ptp-tele-cell">
              <span>ROUTE</span>
              <strong>{fromCity.name} → {toCity.name}</strong>
            </div>
            <div className="ptp-tele-cell">
              <span>PET PROFILE</span>
              <strong>{petName || '小航'} · {screen === 'tracking' && !breedTouched ? '中华田园犬' : breed}</strong>
            </div>
            <div className="ptp-tele-cell">
              <span>SMART CRATE</span>
              <strong>{weightKg}kg → {activeCrate}号箱</strong>
            </div>
            <div className="ptp-tele-cell">
              <span>ESTIMATE</span>
              <strong>¥{totalPrice}</strong>
            </div>
          </div>

          {/* 3. 4-Phase Editorial UX Journey Storyboard */}
          <div className="ptp-dir-card ptp-journey-card">
            <div className="ptp-storyboard-head">
              <span>流程索引 · 10 SCREENS</span>
              <span>点击切换对应页面</span>
            </div>
            <div className="ptp-phase-list">
              {journeyPhases.map((phase) => (
                <div key={phase.key} className="ptp-phase-group">
                  <div className="ptp-phase-title">{phase.label}</div>
                  <div className="ptp-phase-grid">
                    {phase.ids.map((id) => {
                      const s = SCENES.find((item) => item.id === id);
                      if (!s) return null;
                      const isActive = activeSceneId === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          className={`ptp-scene-btn${isActive ? ' is-active' : ''}`}
                          onClick={() => navigate(s.id)}
                        >
                          <em>{s.step}</em>
                          <strong>{s.short}</strong>
                          {isActive && <span className="ptp-scene-dot" aria-hidden="true" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
