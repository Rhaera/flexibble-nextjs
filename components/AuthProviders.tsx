'use client'

import { getProviders, signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'

type Provider = {
  id: string
  name: string
  type: string
  signinUrl: string
  callbackUrl: string
  signinUrlParams?: Record<string, string> | undefined
}

type Providers = Record<string, Provider>

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null)
  const fetchProviders = async () => {
    const res = await getProviders()
    setProviders(res)
  }
  useEffect(() => {
    fetchProviders()
  }, [])
  if (providers) return (
    <div>
      {Object.values(providers).map((provider: Provider, index: string | number) => (
        <button key={index} onClick={() => signIn(provider.id)}>
          {provider.id}
        </button>
      ))}
    </div>
  )
}

export default AuthProviders
