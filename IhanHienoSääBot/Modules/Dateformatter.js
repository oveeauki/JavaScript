export function dateformat(datestring){
  const days = datestring.slice(5);
  const [month,day] = days.split("-");
  const formatted = `${day}/${month}`
  return(formatted)
}
export function urlformat(url){
  let joo = url.slice(2)
  let j = `https://${joo}`
  return(j);
}