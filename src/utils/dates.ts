const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0'); 
const dd = String(today.getDate()).padStart(2, '0');

export const currentDate = `${yyyy}-${mm}-${dd}`;

const sevenDaysFromNow = new Date(today);
sevenDaysFromNow.setDate(today.getDate() + 7); 

const yy = sevenDaysFromNow.getFullYear();
const m = String(sevenDaysFromNow.getMonth() + 1).padStart(2, '0');
const d = String(sevenDaysFromNow.getDate()).padStart(2, '0');

export const futureDate = `${yy}-${m}-${d}`;