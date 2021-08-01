import { useState } from 'react'
import { Switch } from '@headlessui/react'

export default function Toggle() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="flex items-center justify-center p-12">
      <div className="w-full max-w-xs mx-auto">
    <Switch.Group as="div" className="flex items-center space-x-4">
        <Switch.Label>Enabled messages</Switch.Label>
        <Switch
          as="button"
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? "bg-green-400" : "bg-gray-200"
          } relative inline-flex flex-shrink-0 h-6 w-12 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:shadow-outline`}
        >
          {({ checked }) => (
            <span
              className={`${
                checked ? "translate-x-6" : "translate-x-0"
              } inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full`}
            />
          )}
        </Switch>
      </Switch.Group>
    </div></div>
  )
}
