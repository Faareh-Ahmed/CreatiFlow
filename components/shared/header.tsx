import React from 'react'

const Header = ({ title, subtitle }: { title: string, subtitle?: string }) => {
  return (
    <div className="mb-8 space-y-2">
      <h2 className="font-display-lg text-display-lg text-on-surface">{title}</h2>
      {subtitle && <p className="font-body-md text-on-surface-variant text-lg">{subtitle}</p>}
    </div>
  )
}

export default Header