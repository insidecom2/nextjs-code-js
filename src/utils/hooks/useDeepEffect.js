import { useEffect, useRef } from 'react'
import deepEqual from 'dequal'

const useDeepCompare = (deps) => {
  const ref = useRef()

  if (!deepEqual(ref.current, deps)) {
    ref.current = deps
  }

  return ref.current
}

const useDeepEffect = (callback, deps) => {
  useEffect(callback, useDeepCompare(deps))
}

export default useDeepEffect
