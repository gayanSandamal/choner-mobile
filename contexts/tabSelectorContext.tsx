import React, { createContext, useContext, useState, ReactNode } from 'react'

interface TabSelectorContextType {
  tabs: Record<string, string> | null
  isRefreshing: {tab: string, refreshing: boolean}[]
  setTabs: (user: Record<string, string> | null) => void
  setIsRefreshing: (data: {tab: string, refreshing: boolean}[]) => void
}

const TabSelectorContext = createContext<TabSelectorContextType | undefined>(undefined)

export const TabSelectorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tabs, setTabs] = useState<Record<string, string> | null>(null)
  const [isRefreshing, setIsRefreshing] = useState<{tab: string, refreshing: boolean}[]>([])

  return (
    <TabSelectorContext.Provider value={{ tabs, isRefreshing, setTabs, setIsRefreshing }}>
      {children}
    </TabSelectorContext.Provider>
  )
}

export const useTabSelector = () => {
  const context = useContext(TabSelectorContext)
  if (context === undefined) {
    throw new Error('tabs, setTabs must be used within a TabSelectorProvider')
  }
  return context
}