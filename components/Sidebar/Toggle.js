import { useState } from 'react'
import { Switch } from '@headlessui/react'

export default function Toggle({value,enabled,setEnabled,name}) {
 // const [enabled, setEnabled] = useState(false)

  const switchStyle = {
    backgroundColor: enabled ? 'green' :'gray'
  }

  const spanStyle = {
    '--tw-translate-x': enabled ? '25px':'0',
  }

  return (
    <div className="flex items-center justify-center p-12">
      <div className="w-full max-w-xs mx-auto">
    <Switch.Group as="div" className="flex items-center space-x-4">
        <Switch.Label className="font-bold uppercase text-xs px-4">{value}</Switch.Label>
        <Switch
          as="button"
          checked={enabled}
          onChange={setEnabled}
          name={name}
          style={switchStyle}
          className={`relative inline-flex flex-shrink-0 h-6 w-12 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:shadow-outline`}
        >
          {({ checked }) => (
            <span
              className={`inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full`}
              style={spanStyle}
            />
          )}
        </Switch>
      </Switch.Group>
    </div>
    </div>
    
  )
}
