function Time({options,setTime,name}) {
   
    return (
      <select className="pl-2 pr-9 outline-none appearance-none bg-transparent border-none" name={name}
      onChange={(e)=>setTime(e)}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option} 
          </option>
        ))}
      </select>
    )
}

export default Time
