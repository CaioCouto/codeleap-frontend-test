export default function calculateTimeFromNow(datetime) {
    const now = new Date()
    const diffInMinutes = Math.floor((now - datetime)/(1000*60))
    
    if(diffInMinutes === 0) { return  [ 0, '' ] }
    else if(diffInMinutes < 60) { return [ diffInMinutes, 'minute' ] }
    
    const diffInHours = Math.floor(diffInMinutes/60)
    if(diffInHours < 24) { return [ Math.floor(diffInMinutes/60), 'hour'] }
    
    const diffInDays = Math.floor(diffInHours/24)
    return [ diffInDays, 'day']
}