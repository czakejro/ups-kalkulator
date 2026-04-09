import { useState, useMemo, useCallback } from "react";

const SERVICES=[
{id:"std_kraj",name:"UPS Standard Krajowy (Jednopaczkowy)",short:"Standard Kraj",dir:"kraj",
zones:[{z:"1",m:"KRAJ",d:""},{z:"3",m:"TB",d:""},{z:"4",m:"TB",d:""},{z:"5",m:"TB",d:""},{z:"6",m:"TB",d:""},{z:"7",m:"TB",d:""},{z:"3",m:"TB",d:"Niemcy"},{z:"4",m:"TB",d:"Niemcy"},{z:"706",m:"WW",d:"Wielka Brytania"}],
prices:[[1,8.49,24.36,26.15,28.34,29.64,30.73,24.36,26.15,47.79],[2,8.49,26.24,28.36,30.96,32.26,33.47,24.36,26.15,47.79],[3,8.49,28.25,30.57,33.59,35.02,36.09,24.36,26.15,47.79],[4,8.49,30.15,32.89,36.12,37.76,38.82,24.36,26.15,47.79],[5,8.49,32.15,35.2,38.75,40.49,41.54,24.36,26.15,47.79],[6,8.88,33.95,37.0,41.04,42.8,44.07,24.36,26.15,49.9],[7,8.88,35.74,38.9,43.24,45.22,46.47,24.36,26.45,52.12],[8,8.88,37.52,40.58,45.54,47.62,48.98,25.52,27.6,54.33],[9,8.88,39.42,42.47,47.84,49.92,51.49,26.8,28.88,56.44],[10,8.88,41.21,44.26,50.05,52.34,53.88,28.02,30.1,58.66],[11,9.63,41.95,45.0,51.35,53.77,55.42,28.53,30.6,59.97],[12,9.63,42.79,45.96,52.57,55.3,56.84,29.1,31.25,61.38],[13,9.63,43.64,46.69,53.77,56.73,58.15,29.67,31.75,62.69],[14,9.63,44.37,47.42,55.2,58.15,59.68,30.17,32.25,63.99],[15,9.63,45.1,48.26,56.4,59.79,61.0,30.67,32.82,65.5],[16,9.63,46.06,49.0,57.72,61.23,62.52,31.32,33.32,66.82],[17,9.63,46.79,49.85,59.03,62.88,63.84,31.82,33.9,68.33],[18,9.63,47.53,50.69,60.35,64.4,65.25,32.32,34.47,69.73],[19,9.63,48.37,51.42,61.56,65.95,66.79,32.89,34.97,71.15],[20,9.63,49.21,52.17,62.98,67.48,68.1,33.47,35.47,72.56],[25,10.42,52.94,56.54,68.02,72.55,73.8,36.0,38.45,77.22],[30,10.42,56.22,60.56,72.76,77.38,79.18,38.23,41.18,81.65],[35,14.37,59.62,64.58,77.61,82.13,84.45,40.54,43.92,86.01],[40,14.37,63.22,67.87,83.24,87.75,90.59,42.99,46.15,91.17],[45,14.37,66.81,71.15,88.96,93.27,96.86,45.43,48.39,96.24],[50,14.37,70.41,74.43,94.58,98.65,103.11,47.88,50.61,101.18],[55,17.54,74.12,77.7,100.3,104.16,109.26,50.4,52.84,106.24],[60,20.75,77.7,80.88,105.93,109.57,115.52,52.84,55.0,111.2],[65,23.79,81.31,84.17,111.67,115.08,121.77,55.29,57.23,116.26],[70,26.97,84.9,87.45,117.27,120.48,128.03,57.74,59.47,121.22]]},
{id:"std_kraj_ap",name:"UPS Standard Krajowy AP",short:"Standard Kraj AP",dir:"kraj",
zones:[{z:"1",m:"KRAJ",d:""},{z:"3",m:"TB",d:""},{z:"4",m:"TB",d:""},{z:"5",m:"TB",d:""},{z:"6",m:"TB",d:""},{z:"7",m:"TB",d:""}],
prices:[[1,12.41,31.95,35.01,38.55,40.3,41.35],[2,12.41,31.95,35.01,38.55,40.3,41.35],[3,12.41,31.95,35.01,38.55,40.3,41.35],[5,12.41,31.95,35.01,38.55,40.3,41.35],[7,12.41,31.98,35.01,38.74,40.52,41.64],[10,12.41,36.91,39.66,44.86,46.93,48.32],[15,13.43,40.41,43.25,50.58,53.64,54.72],[20,13.43,44.11,46.77,56.51,60.55,61.11],[25,14.6,47.47,50.71,61.04,65.12,66.24],[30,14.6,50.42,54.33,65.31,69.46,71.08],[35,20.41,53.48,57.94,69.67,73.74,75.83],[40,20.41,56.72,60.9,74.74,78.79,81.35],[50,20.41,63.19,66.81,84.94,88.6,92.62],[60,29.8,69.75,72.62,95.16,98.43,103.79],[70,38.97,76.23,78.52,105.37,108.25,115.05]]},
{id:"std_wielo",name:"UPS Standard Wielopaczkowy",short:"Standard Wielopacz",dir:"kraj",
zones:[{z:"1",m:"KRAJ",d:""},{z:"3",m:"TB",d:""},{z:"4",m:"TB",d:""},{z:"5",m:"TB",d:""},{z:"6",m:"TB",d:""},{z:"7",m:"TB",d:""},{z:"706",m:"WW",d:"Wielka Brytania"}],
prices:[[1,18.14,61.34,67.02,74.08,77.06,79.52,88.72],[5,18.14,61.34,67.02,74.08,77.06,79.52,88.72],[10,18.14,61.34,67.02,74.08,77.06,79.52,88.72],[20,18.14,61.34,67.02,74.08,77.06,79.52,88.72],[25,18.14,61.34,67.02,74.08,77.29,79.52,90.63],[30,18.14,61.34,67.02,77.41,82.25,84.13,95.69],[35,21.24,67.14,72.01,88.31,93.05,96.31,106.71],[40,21.24,67.14,72.01,88.31,93.05,96.31,106.71],[50,21.24,74.76,79.08,100.53,104.39,109.27,118.28],[60,26.6,82.37,85.65,112.44,116.31,122.33,130.43],[70,32.61,90.0,92.75,124.34,128.21,135.94,142.57],[80,38.46,99.61,106.39,136.9,143.62,152.28,158.28],[90,44.01,109.46,120.05,149.35,159.48,168.76,174.47],[100,49.69,119.84,133.59,162.47,175.35,185.66,190.67]]},
{id:"exp_saver_exp",name:"UPS Express Saver (Export)",short:"Express Saver Exp",dir:"intl",
zones:[{z:"3",m:"TB",d:""},{z:"4",m:"TB",d:""},{z:"5",m:"TB",d:""},{z:"6",m:"TB",d:""},{z:"7",m:"WW",d:""},{z:"8",m:"WW",d:""},{z:"9",m:"WW",d:""},{z:"10",m:"WW",d:""},{z:"11",m:"WW",d:""},{z:"12",m:"WW",d:""},{z:"13",m:"WW",d:""},{z:"704",m:"WW",d:""}],
prices:[[1,76.29,80.6,85.78,86.88,76.86,79.59,83.5,84.82,90.52,96.04,101.75,83.38],[2,98.04,106.02,113.33,117.02,97.92,102.24,107.55,110.23,117.2,126.32,132.35,103.69],[3,118.94,131.64,139.61,145.43,116.89,121.84,131.07,136.5,145.23,156.21,162.08,124.14],[5,160.94,178.36,189.57,200.55,157.09,161.43,173.49,183.01,196.52,212.76,219.51,161.45],[10,208.92,245.79,267.96,289.92,212.1,219.8,241.7,261.86,280.4,299.74,309.77,215.28],[15,235.0,280.67,309.3,334.92,242.74,253.8,273.73,309.42,331.16,358.36,376.02,243.14],[20,259.13,314.68,348.71,379.94,273.4,288.66,307.48,356.82,385.74,417.5,442.24,270.3],[25,275.53,340.66,390.24,427.03,311.65,330.75,348.8,401.82,438.28,476.72,514.26,291.05],[30,301.3,374.47,441.19,479.1,349.31,369.49,386.94,441.18,484.62,530.26,582.62,318.04],[35,325.02,409.11,491.2,535.04,386.62,413.16,429.52,487.11,535.74,589.11,653.95,345.7],[40,340.46,434.16,522.71,571.93,413.74,440.83,462.41,525.01,580.72,637.98,714.84,365.71],[50,371.3,483.81,586.47,645.73,467.96,496.34,528.2,600.98,670.5,735.31,836.42,405.34],[60,402.41,533.47,649.77,719.54,522.42,551.66,594.18,676.95,760.51,832.84,958.21,444.99],[70,433.5,583.12,713.29,793.58,576.66,606.98,660.14,752.73,850.29,930.36,1079.61,484.64]]},
{id:"exp_saver_imp",name:"UPS Express Saver (Import)",short:"Express Saver Imp",dir:"intl",
zones:[{z:"3",m:"TB",d:""},{z:"4",m:"TB",d:""},{z:"5",m:"TB",d:""},{z:"6",m:"TB",d:""},{z:"7",m:"WW",d:""},{z:"8",m:"WW",d:""},{z:"9",m:"WW",d:""},{z:"10",m:"WW",d:""},{z:"11",m:"WW",d:""},{z:"12",m:"WW",d:""},{z:"13",m:"WW",d:""},{z:"754",m:"WW",d:""}],
prices:[[1,133.91,140.48,146.93,146.96,165.34,169.25,170.93,187.67,201.4,209.67,222.5,175.35],[2,170.54,185.92,194.47,194.48,211.36,217.27,219.39,242.53,261.44,275.71,290.85,220.67],[3,211.81,235.39,247.13,253.48,254.77,261.49,264.07,288.8,321.41,339.68,356.13,269.98],[5,278.22,308.32,327.3,336.82,338.42,344.62,348.02,388.66,431.82,462.56,483.22,342.7],[10,362.34,417.28,453.94,458.08,460.26,471.89,476.47,552.89,622.82,653.38,663.23,451.36],[15,402.88,471.31,518.38,535.75,538.72,538.96,544.5,653.08,738.57,781.48,808.74,505.21],[20,443.46,525.61,582.86,618.45,621.4,621.57,628.15,753.25,854.61,909.9,953.89,559.36],[25,475.86,578.45,664.94,704.0,676.36,683.69,690.37,852.94,967.42,1034.47,1096.89,612.07],[30,513.59,629.66,744.13,787.04,751.2,757.95,765.27,943.69,1075.33,1153.25,1234.46,663.13],[35,551.65,685.88,831.32,874.37,824.9,841.55,849.78,1037.71,1190.93,1283.0,1386.05,719.18],[40,577.45,729.02,885.34,935.79,884.6,900.64,909.43,1118.9,1290.15,1391.83,1513.93,762.2],[50,628.76,815.7,992.72,1058.85,1001.92,1018.81,1028.8,1279.24,1488.13,1609.09,1770.13,848.62],[60,680.09,901.97,1100.46,1181.91,1118.9,1137.02,1148.13,1439.56,1686.51,1822.98,2025.91,934.65],[70,731.39,988.69,1208.19,1304.63,1234.57,1255.19,1269.89,1599.92,1884.86,2033.47,2282.13,1021.1]]},
{id:"std_imp",name:"UPS Standard Import (Jednopaczkowy)",short:"Standard Import",dir:"intl",
zones:[{z:"1",m:"KRAJ",d:""},{z:"3",m:"TB",d:""},{z:"4",m:"TB",d:""},{z:"5",m:"TB",d:""},{z:"6",m:"TB",d:""},{z:"7",m:"TB",d:""},{z:"756",m:"WW",d:"Wielka Brytania"}],
prices:[[1,8.49,39.33,42.1,45.45,47.75,49.61,76.09],[2,8.49,39.33,42.1,45.45,47.75,49.61,76.09],[3,8.49,42.24,45.31,49.18,51.79,53.65,76.09],[5,8.49,47.96,51.99,56.83,59.58,61.44,76.09],[10,8.88,61.32,65.65,73.68,76.72,80.33,93.58],[15,9.63,67.45,71.92,84.06,88.96,91.27,106.07],[20,9.63,73.86,77.62,94.31,101.63,103.52,119.0],[25,10.42,80.24,84.57,101.85,109.81,112.27,127.34],[30,10.42,85.57,91.02,108.79,116.91,119.66,134.58],[35,14.37,90.87,97.45,116.33,123.85,127.2,141.67],[40,14.37,96.33,102.64,124.45,132.11,136.75,150.09],[50,14.37,107.39,112.71,141.38,148.48,155.87,166.79],[60,20.75,118.31,122.79,158.62,165.0,174.98,183.63],[70,26.97,129.24,132.87,176.01,181.35,194.08,200.32]]},
{id:"std_imp_wielo",name:"UPS Standard Import (Wielopaczkowy)",short:"Std Import Wielo",dir:"intl",
zones:[{z:"1",m:"KRAJ",d:""},{z:"3",m:"TB",d:""},{z:"4",m:"TB",d:""},{z:"5",m:"TB",d:""},{z:"6",m:"TB",d:""},{z:"7",m:"TB",d:""},{z:"756",m:"WW",d:"Wielka Brytania"}],
prices:[[1,18.14,109.62,118.94,130.18,136.44,140.74,172.18],[5,18.14,109.62,118.94,130.18,136.44,140.74,172.18],[10,18.14,109.62,118.94,130.18,136.44,140.74,172.18],[20,18.14,109.62,118.94,130.18,136.44,140.74,172.18],[25,18.14,109.62,118.94,130.18,136.44,140.74,172.18],[30,18.14,109.62,118.94,131.56,139.22,144.15,172.18],[40,21.24,109.62,118.94,131.56,139.22,144.15,172.18],[50,21.24,112.73,118.94,150.22,156.46,163.99,174.92],[60,26.6,124.2,128.12,168.04,174.4,183.68,193.23],[70,32.61,135.81,138.89,186.0,192.37,204.53,211.56],[80,38.46,150.49,159.88,205.1,215.53,229.13,235.18],[90,44.01,165.47,180.04,224.22,239.72,254.2,259.85],[100,49.69,181.28,200.18,243.48,263.9,279.69,284.52]]},
];

const SURCHARGES=[
{id:"cod",name:"Pobranie (COD)",type:"cod",kP:0.002,kMin:2.70,iP:0.002,iMin:21.61,fuel:false},
{id:"handling",name:"Obsługa nietypowej przesyłki",type:"fixed",kP:6.35,iP:40.07,fuel:true},
{id:"large_pkg",name:"Duża paczka (dł+obwód >300cm)",type:"fixed",kP:82.60,iP:20.65,fuel:true},
{id:"residential",name:"Doręczenie pod adres prywatny",type:"fixed",kP:0,iP:1.275,fuel:true},
{id:"ext_pickup",name:"Strefa rozszerzona — odbiór",type:"fixed",kP:7.79,iP:33.45,fuel:true},
{id:"ext_delivery",name:"Strefa rozszerzona — doręczenie",type:"fixed",kP:7.79,iP:33.45,fuel:true},
{id:"saturday",name:"Dostawa w sobotę",type:"fixed",kP:27.45,iP:71.90,fuel:true},
{id:"weekly_pickup",name:"Tygodniowa opłata za odbiór",type:"fixed",kP:11.56,iP:11.56,fuel:false},
{id:"ret1",name:"Zwrot — 1 Pickup Attempt",type:"fixed",kP:14.40,iP:14.40,fuel:false},
{id:"ret3",name:"Zwrot — 3 Pickup Attempt",type:"fixed",kP:38.40,iP:38.40,fuel:false},
{id:"elabel",name:"Elektroniczna etykieta zwrotna",type:"fixed",kP:8.05,iP:8.05,fuel:false},
{id:"plabel",name:"Drukowana etykieta zwrotna",type:"fixed",kP:5.95,iP:5.95,fuel:false},
{id:"duty",name:"Przeniesienie cła na nadawcę (poza UE)",type:"fixed",kP:0,iP:107.50,fuel:false},
{id:"docreturn",name:"Zwrot dokumentów",type:"fixed",kP:17.75,iP:0,fuel:false},
];

function findPrice(s,zi,w){const rw=s.prices;const ww=Math.ceil(w);for(let i=0;i<rw.length;i++)if(ww<=rw[i][0])return rw[i][zi+1]??null;return null;}
const f2=v=>v!=null?v.toFixed(2).replace(".",","):"—";
const fP=v=>v!=null?(v*100).toFixed(1).replace(".",",")+"%":"—";

export default function App(){
  const[mode,setMode]=useState("allin"); // "separate" or "allin"
  const[svcId,setSvcId]=useState(SERVICES[0].id);
  const[zi,setZi]=useState(0);
  const[weight,setWeight]=useState("5");
  const[fuelK,setFuelK]=useState("30.50");
  const[fuelI,setFuelI]=useState("48.25");
  const[sellPrice,setSellPrice]=useState("");
  const[tgtM,setTgtM]=useState("15");
  const[actSC,setActSC]=useState({});
  const[codVal,setCodVal]=useState("");

  const svc=SERVICES.find(s=>s.id===svcId);
  const zone=svc?.zones[zi];
  const isKraj=svc?.dir==="kraj"&&zone?.m==="KRAJ";

  const fuelFull=isKraj?parseFloat(fuelK.replace(",","."))||0:parseFloat(fuelI.replace(",","."))||0;
  const fuelDiscBL=isKraj?50:25;
  const fuelBL=fuelFull*(1-fuelDiscBL/100);

  const w=parseFloat(weight.replace(",","."))||0;
  const upsBase=findPrice(svc,zi,w);

  const scDetails=useMemo(()=>{
    const d=[];let tot=0,totFuelable=0;
    Object.entries(actSC).forEach(([id,on])=>{
      if(!on)return;
      const sc=SURCHARGES.find(s=>s.id===id);if(!sc)return;
      const price=isKraj?sc.kP:sc.iP;
      let cost=0;
      if(sc.type==="cod"){const cv=parseFloat((codVal||"0").replace(",","."))||0;cost=Math.max(cv*price,isKraj?sc.kMin:sc.iMin);}
      else cost=price;
      if(cost>0.001){d.push({id,name:sc.name,cost,fuel:sc.fuel});if(sc.fuel)totFuelable+=cost;tot+=cost;}
    });
    return{d,tot,totFuelable};
  },[actSC,codVal,isKraj]);

  // === COST BL (always the same regardless of mode) ===
  const fuelOnBaseBL=upsBase!=null?upsBase*(fuelBL/100):null;
  const fuelOnScBL=scDetails.totFuelable*(fuelBL/100);
  const costBL=upsBase!=null?upsBase+fuelOnBaseBL+fuelOnScBL+scDetails.tot:null;

  const sp=parseFloat((sellPrice||"0").replace(",","."))||0;
  const tm=parseFloat(tgtM.replace(",","."))||0;

  // === MODE-DEPENDENT REVENUE ===
  let clientTotal=null, fuelOnSellFull=0, fuelOnScFull=0, fuelProfit=null;

  if(mode==="separate"){
    // Tryb A: cennik bez paliwowej, paliwowa doliczana osobno
    fuelOnSellFull=sp*(fuelFull/100);
    fuelOnScFull=scDetails.totFuelable*(fuelFull/100);
    clientTotal=sp>0?sp+fuelOnSellFull+fuelOnScFull+scDetails.tot:null;
    fuelProfit=upsBase!=null&&sp>0?(sp*(fuelFull/100)-upsBase*(fuelBL/100))+(scDetails.totFuelable*((fuelFull-fuelBL)/100)):null;
  } else {
    // Tryb B: cennik all-in (cena już zawiera paliwową)
    // klient płaci: sellPrice + surcharges + fuel on fuelable surcharges (full)
    fuelOnScFull=scDetails.totFuelable*(fuelFull/100);
    clientTotal=sp>0?sp+fuelOnScFull+scDetails.tot:null;
    fuelProfit=null; // w trybie all-in zysk na paliwowej jest wliczony w marżę cennikową
  }

  const marginAmt=clientTotal!=null&&costBL!=null?clientTotal-costBL:null;
  const marginPct=clientTotal!=null&&clientTotal>0&&costBL!=null?(clientTotal-costBL)/clientTotal:null;

  // === SUGGESTED SELL PRICE ===
  let sugSellPrice=null, sugClientTotal=null;
  if(costBL!=null&&tm<100){
    sugClientTotal=costBL/(1-tm/100);
    if(mode==="separate"){
      const scConst=scDetails.totFuelable*(fuelFull/100)+scDetails.tot;
      sugSellPrice=(sugClientTotal-scConst)/(1+fuelFull/100);
    } else {
      const scConst=scDetails.totFuelable*(fuelFull/100)+scDetails.tot;
      sugSellPrice=sugClientTotal-scConst;
    }
  }

  const zL=useCallback(z=>{let l=`Strefa ${z.z} (${z.m})`;if(z.d)l+=` · ${z.d}`;return l;},[]);
  const toggle=id=>setActSC(p=>({...p,[id]:!p[id]}));

  const ptable=useMemo(()=>{
    if(!svc)return[];
    return svc.prices.map(r=>{
      const b=r[zi+1];if(b==null)return null;
      const fBL=b*(fuelBL/100);
      const fFull=b*(fuelFull/100);
      return{kg:r[0],ups:b,fuelBL:fBL,costBL:b+fBL,fuelFull:fFull,withFuelFull:b+fFull,fuelProfit:fFull-fBL};
    }).filter(Boolean);
  },[svc,zi,fuelBL,fuelFull]);

  // Styles
  const modeBtn=(m)=>({
    flex:1,padding:"8px 12px",border:"none",borderRadius:4,cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:"inherit",letterSpacing:0.5,
    background:mode===m?"#f59e0b":"#1e293b",color:mode===m?"#0a0e17":"#94a3b8",
    transition:"all 0.15s"
  });

  return(
    <div style={{fontFamily:"'JetBrains Mono','SF Mono',monospace",background:"#0a0e17",color:"#e2e8f0",minHeight:"100vh",padding:"14px"}}>
      <div style={{borderBottom:"1px solid #1e293b",paddingBottom:10,marginBottom:14}}>
        <h1 style={{fontSize:17,fontWeight:700,color:"#f59e0b",margin:0,letterSpacing:1}}>▦ UPS KALKULATOR RENTOWNOŚCI</h1>
        <p style={{fontSize:9,color:"#64748b",margin:"3px 0 0"}}>BL Logistics · Cennik 2026 · Netto bez VAT · Rabat paliwowy: kraj 50% / międzyn. 25%</p>
      </div>

      {/* MODE TOGGLE */}
      <div style={{display:"flex",gap:4,marginBottom:14,background:"#0f172a",padding:4,borderRadius:6,border:"1px solid #1e293b"}}>
        <button style={modeBtn("allin")} onClick={()=>setMode("allin")}>
          🅰 ALL-IN — cena w cenniku zawiera paliwową
        </button>
        <button style={modeBtn("separate")} onClick={()=>setMode("separate")}>
          🅱 OSOBNO — paliwowa doliczana osobno w tabelce
        </button>
      </div>

      {/* Mode description */}
      <div style={{fontSize:10,color:"#64748b",marginBottom:12,padding:8,background:"#0f172a",borderRadius:4,border:"1px solid #1e293b",borderLeft:`3px solid ${mode==="allin"?"#f59e0b":"#3b82f6"}`}}>
        {mode==="allin"
          ?<>Cena w cenniku BLPaczka = <b style={{color:"#e2e8f0"}}>kwota all-in</b> którą klient widzi i płaci (paliwowa już wliczona). Twój koszt = netto UPS + paliwowa po rabacie {fuelDiscBL}%. Różnica = Twoja marża.</>
          :<>Cena w cenniku BLPaczka = <b style={{color:"#e2e8f0"}}>kwota bez paliwowej</b>. Klient dodatkowo płaci pełną dopłatę paliwową ({fuelFull.toFixed(2).replace(".",",")}%). BL płaci UPS paliwową po rabacie ({fuelBL.toFixed(2).replace(".",",")}%). Różnica na paliwowej = dodatkowy zysk.</>
        }
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div>
          {/* FUEL */}
          <Box t="DOPŁATA PALIWOWA">
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
              <Inp l="Stawka krajowa %" v={fuelK} s={setFuelK}/>
              <Inp l="Stawka międzynarodowa %" v={fuelI} s={setFuelI}/>
            </div>
            <div style={{fontSize:10,color:"#94a3b8",marginTop:6,display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
              <span>Pełna (klient): <b style={{color:"#e2e8f0"}}>{fuelFull.toFixed(2).replace(".",",")}%</b></span>
              <span>Po rabacie BL ({fuelDiscBL}%): <b style={{color:"#22c55e"}}>{fuelBL.toFixed(2).replace(".",",")}%</b></span>
            </div>
          </Box>

          {/* SERVICE */}
          <Box t="PARAMETRY PRZESYŁKI">
            <label style={ls}>Usługa</label>
            <select value={svcId} onChange={e=>{setSvcId(e.target.value);setZi(0);}} style={{...is,cursor:"pointer"}}>
              {SERVICES.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <label style={{...ls,marginTop:6}}>Strefa</label>
            <select value={zi} onChange={e=>setZi(+e.target.value)} style={{...is,cursor:"pointer"}}>
              {svc?.zones.map((z,i)=><option key={i} value={i}>{zL(z)}</option>)}
            </select>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginTop:6}}>
              <Inp l="Waga (kg)" v={weight} s={setWeight}/>
              <Inp l={mode==="allin"?"Cena w cenniku BLPaczka (all-in)":"Cena w cenniku BLPaczka (bez paliw.)"} v={sellPrice} s={setSellPrice} p="np. 12,99"/>
            </div>
          </Box>

          {/* SURCHARGES */}
          <Box t="USŁUGI DODATKOWE / DOPŁATY">
            <div style={{maxHeight:220,overflowY:"auto",paddingRight:4}}>
              {SURCHARGES.map(sc=>{
                const price=isKraj?sc.kP:sc.iP;
                const on=!!actSC[sc.id];
                const dim=sc.type==="fixed"&&price===0;
                return(
                  <label key={sc.id} style={{display:"flex",alignItems:"flex-start",gap:6,padding:"4px 0",borderBottom:"1px solid #1a1f2e",opacity:dim?0.25:1,cursor:dim?"default":"pointer"}}>
                    <input type="checkbox" checked={on} onChange={()=>toggle(sc.id)} disabled={dim} style={{marginTop:2,accentColor:"#f59e0b"}}/>
                    <div style={{flex:1}}>
                      <div style={{fontSize:11,color:on?"#e2e8f0":"#94a3b8"}}>{sc.name}</div>
                      <div style={{fontSize:9,color:"#475569"}}>
                        {sc.type==="fixed"&&price>0&&`${f2(price)} zł`}
                        {sc.type==="cod"&&`${(price*100).toFixed(1)}% kwoty, min ${f2(isKraj?sc.kMin:sc.iMin)} zł`}
                        {sc.fuel&&<span style={{color:"#f59e0b"}}> · +paliwowa</span>}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
            {actSC.cod&&<div style={{marginTop:6}}><Inp l="Kwota pobrania (zł)" v={codVal} s={setCodVal} p="np. 150,00"/></div>}
          </Box>

          {/* CALCULATION */}
          <Box t="KALKULACJA">
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0}}>
              {/* Cost BL */}
              <div style={{paddingRight:8,borderRight:"1px solid #1e293b"}}>
                <div style={{fontSize:9,fontWeight:700,color:"#ef4444",letterSpacing:1,marginBottom:4}}>KOSZT BL (płacimy UPS)</div>
                <R l="Cena netto UPS" v={f2(upsBase)} u="zł"/>
                <R l={`Paliwowa (${fuelBL.toFixed(2).replace(".",",")}%)`} v={f2(fuelOnBaseBL)} u="zł" dim/>
                {scDetails.d.map(d=><R key={d.id} l={d.name} v={f2(d.cost)} u="zł" dim/>)}
                {fuelOnScBL>0.005&&<R l="Paliwowa na usł. dod." v={f2(fuelOnScBL)} u="zł" dim/>}
                <div style={{borderTop:"2px solid #334155",marginTop:4,paddingTop:4}}>
                  <R l="KOSZT BL" v={f2(costBL)} u="zł" hi c="#ef4444"/>
                </div>
              </div>
              {/* Revenue */}
              <div style={{paddingLeft:8}}>
                <div style={{fontSize:9,fontWeight:700,color:"#3b82f6",letterSpacing:1,marginBottom:4}}>PRZYCHÓD (klient płaci)</div>
                {mode==="allin"?(
                  <>
                    <R l="Cena cennikowa (all-in)" v={sp>0?f2(sp):"—"} u="zł"/>
                    {scDetails.d.map(d=><R key={d.id} l={d.name} v={f2(d.cost)} u="zł" dim/>)}
                    {fuelOnScFull>0.005&&<R l="Paliwowa na usł. dod." v={f2(fuelOnScFull)} u="zł" dim/>}
                  </>
                ):(
                  <>
                    <R l="Cena cennikowa" v={sp>0?f2(sp):"—"} u="zł"/>
                    <R l={`Paliwowa pełna (${fuelFull.toFixed(2).replace(".",",")}%)`} v={sp>0?f2(fuelOnSellFull):"—"} u="zł" dim/>
                    {scDetails.d.map(d=><R key={d.id} l={d.name} v={f2(d.cost)} u="zł" dim/>)}
                    {fuelOnScFull>0.005&&<R l="Paliwowa na usł. dod." v={f2(fuelOnScFull)} u="zł" dim/>}
                  </>
                )}
                <div style={{borderTop:"2px solid #334155",marginTop:4,paddingTop:4}}>
                  <R l="KLIENT PŁACI" v={clientTotal!=null&&sp>0?f2(clientTotal):"—"} u="zł" hi c="#3b82f6"/>
                </div>
              </div>
            </div>

            {sp>0&&costBL!=null&&marginAmt!=null&&(
              <div style={{marginTop:8,padding:8,background:marginAmt>=0?"rgba(34,197,94,0.06)":"rgba(239,68,68,0.06)",borderRadius:5,border:`1px solid ${marginAmt>=0?"#166534":"#7f1d1d"}`}}>
                <div style={{display:"grid",gridTemplateColumns:mode==="separate"?"1fr 1fr 1fr":"1fr 1fr",gap:4}}>
                  <R l="Marża łączna" v={f2(marginAmt)} u="zł" c={marginAmt>=0?"#22c55e":"#ef4444"}/>
                  <R l="Marża %" v={fP(marginPct)} c={marginAmt>=0?"#22c55e":"#ef4444"}/>
                  {mode==="separate"&&<R l="w tym zysk na paliw." v={fuelProfit!=null?f2(fuelProfit):"—"} u="zł" c="#f59e0b"/>}
                </div>
              </div>
            )}
          </Box>

          {/* SUGGESTED */}
          <Box t={mode==="allin"?"SUGEROWANA CENA ALL-IN":"SUGEROWANA CENA CENNIKOWA"}>
            <div style={{display:"grid",gridTemplateColumns:"80px 1fr",gap:6,alignItems:"end"}}>
              <Inp l="Marża %" v={tgtM} s={setTgtM}/>
              <div style={{padding:"7px 10px",background:"#1e293b",borderRadius:5,fontSize:16,fontWeight:700,color:"#f59e0b",textAlign:"center"}}>
                {sugSellPrice!=null&&sugSellPrice>0?`${f2(sugSellPrice)} zł`:"—"}
              </div>
            </div>
            {sugSellPrice!=null&&sugSellPrice>0&&costBL!=null&&(
              <div style={{fontSize:9,color:"#64748b",marginTop:4}}>
                {mode==="allin"
                  ?<>Wpisz w cennik: <b style={{color:"#e2e8f0"}}>{f2(sugSellPrice)} zł</b> (all-in) → koszt BL: <b style={{color:"#ef4444"}}>{f2(costBL)} zł</b> → zysk: <b style={{color:"#22c55e"}}>{f2(sugClientTotal-costBL)} zł</b> ({tgtM}%)</>
                  :<>Wpisz w cennik: <b style={{color:"#e2e8f0"}}>{f2(sugSellPrice)} zł</b> → klient z paliwową: <b style={{color:"#3b82f6"}}>{f2(sugClientTotal)} zł</b> → koszt BL: <b style={{color:"#ef4444"}}>{f2(costBL)} zł</b> → zysk: <b style={{color:"#22c55e"}}>{f2(sugClientTotal-costBL)} zł</b> ({tgtM}%)</>
                }
              </div>
            )}
          </Box>
        </div>

        {/* RIGHT: PRICE TABLE */}
        <div>
          <Box t={`CENNIK: ${svc?.short||""} · ${zone?zL(zone):""}`}>
            <div style={{maxHeight:"calc(100vh - 100px)",overflowY:"auto",fontSize:10}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{position:"sticky",top:0,background:"#0f172a",borderBottom:"1px solid #334155"}}>
                  <TH>kg</TH>
                  <TH r>Netto UPS</TH>
                  <TH r style={{color:"#ef4444"}}>Koszt BL</TH>
                  {mode==="allin"
                    ?<TH r style={{color:"#f59e0b"}}>Min. cena all-in</TH>
                    :<><TH r style={{color:"#3b82f6"}}>Z paliw. pełną</TH><TH r style={{color:"#f59e0b"}}>Zysk paliw.</TH></>
                  }
                </tr></thead>
                <tbody>{ptable.map((r,i)=>{
                  const act=Math.ceil(w)<=r.kg&&(i===0||Math.ceil(w)>ptable[i-1].kg);
                  return(<tr key={i} style={{background:act?"rgba(245,158,11,0.1)":i%2?"rgba(255,255,255,0.02)":"transparent",borderLeft:act?"3px solid #f59e0b":"3px solid transparent"}}>
                    <TD>{r.kg}</TD>
                    <TD r>{f2(r.ups)}</TD>
                    <TD r style={{color:"#fca5a5"}}>{f2(r.costBL)}</TD>
                    {mode==="allin"
                      ?<TD r style={{color:"#fbbf24",fontWeight:700}}>{f2(r.costBL)}</TD>
                      :<><TD r style={{color:"#93c5fd"}}>{f2(r.withFuelFull)}</TD><TD r style={{color:"#fbbf24"}}>{f2(r.fuelProfit)}</TD></>
                    }
                  </tr>);
                })}</tbody>
              </table>
            </div>
            <div style={{fontSize:8,color:"#475569",marginTop:6,borderTop:"1px solid #1e293b",paddingTop:4}}>
              {mode==="allin"
                ?`Koszt BL = netto + paliwowa po rabacie (${fuelBL.toFixed(2).replace(".",",")}%). Min. cena all-in = koszt BL (0% marży). Wpisz cenę wyższą by mieć marżę.`
                :`Koszt BL = netto + paliwowa ${fuelBL.toFixed(2).replace(".",",")}% · Z paliw. pełną = netto + ${fuelFull.toFixed(2).replace(".",",")}% · Zysk paliw. = różnica`
              }
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

const ls={fontSize:10,color:"#94a3b8",display:"block",marginBottom:2,textTransform:"uppercase",letterSpacing:1};
const is={width:"100%",padding:"6px 8px",background:"#1e293b",border:"1px solid #334155",borderRadius:4,color:"#e2e8f0",fontSize:12,fontFamily:"inherit",boxSizing:"border-box"};
const Box=({t,children})=><div style={{marginBottom:10,padding:10,background:"#0f172a",borderRadius:5,border:"1px solid #1e293b"}}><div style={{fontSize:9,fontWeight:700,color:"#64748b",letterSpacing:2,marginBottom:6,textTransform:"uppercase"}}>{t}</div>{children}</div>;
const R=({l,v,u,dim,hi,c})=><div style={{padding:"3px 0",display:"flex",justifyContent:"space-between",alignItems:"baseline",borderBottom:"1px solid #1a1f2e"}}><span style={{fontSize:10,color:dim?"#475569":"#94a3b8"}}>{l}</span><span style={{fontSize:hi?14:11,fontWeight:hi?800:600,color:c||(hi?"#f59e0b":"#e2e8f0")}}>{v} {u&&<span style={{fontSize:9,color:"#64748b"}}>{u}</span>}</span></div>;
const Inp=({l,v,s,p})=><div><label style={ls}>{l}</label><input style={is} value={v} onChange={e=>s(e.target.value)} placeholder={p}/></div>;
const TH=({children,r,style:st})=><th style={{padding:"4px 6px",textAlign:r?"right":"left",fontSize:9,fontWeight:600,color:"#64748b",textTransform:"uppercase",letterSpacing:1,...st}}>{children}</th>;
const TD=({children,r,style:st})=><td style={{padding:"3px 6px",textAlign:r?"right":"left",color:"#e2e8f0",...st}}>{children}</td>;
