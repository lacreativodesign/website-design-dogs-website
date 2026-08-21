type LogMeta={requestId:string; submissionId?:string; formType?:string; stage:string; status:string; durationMs?:number; upstreamStatus?:number; upstreamError?:string; duplicate?:boolean; failure?:string};
export function logLead(meta:LogMeta){console.info(JSON.stringify({...meta,vercelEnv:process.env.VERCEL_ENV||"local"}))}
export function logLeadError(meta:LogMeta){console.error(JSON.stringify({...meta,vercelEnv:process.env.VERCEL_ENV||"local"}))}
