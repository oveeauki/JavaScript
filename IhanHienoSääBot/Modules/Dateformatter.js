// Formatting Dates & etc
export function dateslice(datestring){
  const days = datestring.slice(5);
  const [month,day] = days.split("-");
  const formatted = `${day}/${month}`
  return(formatted)
}

export function dateformat(dt){
  let [jeps,joo,juu] = dt.split("-");
  let swapped = `${juu}-${joo}-${jeps}`
  return(swapped);
}

export function urlformat(url){
  let joo = url.slice(2)
  let j = `https://${joo}`
  return(j);
}
