import React from 'react'

const Header = ({ title, subtitle, creditBalance }: { title: string, subtitle?: string, creditBalance?: number }) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
      <div className="space-y-2">
        <h2 className="font-display-lg text-display-lg text-on-surface">{title}</h2>
        {subtitle && <p className="font-body-md text-on-surface-variant text-lg">{subtitle}</p>}
      </div>
      {creditBalance !== undefined && (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-container/20 rounded-xl border border-primary/20 shadow-sm self-start">
          <span className="material-symbols-outlined text-primary text-[24px]">bolt</span>
          <div className="flex flex-col">
            <span className="font-body-sm text-on-surface-variant text-xs leading-none mb-0.5">Available</span>
            <span className="font-body-md font-bold text-primary leading-none">{creditBalance} Credits</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header