import { useMemo } from "react";

/* ===================================================
   🦄 UNICORN LEETCODE STYLE DASHBOARD
=================================================== */

export default function TutorUnicornStats({ questions = [] }) {

  /* ================= TOTALS ================= */

  const totalSolved = useMemo(()=>{
    return questions.reduce((a,b)=>a+(b.count||0),0);
  },[questions]);

  const easy = 216;
  const medium = 169;
  const hard = 9;

  /* ================= HEATMAP DATA ================= */

  const heatmap = useMemo(()=>{

    const today = new Date();
    const data = [];

    for(let i=364;i>=0;i--){
      const d = new Date();
      d.setDate(today.getDate()-i);

      data.push({
        date:d.toISOString().slice(0,10),
        count:Math.floor(Math.random()*7) // demo data
      });
    }

    return data;

  },[]);

  /* ================= UI ================= */

  return(

    <div className="space-y-6">

      {/* ===================================================
          TOP STATS
      =================================================== */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* LEFT CARD */}
        <div className="
          rounded-2xl
          bg-gradient-to-br from-neutral-900 to-neutral-800
          border border-white/10
          p-6 flex gap-8
        ">

          {/* CIRCLE */}
          <div className="relative w-40 h-40 flex items-center justify-center">

            <div className="
              absolute inset-0 rounded-full
              border-[10px] border-neutral-700
            "/>

            <div className="text-center">
              <p className="text-4xl font-bold">{totalSolved}</p>
              <p className="text-gray-400 text-sm">Solved</p>
            </div>

          </div>

          {/* DIFFICULTY */}
          <div className="space-y-3 flex-1">

            <StatBox label="Easy" color="text-cyan-400" value={`${easy}/927`} />
            <StatBox label="Med." color="text-yellow-400" value={`${medium}/2010`} />
            <StatBox label="Hard" color="text-red-400" value={`${hard}/909`} />

          </div>

        </div>

        {/* BADGES CARD */}
        <div className="
          rounded-2xl
          bg-gradient-to-br from-neutral-900 to-neutral-800
          border border-white/10
          p-6
        ">

          <p className="text-gray-400 text-sm">Badges</p>
          <p className="text-4xl font-bold mt-1">4</p>

          <div className="flex gap-4 mt-6">

            <Badge/>
            <Badge/>
            <Badge/>

          </div>

          <p className="mt-6 text-gray-400">
            Most Recent Badge
          </p>

          <p className="text-xl font-semibold">
            50 Days Badge 2026
          </p>

        </div>

      </div>

      {/* ===================================================
          ACTIVITY HEATMAP
      =================================================== */}

      <div className="
        rounded-2xl
        bg-gradient-to-br from-neutral-900 to-neutral-800
        border border-white/10
        p-6
      ">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <h3 className="text-2xl font-semibold">
            405 submissions in the past one year
          </h3>

          <div className="flex gap-6 text-gray-400 text-sm">
            <span>Total active days: 157</span>
            <span>Max streak: 51</span>
          </div>

        </div>

        {/* HEATMAP GRID */}
        <div className="grid grid-cols-[repeat(52,14px)] gap-[6px]">

          {heatmap.map((d,i)=>(
            <div
              key={i}
              className={`
                w-3 h-3 rounded-sm
                ${
                  d.count===0
                  ?"bg-neutral-700"
                  :d.count<3
                  ?"bg-green-900"
                  :d.count<5
                  ?"bg-green-600"
                  :"bg-green-400"
                }
              `}
            />
          ))}

        </div>

        {/* MONTH LABELS */}
        <div className="flex justify-between mt-4 text-gray-500 text-sm">
          {["Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb"].map(m=>(
            <span key={m}>{m}</span>
          ))}
        </div>

      </div>

    </div>
  );
}

/* ===================================================
   UI SMALL COMPONENTS
=================================================== */

const StatBox = ({label,value,color}) => (
  <div className="bg-neutral-800 rounded-xl px-4 py-3">
    <p className={`${color} text-sm font-semibold`}>{label}</p>
    <p className="text-lg">{value}</p>
  </div>
);

const Badge = ()=>(
  <div className="
    w-16 h-16 rounded-xl
    bg-gradient-to-br from-green-500/20 to-indigo-500/20
    border border-white/10
  "/>
);
