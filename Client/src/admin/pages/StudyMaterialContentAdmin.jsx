import { useEffect,useState,useMemo } from "react";
import adminAxios from "../adminAxios";
import MaterialPreview from "./MaterialPreview";
import { motion,AnimatePresence } from "framer-motion";
import { Trash2,Pencil,FileText,Video,BookOpen,Search,X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function StudyMaterialContentAdmin(){

  const [searchParams]=useSearchParams();

  const [materials,setMaterials]=useState([]);
  const [loading,setLoading]=useState(true);

  const [className,setClassName]=useState(searchParams.get("className")||"");
  const [subject,setSubject]=useState(searchParams.get("subject")||"");
  const [search,setSearch]=useState("");

  const [preview,setPreview]=useState(null);
  const [editing,setEditing]=useState(null);

  /* ================= FETCH ================= */

  const fetchMaterials=async()=>{
    try{
      setLoading(true);

      const {data}=await adminAxios.get("/admin/study-materials",{
        params:{
          ...(className && {className}),
          ...(subject && {subject})
        }
      });

      if(data.success){
        setMaterials(data.materials||[]);
      }

    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchMaterials();
  },[className,subject]);

  /* ================= DELETE ================= */

  const deleteMaterial=async(id)=>{
    if(!window.confirm("Delete material?")) return;

    const {data}=await adminAxios.delete(`/admin/study-materials/${id}`);

    if(data.success){
      setMaterials(prev=>prev.filter(m=>m._id!==id));
    }
  };

  /* ================= UPDATE ================= */

  const updateMaterial=async()=>{
    const {data}=await adminAxios.put(
      `/admin/study-materials/${editing._id}`,
      editing
    );

    if(data.success){
      fetchMaterials();
      setEditing(null);
    }
  };

  /* ================= ICON ================= */

  const getIcon=(type)=>{
    if(type==="video") return <Video size={16}/>;
    if(type==="pdf") return <FileText size={16}/>;
    return <BookOpen size={16}/>;
  };

  /* ================= OPTIONS ================= */

  const classOptions = useMemo(()=>{
    return [...new Set(materials.map(m=>m.className).filter(Boolean))];
  },[materials]);

  const subjectOptions = useMemo(()=>{
    return [...new Set(materials.map(m=>m.subject).filter(Boolean))];
  },[materials]);

  /* ================= FILTER ================= */

  const filtered = useMemo(()=>{
    return materials.filter(m=>{
      const matchSearch =
        `${m.title} ${m.chapter} ${m.subject} ${m.className}`
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchSearch;
    });
  },[materials,search]);

  /* ================= UI ================= */

  return(
    <div className="space-y-10 text-white">

      {/* FILTER BAR */}
      <div className="flex flex-wrap items-center gap-3 bg-[#0b0d12] border border-white/10 rounded-2xl px-5 py-3">

        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search size={18} className="text-gray-400"/>
          <input
            placeholder="Search materials..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="bg-transparent outline-none w-full"
          />
        </div>

        <select value={className}
          onChange={(e)=>setClassName(e.target.value)}
          className="bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 text-sm capitalize">
          <option value="">All Classes</option>
          {classOptions.map(c=><option key={c}>{c}</option>)}
        </select>

        <select value={subject}
          onChange={(e)=>setSubject(e.target.value)}
          className="bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 text-sm capitalize">
          <option value="">All Subjects</option>
          {subjectOptions.map(s=><option key={s}>{s}</option>)}
        </select>

      </div>

      {/* GRID */}

      {loading ? <p>Loading...</p> :
      filtered.length===0 ? <p>No materials found.</p> :

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
        {filtered.map(item=>(
          <motion.div key={item._id} whileHover={{y:-6}}
            className="rounded-3xl bg-[#0b0d12]/80 border border-white/10 p-6 space-y-5">

            <div className="flex justify-between">
              <h3 className="font-semibold">{item.title}</h3>

              <div className="flex gap-2">
                <button onClick={()=>setEditing(item)}
                  className="p-2 bg-indigo-600/20 rounded-lg">
                  <Pencil size={15}/>
                </button>

                <button onClick={()=>deleteMaterial(item._id)}
                  className="p-2 bg-red-500/20 rounded-lg">
                  <Trash2 size={15}/>
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-400 capitalize">
              <p>{item.className}</p>
              <p>{item.subject}</p>
              <p>Chapter {item.chapter}</p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs">
              {getIcon(item.type)} {item.type}
            </div>

            <button onClick={()=>setPreview(item)}
              className="text-blue-400 text-sm hover:underline">
              Preview Material →
            </button>

          </motion.div>
        ))}
      </div>}

      {preview && (
        <MaterialPreview material={preview} onClose={()=>setPreview(null)}/>
      )}

<AnimatePresence>
  {editing && (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
    >
      <motion.div
        initial={{scale:0.9,y:20}}
        animate={{scale:1,y:0}}
        exit={{scale:0.9,opacity:0}}
        transition={{duration:0.25}}
        className="
          w-full max-w-2xl
          bg-[#0b0d12]
          border border-white/10
          rounded-3xl
          p-8
          space-y-6
        "
      >

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl text-amber-400">
            Edit Study Material
          </h2>

          <button
            onClick={()=>setEditing(null)}
            className="p-2 rounded-lg hover:bg-white/10"
          >
            <X/>
          </button>
        </div>

        {/* FORM GRID */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* CLASS */}
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Class</label>
            <select
              value={editing.className || ""}
              onChange={(e)=>setEditing({...editing,className:e.target.value})}
              className="w-full p-3 bg-neutral-900 rounded-xl border border-white/10"
            >
              {classOptions.map(c=>(
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* SUBJECT */}
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Subject</label>
            <select
              value={editing.subject || ""}
              onChange={(e)=>setEditing({...editing,subject:e.target.value})}
              className="w-full p-3 bg-neutral-900 rounded-xl border border-white/10"
            >
              {subjectOptions.map(s=>(
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* TYPE */}
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Material Type</label>
            <select
              value={editing.type || "pdf"}
              onChange={(e)=>setEditing({...editing,type:e.target.value})}
              className="w-full p-3 bg-neutral-900 rounded-xl border border-white/10"
            >
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
              <option value="notes">Notes</option>
              <option value="pyq">PYQ</option>
            </select>
          </div>

          {/* CHAPTER */}
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Chapter</label>
            <input
              value={editing.chapter || ""}
              onChange={(e)=>setEditing({...editing,chapter:e.target.value})}
              className="w-full p-3 bg-neutral-900 rounded-xl border border-white/10"
            />
          </div>

        </div>

        {/* DESCRIPTION */}
        <div className="space-y-1">
          <label className="text-xs text-gray-400">Description</label>
          <textarea
            value={editing.description || ""}
            onChange={(e)=>setEditing({...editing,description:e.target.value})}
            rows={3}
            className="w-full p-3 bg-neutral-900 rounded-xl border border-white/10 resize-none"
          />
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 pt-2">

          <button
            onClick={()=>setEditing(null)}
            className="px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700"
          >
            Cancel
          </button>

          <button
            onClick={updateMaterial}
            className="
              px-6 py-3
              rounded-xl
              bg-gradient-to-r from-indigo-600 to-blue-600
              hover:opacity-90
              font-semibold
            "
          >
            Save Changes
          </button>

        </div>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


    </div>
  );
}
