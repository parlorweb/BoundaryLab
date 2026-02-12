
import React from 'react';
import { ArrowLeft, Calculator, BookOpen, AlertCircle, CheckCircle2, Terminal } from 'lucide-react';

export type TutorialTopic = 'compass-rule' | 'azimuth-bearing' | 'lat-dep' | 'relative-error' | 'level-loop' | 'law-sines';

interface TutorialPageProps {
  onBack: () => void;
  topic: TutorialTopic;
}

export const TutorialPage: React.FC<TutorialPageProps> = ({ onBack, topic }) => {
  const renderCompassRule = () => (
    <>
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
          <Calculator size={14} strokeWidth={3} />
          <span className="text-[10px] font-black uppercase tracking-widest">HP-35s Mastery Series</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Mastering the Compass Rule Adjustment
        </h1>
      </header>
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs">01</span>
          Why This Matters on the FS Exam
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed">
          Traverse closure is a fundamental competency on the FS exam. Candidates are frequently required to adjust a closed traverse to ensure mathematical consistency. The Compass Rule is the standard method used when errors in angles and distances are assumed to be equal in precision.
        </p>
      </section>
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs">02</span>
          The Core Concept Explained
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed">
          The Compass Rule (Bowditch Rule) distributes the linear error of closure (LEOC) among the individual courses. The correction is <strong>proportional</strong> to the length of the course relative to the total perimeter.
        </p>
      </section>
      <section className="mt-12 p-8 bg-slate-50 border border-slate-100 rounded-[32px] space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">The Formulas</h3>
        <div className="space-y-2 font-mono text-lg font-bold text-slate-800">
          <p>CorrLat = -(TotalLatError * CourseLength / TotalPerimeter)</p>
          <p>CorrDep = -(TotalDepError * CourseLength / TotalPerimeter)</p>
        </div>
      </section>
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs">
            <Terminal size={14} />
          </span>
          HP-35s Calculator Walkthrough
        </h2>
        <div className="bg-slate-900 rounded-[32px] p-8 md:p-10 text-white space-y-6 shadow-2xl">
          <div className="flex items-start gap-4"><div className="bg-slate-800 px-3 py-1 rounded-lg font-mono text-sm border border-slate-700">350</div><div className="text-slate-400 text-sm font-medium">Course Length</div></div>
          <div className="flex items-start gap-4"><div className="bg-blue-600 px-3 py-1 rounded-lg font-mono text-sm shadow-lg">ENTER</div><div className="text-slate-400 text-sm font-medium">Stack</div></div>
          <div className="flex items-start gap-4"><div className="bg-slate-800 px-3 py-1 rounded-lg font-mono text-sm border border-slate-700">1250</div><div className="text-slate-400 text-sm font-medium">Perimeter</div></div>
          <div className="flex items-start gap-4"><div className="bg-indigo-600 px-3 py-1 rounded-lg font-mono text-sm">÷</div><div className="text-slate-400 text-sm font-medium">Factor</div></div>
          <div className="flex items-start gap-4"><div className="bg-blue-600 px-3 py-1 rounded-lg font-mono text-sm">ENTER</div><div className="text-slate-400 text-sm font-medium">Save Factor</div></div>
          <div className="flex items-start gap-4"><div className="bg-slate-800 px-3 py-1 rounded-lg font-mono text-sm border border-slate-700">.12</div><div className="text-slate-400 text-sm font-medium">Lat Error</div></div>
          <div className="flex items-start gap-4"><div className="bg-indigo-600 px-3 py-1 rounded-lg font-mono text-sm">×</div><div className="text-slate-400 text-sm font-medium">Multiply</div></div>
          <div className="flex items-start gap-4"><div className="bg-orange-600 px-3 py-1 rounded-lg font-mono text-sm">+/-</div><div className="text-white text-sm font-black">Result: -0.0336</div></div>
        </div>
      </section>
    </>
  );

  const renderAzimuthBearing = () => (
    <>
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
          <Calculator size={14} strokeWidth={3} />
          <span className="text-[10px] font-black uppercase tracking-widest">HP-35s Mastery Series</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Azimuth to Bearing Conversion
        </h1>
      </header>
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs">01</span>
          Why This Matters on the FS Exam
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed">
          The FS exam often provides data in azimuths but expects final answers or boundary descriptions in bearings. Mistaking the quadrant is the most frequent source of points lost on simple geometry problems.
        </p>
      </section>
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs">02</span>
          The Core Concept Explained
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed">
          Azimuths are measured 0-360° clockwise from North. Bearings are measured 0-90° from North or South, toward East or West.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="font-bold text-slate-900">NE (0-90°)</p>
            <p className="text-sm text-slate-500">Bearing = Azimuth</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="font-bold text-slate-900">SE (90-180°)</p>
            <p className="text-sm text-slate-500">Bearing = 180° - Azimuth</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="font-bold text-slate-900">SW (180-270°)</p>
            <p className="text-sm text-slate-500">Bearing = Azimuth - 180°</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="font-bold text-slate-900">NW (270-360°)</p>
            <p className="text-sm text-slate-500">Bearing = 360° - Azimuth</p>
          </div>
        </div>
      </section>
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs">
            <Terminal size={14} />
          </span>
          HP-35s Walkthrough (Example: 215.5°)
        </h2>
        <div className="bg-slate-900 rounded-[32px] p-8 md:p-10 text-white space-y-6 shadow-2xl">
          <div className="flex items-start gap-4"><div className="bg-slate-800 px-3 py-1 rounded-lg font-mono text-sm border border-slate-700">215.5</div><div className="text-slate-400 text-sm font-medium">Input Azimuth</div></div>
          <div className="flex items-start gap-4"><div className="bg-blue-600 px-3 py-1 rounded-lg font-mono text-sm shadow-lg">ENTER</div><div className="text-slate-400 text-sm font-medium">Push to stack</div></div>
          <div className="flex items-start gap-4"><div className="bg-slate-800 px-3 py-1 rounded-lg font-mono text-sm border border-slate-700">180</div><div className="text-slate-400 text-sm font-medium">Quadrant Constant (SW)</div></div>
          <div className="flex items-start gap-4"><div className="bg-indigo-600 px-3 py-1 rounded-lg font-mono text-sm">-</div><div className="text-slate-400 text-sm font-medium">Subtract</div></div>
          <div className="flex items-start gap-4"><div className="bg-emerald-600 px-3 py-1 rounded-lg font-mono text-sm">SHOW</div><div className="text-white text-sm font-black">Result: 35.5 (S 35.5 W)</div></div>
        </div>
      </section>
    </>
  );

  const renderLatDep = () => (
    <>
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
          <Calculator size={14} strokeWidth={3} />
          <span className="text-[10px] font-black uppercase tracking-widest">HP-35s Mastery Series</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Latitude and Departure
        </h1>
      </header>
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs">01</span>
          The Surveying Logic
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed">
          Latitudes and Departures are the rectangular components (ΔN, ΔE) of a polar vector (Distance, Bearing). On the HP-35s, we solve these using direct trigonometry for maximum precision and clarity.
        </p>
      </section>
      <section className="mt-12 p-8 bg-slate-50 border border-slate-100 rounded-[32px] space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">The Formulas</h3>
        <div className="space-y-2 font-mono text-lg font-bold text-slate-800">
          <p>Latitude = Distance * cos(Azimuth)</p>
          <p>Departure = Distance * sin(Azimuth)</p>
        </div>
      </section>
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs">
            <Terminal size={14} />
          </span>
          HP-35s RPN (Verified Manual Trig)
        </h2>
        <div className="bg-slate-900 rounded-[32px] p-8 md:p-10 text-white space-y-6 shadow-2xl">
          <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">Step 1: Calculate Latitude</p>
          <div className="flex items-start gap-4"><div className="bg-slate-800 px-3 py-1 rounded-lg font-mono text-sm border border-slate-700">425</div><div className="text-slate-400 text-sm font-medium">Input Distance</div></div>
          <div className="flex items-start gap-4"><div className="bg-blue-600 px-3 py-1 rounded-lg font-mono text-sm">ENTER</div><div className="text-slate-400 text-sm font-medium">Place in stack</div></div>
          <div className="flex items-start gap-4"><div className="bg-slate-800 px-3 py-1 rounded-lg font-mono text-sm border border-slate-700">42</div><div className="text-slate-400 text-sm font-medium">Input Azimuth</div></div>
          <div className="flex items-start gap-4"><div className="bg-indigo-600 px-3 py-1 rounded-lg font-mono text-sm">COS</div><div className="text-slate-400 text-sm font-medium">Calculate Cosine</div></div>
          <div className="flex items-start gap-4"><div className="bg-indigo-600 px-3 py-1 rounded-lg font-mono text-sm">×</div><div className="text-white text-sm font-black">Result: 315.84 (Latitude)</div></div>
          <div className="h-px bg-slate-800 my-4"></div>
          <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">Step 2: Calculate Departure</p>
          <div className="flex items-start gap-4"><div className="bg-slate-800 px-3 py-1 rounded-lg font-mono text-sm border border-slate-700">425</div><div className="text-slate-400 text-sm font-medium">Input Distance</div></div>
          <div className="flex items-start gap-4"><div className="bg-blue-600 px-3 py-1 rounded-lg font-mono text-sm">ENTER</div><div className="text-slate-400 text-sm font-medium">Place in stack</div></div>
          <div className="flex items-start gap-4"><div className="bg-slate-800 px-3 py-1 rounded-lg font-mono text-sm border border-slate-700">42</div><div className="text-slate-400 text-sm font-medium">Input Azimuth</div></div>
          <div className="flex items-start gap-4"><div className="bg-indigo-600 px-3 py-1 rounded-lg font-mono text-sm">SIN</div><div className="text-slate-400 text-sm font-medium">Calculate Sine</div></div>
          <div className="flex items-start gap-4"><div className="bg-indigo-600 px-3 py-1 rounded-lg font-mono text-sm">×</div><div className="text-white text-sm font-black">Result: 284.38 (Departure)</div></div>
        </div>
      </section>
    </>
  );

  const renderRelativeError = () => (
    <>
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
          <Calculator size={14} strokeWidth={3} />
          <span className="text-[10px] font-black uppercase tracking-widest">HP-35s Mastery Series</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Relative Error of Closure (Precision)
        </h1>
      </header>
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs">01</span>
          Why This Matters on the FS Exam
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed">
          Relative error (also called Precision) is the metric used to judge if a survey meets jurisdictional or project standards. It expresses the "misclose" as a ratio relative to the total distance measured.
        </p>
      </section>
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs">02</span>
          The Core Concept
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed">
          First, calculate the Linear Error of Closure (LEOC) using the Pythagorean theorem on the summed Latitudes and Departures. Then, divide the total perimeter by this LEOC to find the "1 in X" ratio.
        </p>
      </section>
      <section className="mt-12 p-8 bg-slate-50 border border-slate-100 rounded-[32px] space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Formula Summary</h3>
        <div className="space-y-2 font-mono text-lg font-bold text-slate-800">
          <p>LEOC = sqrt((ΣLat)² + (ΣDep)²)</p>
          <p>Precision Ratio = 1 : (Perimeter / LEOC)</p>
        </div>
      </section>
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs">
            <Terminal size={14} />
          </span>
          HP-35s Walkthrough (Verified RPN)
        </h2>
        <div className="bg-slate-900 rounded-[32px] p-8 md:p-10 text-white space-y-6 shadow-2xl">
          <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">Part 1: Calculate LEOC</p>
          <div className="flex items-start gap-4"><div className="bg-slate-800 px-3 py-1 rounded-lg font-mono text-sm border border-slate-700">.08</div><div className="text-slate-400 text-sm font-medium">Input Lat Error</div></div>
          <div className="flex items-start gap-4"><div className="bg-blue-600 px-3 py-1 rounded-lg font-mono text-sm">ENTER</div><div className="text-slate-400 text-sm font-medium">Duplicate for squaring</div></div>
          <div className="flex items-start gap-4"><div className="bg-indigo-600 px-3 py-1 rounded-lg font-mono text-sm">×</div><div className="text-slate-400 text-sm font-medium">Result: .08²</div></div>
          <div className="flex items-start gap-4"><div className="bg-slate-800 px-3 py-1 rounded-lg font-mono text-sm border border-slate-700">.06</div><div className="text-slate-400 text-sm font-medium">Input Dep Error</div></div>
          <div className="flex items-start gap-4"><div className="bg-blue-600 px-3 py-1 rounded-lg font-mono text-sm">ENTER</div><div className="text-slate-400 text-sm font-medium">Duplicate</div></div>
          <div className="flex items-start gap-4"><div className="bg-indigo-600 px-3 py-1 rounded-lg font-mono text-sm">×</div><div className="text-slate-400 text-sm font-medium">Result: .06²</div></div>
          <div className="flex items-start gap-4"><div className="bg-indigo-600 px-3 py-1 rounded-lg font-mono text-sm">+</div><div className="text-slate-400 text-sm font-medium">Sum squares</div></div>
          <div className="flex items-start gap-4"><div className="bg-slate-700 px-3 py-1 rounded-lg font-mono text-sm">vx</div><div className="text-white text-sm font-black">Result: 0.10 (LEOC)</div></div>
          <div className="h-px bg-slate-800 my-4"></div>
          <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">Part 2: Calculate Ratio</p>
          <div className="flex items-start gap-4"><div className="bg-blue-600 px-3 py-1 rounded-lg font-mono text-sm">ENTER</div><div className="text-slate-400 text-sm font-medium">Place LEOC in stack</div></div>
          <div className="flex items-start gap-4"><div className="bg-slate-800 px-3 py-1 rounded-lg font-mono text-sm border border-slate-700">1845.60</div><div className="text-slate-400 text-sm font-medium">Perimeter</div></div>
          <div className="flex items-start gap-4"><div className="bg-indigo-600 px-3 py-1 rounded-lg font-mono text-sm">SWAP</div><div className="text-slate-400 text-sm font-medium">Put LEOC in denominator</div></div>
          <div className="flex items-start gap-4"><div className="bg-indigo-600 px-3 py-1 rounded-lg font-mono text-sm">÷</div><div className="text-white text-sm font-black">Result: 18456 (Ratio: 1:18,456)</div></div>
        </div>
      </section>
    </>
  );

  const renderLevelLoop = () => (
    <>
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
          <Calculator size={14} strokeWidth={3} />
          <span className="text-[10px] font-black uppercase tracking-widest">HP-35s Mastery Series</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Level Loop Tolerance (E = k√M)
        </h1>
      </header>
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs">01</span>
          The Standards Context
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed">
          Leveling surveys must meet specific vertical accuracy standards. On the FS exam, you are often asked if a given vertical closure meets the requirements for First, Second, or Third-order leveling.
        </p>
      </section>
      <section className="mt-12 p-8 bg-slate-50 border border-slate-100 rounded-[32px] space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Formula Summary</h3>
        <div className="space-y-2 font-mono text-lg font-bold text-slate-800">
          <p>Allowable Error (E) = k * sqrt(M)</p>
          <p className="text-xs text-slate-500 font-bold">M = distance in miles, k = constant (e.g., 0.05 ft for Third Order)</p>
        </div>
      </section>
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs">
            <Terminal size={14} />
          </span>
          HP-35s Walkthrough (Example: 4 Miles, k=0.05)
        </h2>
        <div className="bg-slate-900 rounded-[32px] p-8 md:p-10 text-white space-y-6 shadow-2xl">
          <div className="flex items-start gap-4"><div className="bg-slate-800 px-3 py-1 rounded-lg font-mono text-sm border border-slate-700">4</div><div className="text-slate-400 text-sm font-medium">Distance in Miles (M)</div></div>
          <div className="flex items-start gap-4"><div className="bg-indigo-600 px-3 py-1 rounded-lg font-mono text-sm">vx</div><div className="text-slate-400 text-sm font-medium">Square root of M (Result: 2)</div></div>
          <div className="flex items-start gap-4"><div className="bg-slate-800 px-3 py-1 rounded-lg font-mono text-sm border border-slate-700">.05</div><div className="text-slate-400 text-sm font-medium">Tolerance Constant (k)</div></div>
          <div className="flex items-start gap-4"><div className="bg-indigo-600 px-3 py-1 rounded-lg font-mono text-sm">×</div><div className="text-white text-sm font-black">Result: 0.10 ft (Allowable Error)</div></div>
        </div>
      </section>
    </>
  );

  const renderLawOfSines = () => (
    <>
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
          <Calculator size={14} strokeWidth={3} />
          <span className="text-[10px] font-black uppercase tracking-widest">HP-35s Mastery Series</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Law of Sines in Traverse
        </h1>
      </header>
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs">01</span>
          The Math Concept
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed">
          The Law of Sines is used to solve for unknown side lengths or angles in non-right triangles. In surveying, this is common when calculating "skipped" measurements or missing traverse legs.
        </p>
      </section>
      <section className="mt-12 p-8 bg-slate-50 border border-slate-100 rounded-[32px] space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">The Formula</h3>
        <div className="font-mono text-lg font-bold text-slate-800 text-center">
          a/sin(A) = b/sin(B) = c/sin(C)
        </div>
      </section>
      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs">
            <Terminal size={14} />
          </span>
          HP-35s RPN (Solve for b given a, A, B)
        </h2>
        <div className="bg-slate-900 rounded-[32px] p-8 md:p-10 text-white space-y-6 shadow-2xl">
          <p className="text-xs text-blue-400 font-bold">Example: a=425', A=42°, B=65°. Find b.</p>
          <div className="flex items-start gap-4"><div className="bg-slate-800 px-3 py-1 rounded-lg font-mono text-sm border border-slate-700">425</div><div className="text-slate-400 text-sm font-medium">Length 'a'</div></div>
          <div className="flex items-start gap-4"><div className="bg-blue-600 px-3 py-1 rounded-lg font-mono text-sm">ENTER</div><div className="text-slate-400 text-sm font-medium">Stack</div></div>
          <div className="flex items-start gap-4"><div className="bg-slate-800 px-3 py-1 rounded-lg font-mono text-sm border border-slate-700">42</div><div className="text-slate-400 text-sm font-medium">Angle 'A'</div></div>
          <div className="flex items-start gap-4"><div className="bg-indigo-600 px-3 py-1 rounded-lg font-mono text-sm">SIN</div><div className="bg-indigo-600 px-3 py-1 rounded-lg font-mono text-sm">÷</div><div className="text-slate-400 text-sm font-medium">Result is a/sin(A)</div></div>
          <div className="flex items-start gap-4"><div className="bg-slate-800 px-3 py-1 rounded-lg font-mono text-sm border border-slate-700">65</div><div className="text-slate-400 text-sm font-medium">Angle 'B'</div></div>
          <div className="flex items-start gap-4"><div className="bg-indigo-600 px-3 py-1 rounded-lg font-mono text-sm">SIN</div><div className="bg-indigo-600 px-3 py-1 rounded-lg font-mono text-sm">×</div><div className="text-white text-sm font-black">Result: 575.60 (Length 'b')</div></div>
        </div>
      </section>
    </>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-6 duration-500 pb-32">
      <button 
        onClick={onBack}
        className="group flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-sm transition-all"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Library
      </button>

      <article className="prose prose-slate max-w-none">
        {topic === 'compass-rule' && renderCompassRule()}
        {topic === 'azimuth-bearing' && renderAzimuthBearing()}
        {topic === 'lat-dep' && renderLatDep()}
        {topic === 'relative-error' && renderRelativeError()}
        {topic === 'level-loop' && renderLevelLoop()}
        {topic === 'law-sines' && renderLawOfSines()}
      </article>
    </div>
  );
};
