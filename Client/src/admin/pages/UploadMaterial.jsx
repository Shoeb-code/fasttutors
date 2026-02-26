import { useState } from "react";
import adminAxios from "../adminAxios";
import { motion } from "framer-motion";
import { UploadCloud, FileText, Video, BookOpen, X, Plus } from "lucide-react";
import { chapterMap } from "../../constants/academicStructure.js";

export default function UploadMaterial() {

  const [form,setForm]=useState({
    className:"",
    subject:"",
    chapter:"",
    title:"",
    description:"",
    type:"pdf",
  });

  const [files,setFiles]=useState([]);
  const [loading,setLoading]=useState(false);
  const [progress,setProgress]=useState(0);

  const classOptions = Object.keys(chapterMap);
  const subjectOptions = chapterMap[form.className]
    ? Object.keys(chapterMap[form.className])
    : [];
  const chapterOptions =
    chapterMap[form.className]?.[form.subject] || [];

  const addFiles=(e)=>{
    setFiles(prev=>[...prev,...e.target.files]);
  };

  const removeFile=(index)=>{
    setFiles(prev=>prev.filter((_,i)=>i!==index));
  };

  const submit=async()=>{

    if(!form.className) return alert("Select class");
    if(!form.subject) return alert("Select subject");
    if(!form.title.trim()) return alert("Enter title");
    if(files.length===0) return alert("Upload at least 1 file");

    try{
      setLoading(true);

      for(const file of files){

        const formData=new FormData();

        for(const key in form){
          formData.append(key,form[key]);
        }

        formData.append("file",file);

        await adminAxios.post("/admin/study-material",formData,{
          headers:{ "Content-Type":"multipart/form-data" },
          onUploadProgress:(e)=>{
            setProgress(Math.round((e.loaded*100)/e.total));
          }
        });
      }

      alert("Materials uploaded 🚀");
      setFiles([]);
      setProgress(0);

    }catch(err){
      console.log(err);
      alert("Upload failed");
    }finally{
      setLoading(false);
    }
  };

  const types=[
    {value:"pdf",icon:<FileText size={16}/>},
    {value:"video",icon:<Video size={16}/>},
    {value:"notes",icon:<BookOpen size={16}/>},
    {value:"pyq",icon:<Plus size={16}/>},
  ];

  return(
    <div className="max-w-7xl mx-auto text-white space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-amber-400">
          Unicorn Upload Panel
        </h1>
      </div>

      <div className="bg-[#0b0d12] border border-white/10 rounded-3xl p-8 space-y-8">

        <div className="grid md:grid-cols-3 gap-4">
          <Select label="Class" value={form.className} options={classOptions}
            onChange={(v)=>setForm({...form,className:v,subject:"",chapter:""})}/>

          <Select label="Subject" value={form.subject} options={subjectOptions}
            onChange={(v)=>setForm({...form,subject:v,chapter:""})}/>

          <Select label="Chapter" value={form.chapter} options={chapterOptions}
            onChange={(v)=>setForm({...form,chapter:v})}/>
        </div>

        <Input placeholder="Material Title"
          value={form.title}
          onChange={(v)=>setForm({...form,title:v})}/>

        <div className="flex gap-3 flex-wrap">
          {types.map(t=>(
            <motion.button key={t.value}
              whileTap={{scale:0.95}}
              onClick={()=>setForm({...form,type:t.value})}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                form.type===t.value
                ?"bg-indigo-600"
                :"bg-neutral-900 border border-white/10"
              }`}
            >
              {t.icon}{t.value.toUpperCase()}
            </motion.button>
          ))}
        </div>

        <label className="border-2 border-dashed border-indigo-500/40 rounded-2xl p-12 text-center cursor-pointer hover:bg-indigo-500/5">
          <UploadCloud className="mx-auto mb-3"/>
          Drag & Drop or Click to Upload Multiple Files
          <input type="file" multiple hidden onChange={addFiles}/>
        </label>

        {files.map((f,i)=>(
          <div key={i} className="flex justify-between bg-neutral-900 px-4 py-2 rounded-xl">
            {f.name}
            <button onClick={()=>removeFile(i)}><X size={16}/></button>
          </div>
        ))}

        {progress>0 &&(
          <div className="w-full bg-neutral-800 h-2 rounded-full">
            <div className="bg-indigo-600 h-full" style={{width:`${progress}%`}}/>
          </div>
        )}

        <motion.button whileTap={{scale:0.97}}
          onClick={submit}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 font-semibold">
          {loading?"Uploading...":"Upload Materials"}
        </motion.button>

      </div>
    </div>
  );
}

function Input({value,onChange,placeholder}) {
  return(
    <input
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-3 rounded-xl bg-neutral-900 border border-white/10"
    />
  );
}

function Select({label,value,onChange,options}) {
  return(
    <select
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      className="w-full p-3 rounded-xl bg-neutral-900 border border-white/10 capitalize"
    >
      <option value="">{label}</option>
      {options.map(o=>(
        <option key={o} value={o}>{o.replace("-"," ")}</option>
      ))}
    </select>
  );
}
