function Time({options,setTime,name,nested,id}) {
   
    return (
      <select className="pl-2 pr-9 outline-none appearance-none bg-transparent border-none" name={name}
      data-id={id}
      data-nested={nested}
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
