import { useState } from 'react'
import { Overlay } from '../ui/Overlay'
import { DocsLeftSidebar } from './DocsLeftSidebar'
import { DocsNavigationList } from './DocsNavigationList'
import { NavToggle } from '../ui/NavToggle'
import styled from 'styled-components'
import { DocsHeaderNav } from './DocsHeaderNav'
import { TinaIcon } from 'components/logo/TinaIcon'
import { useRouter } from 'next/router'
import { FallbackPlaceholder } from 'components/fallback-placeholder'
import Search from '../search'
import { HitsWrapper } from 'components/search/styles'
import { searchIndices } from 'components/search/indices'

export interface DocsNavProps {
  navItems: any
  guide: false | { category: string }
}

export function DocumentationNavigation({ navItems, guide }: DocsNavProps) {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <MobileNavToggle
        open={mobileNavIsOpen}
        onClick={() => setMobileNavIsOpen(!mobileNavIsOpen)}
      />
      <MobileNavLogo />
      <DocsLeftSidebar open={mobileNavIsOpen}>
        <DocsSidebarHeader>
          <DocsDesktopTinaIcon docs />
          <Search collapse expanded={true} indices={searchIndices} />
        </DocsSidebarHeader>
        {router.isFallback ? (
          <FallbackPlaceholder />
        ) : (
          <DocsNavigationList navItems={navItems} guide={guide} />
        )}
      </DocsLeftSidebar>
      <Overlay
        open={mobileNavIsOpen}
        onClick={() => setMobileNavIsOpen(false)}
      />
      <DocsHeaderNav color={'light'} open={mobileNavIsOpen} />
    </>
  )
}

const MobileNavToggle = styled(NavToggle)`
  position: fixed;
  margin-top: 1.25rem;
  left: 1rem;
  z-index: 500;

  @media (min-width: 999px) {
    display: none;
  }
`

const MobileNavLogo = styled(TinaIcon)`
  position: relative;
  display: block;
  padding: 1rem 0;

  h1 {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 1000px) {
    display: none;
  }
`

const DocsDesktopTinaIcon = styled(TinaIcon)`
  position: relative;
  display: none;
  margin-bottom: 1rem;

  @media (min-width: 1000px) {
    display: block;
  }
`

const DocsSidebarHeader = styled.div`
  flex: 0 0 auto;
  background-color: white;
  z-index: 500;
  padding: 1.25rem;
  border-bottom: 1px solid var(--tina-color-grey-2);
  border-right: 1px solid var(--tina-color-grey-2);
  position: relative;

  ${HitsWrapper} {
    right: auto;
    left: 1.25rem;
    margin-top: -1.625rem;
  }

  @media (max-width: 684px) {
    padding-left: 4.5rem;
  }
`
