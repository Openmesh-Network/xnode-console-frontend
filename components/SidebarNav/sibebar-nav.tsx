'use client'

import React, { useContext, useEffect, useRef, useState } from 'react'
import { Herr_Von_Muellerhoff } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { prefix } from '@/utils/prefix'
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button, ButtonProps } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Icon, Icons } from '@/components/Icons'

interface SidebarNav {
  isMobile?: boolean
  className?: string
}

const SidebarNav: React.FC<SidebarNav> = ({
  isMobile = false,
  className = '',
}) => {
  return (
    <NavContainer className={className}>
      <NavHeader isMobile={isMobile} />
      <NavContent className="mt-0 overflow-y-scroll py-2">
        <NavCategory label="Studio">
          <NavLink
            href="/"
            icon={Icons.HomeIcon}
            label="Home"
            isMobile={isMobile}
          />
          <NavLink
            href="/dashboard"
            icon={Icons.DashboardIcon}
            label="Dashboard"
            isMobile={isMobile}
          />
          <NavLink
            href="/deployments"
            icon={Icons.DeploymentsIcon}
            label="Deployments"
            isMobile={isMobile}
          />
          <NavLink
            href="/resources"
            icon={Icons.ResourcesIcon}
            label="Resources"
            isMobile={isMobile}
          />
        </NavCategory>
        <NavCategory>
          <NavLink
            href="/units"
            icon={Icons.XNodeIcon}
            label="Xnode"
            isMobile={isMobile}
          />
        </NavCategory>
        <NavCategory>
          <NavLink
            href="/templates"
            icon={Icons.Templates}
            label="Templates"
            isMobile={isMobile}
          />
          <NavLink
            href="/workspace"
            icon={Icons.DesignAndBuildIcon}
            label="Design & Build"
            isMobile={isMobile}
            tag="Beta"
          />
        </NavCategory>
        <NavCategory>
          <NavCollapsable
            label="Data"
            icon={Icons.DataIcon}
            links={[
              {
                label: 'Overview',
                href: '/data',
              },
              {
                label: 'Data Marketplace',
                href: '/data/marketplace',
              },
              {
                label: 'Documentation',
                href: '/data/documentation',
              },
            ]}
          />
          <NavCollapsable
            label="Compute"
            icon={Icons.ComputeIcon}
            links={[
              {
                label: 'Overview',
                href: '/compute',
              },
              {
                label: 'Deploy',
                href: '/compute/deploy',
              },
            ]}
          />
          <NavCollapsable
            label="Storage"
            icon={Icons.StorageIcon}
            disabled
            links={[
              {
                label: 'Storage',
                href: '/storage',
              },
            ]}
          />
          <NavCollapsable
            label="Analytics"
            icon={Icons.AnalyticsIcon}
            links={[
              {
                label: 'Pythia X',
                href: '/analytics/pythia-x',
              },
              {
                label: 'Pythia Pro',
                href: '/analytics/pythia-pro',
              },
            ]}
          />
          <NavCollapsable
            label="RPC"
            icon={Icons.RPCIcon}
            links={[
              {
                label: 'RPC',
                href: '/rpc',
              },
              {
                label: 'RPC Data & APIs',
                href: '/rpc/data',
              },
            ]}
          />
          <NavCollapsable
            label="APIs"
            icon={Icons.APIIcon}
            links={[
              {
                label: 'Overview',
                href: '/apis',
              },
              {
                label: 'APIs',
                href: '/apis/apis',
              },
            ]}
          />
          <NavLink
            href="/appdev"
            icon={Icons.AppDevIcon}
            label="App Dev"
            isMobile={isMobile}
            tag="Soon"
          />
          <NavLink
            href="/integrations"
            icon={Icons.IntegrationsIcon}
            label="Integrations"
            isMobile={isMobile}
            tag="Soon"
          />
          <NavLink
            href="/utility"
            icon={Icons.UtilityIcon}
            label="Utility"
            isMobile={isMobile}
            tag="Soon"
          />
        </NavCategory>
        <NavCategory label="Data Management">
          <NavLink
            href="/trading"
            icon={Icons.TradingIcon}
            label="Trading"
            isMobile={isMobile}
            tag="Soon"
          />
          <NavLink
            href="/machine-learning"
            icon={Icons.MachineLearningIcon}
            label="AI & Machine Learning"
            isMobile={isMobile}
            tag="Soon"
          />
        </NavCategory>
        <NavCategory label="Pages">
          <NavLink
            href="/rewards"
            icon={Icons.StakingIcon}
            label="Rewards"
            isMobile={isMobile}
          />
          <NavLink
            href="/settings"
            icon={Icons.SettingsIcon}
            label="Settings"
            isMobile={isMobile}
            tag="Soon"
          />
          <NavLink
            href="/faq"
            icon={Icons.FAQIcon}
            label="FAQs"
            isMobile={isMobile}
            tag="Soon"
          />
        </NavCategory>
        <NavCategory label="Support">
          <NavLink
            href="/docs"
            icon={Icons.DocumentationIcon}
            label="Documentation"
            isMobile={isMobile}
          />
          <NavLink
            href="https://discord.com/invite/openmesh"
            icon={Icons.CommunityIcon}
            label="Commmunity"
            isMobile={isMobile}
          />
          <NavLink
            href="https://circle.openmesh.network/"
            icon={Icons.CircleIcon}
            label="Circle"
            isMobile={isMobile}
          />
        </NavCategory>
      </NavContent>
    </NavContainer>
  )
}

const NavLayout: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  className,
}) => {
  return (
    <TooltipProvider>
      <div className={cn('flex w-full', className)}>
        <SidebarNav className="z-40 hidden lg:block" />
        <main className="mt-16 flex-1 justify-center" style={{ width: 'calc(100% - 17rem)' }}>{children}</main>
      </div>
    </TooltipProvider>
  )
}

const NavContext = React.createContext<{
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}>({
  collapsed: false,
  setCollapsed: () => {},
})

/**
 * Hook to get the collapsed state and setCollapsed function for the nav sidebar
 * @returns [collapsed, setCollapsed]
 */
export const useNavContext = () => useContext(NavContext)

const NavContainer = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => {
  const [collapsed, setCollapsed] = useState(false)

  // Load collapsed state from local storage
  useEffect(() => {
    const stored = localStorage.getItem('nav-collapsed')
    if (stored === 'true') setCollapsed(true)
  }, [])

  // Controlled state of Accordion and NavigationMenu components
  const [accordionValue, setAccordionValue] = useState([])
  const [accordionValuePrev, setAccordionValuePrev] = useState([])

  useEffect(() => {
    if (collapsed) {
      setAccordionValuePrev(accordionValue)
      setAccordionValue([])
    } else setAccordionValue(accordionValuePrev)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapsed])

  return (
    <NavContext.Provider
      value={{
        collapsed,
        setCollapsed,
      }}
    >
      <aside
        className={cn(
          'duration-plico sticky top-0 flex h-screen shrink-0 flex-col justify-between border-r bg-card pt-16 text-card-foreground transition-[width] ease-in-out',
          collapsed ? 'w-14' : 'w-[17rem]',
          className
        )}
        ref={ref}
        {...props}
      >
        <Accordion
          type="multiple" // Allow multiple accordion items to be open at the same time with 'multiple', change to 'single' to allow only one item to be open
          value={accordionValue}
          onValueChange={setAccordionValue}
          className="h-full"
          orientation={collapsed ? 'horizontal' : 'vertical'}
          asChild
        >
          <nav className="flex h-full flex-col justify-between">{children}</nav>
        </Accordion>
      </aside>
    </NavContext.Provider>
  )
})
NavContainer.displayName = 'NavContainer'

interface Links {
  label: string
  href: string
}

interface NavCollapsableProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  href?: string
  icon?: Icon
  notifications?: number
  disabled?: boolean
  links?: Links[]
}

const NavCollapsable: React.FC<NavCollapsableProps> = ({
  label,
  icon: Icon,
  children,
  notifications,
  className,
  disabled = false,
  links = [],
  ...props
}) => {
  const { collapsed } = useNavContext()

  const pathname = usePathname()

  return (
    <AccordionItem
      value={label}
      className={cn('relative', className)}
      disabled={disabled}
      {...props}
    >
      <AccordionHeader>
        <AccordionTrigger className="flex h-10 w-full items-center justify-between px-4 py-2 text-foreground hover:bg-primary/5 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&[data-state=open]>svg]:rotate-180">
          <div className="relative flex grow items-center gap-3">
            <Icon className="z-10 size-5 shrink-0" />
            <span
              className={cn(
                'duration-plico relative z-10 max-w-full truncate text-sm font-medium text-neutral-700 opacity-100 transition-[margin,max-width,opacity] ease-in-out',
                collapsed &&
                  'ml-0 max-w-0 opacity-0 group-[.category]:ml-4 group-[.category]:max-w-full group-[.category]:opacity-100'
              )}
            >
              {label}
            </span>
          </div>
          <ChevronDown
            className={cn(
              'chevron size-5 shrink-0 text-gray-600 transition-[transform,opacity] duration-300',
              collapsed ? 'opacity-0' : 'opacity-100'
            )}
          />
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent
        className={cn(
          'category group relative overflow-hidden text-sm transition-all duration-300 animate-in fade-in',
          // When sidebar collapsed, the content is absolute positioned to the right of the sidebar
          collapsed
            ? 'data-[state=closed]:animate-accordion-left data-[state=open]:animate-accordion-right absolute left-full top-0 ml-4 w-full rounded-md border bg-card'
            : 'w-full data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
        )}
      >
        {links &&
          links.map((link, i) => {
            let isActive = pathname === link.href
            return (
              <Link
                key={i}
                href={link.href}
                className={cn(
                  'flex items-center py-1.5 pl-12 font-semibold text-foreground/70 hover:bg-primary/5',
                  isActive && 'text-primary'
                )}
              >
                {link.label}
              </Link>
            )
          })}
      </AccordionContent>
    </AccordionItem>
  )
}

const NavMobileTrigger: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const { collapsed, setCollapsed } = useNavContext()

  const toggleCollapsed = () => {
    localStorage.setItem('nav-collapsed', false.toString())
    setCollapsed(false)
  }

  const [isOpen, setIsOpen] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const threshold = 50 // Minimum swipe distance

  const sheetTriggerButtonRef = useRef<HTMLButtonElement>(null)
  const sheetCloseButtonRef = useRef<HTMLButtonElement>(null)

  const handleTouchStart = (event: globalThis.TouchEvent) => {
    setStartX(event.touches[0].pageX)
    setIsSwiping(true)
  }

  const handleTouchMove = (event: globalThis.TouchEvent) => {
    if (!isSwiping) return
    setCurrentX(event.touches[0].pageX)
  }

  const handleTouchEnd = () => {
    if (!isSwiping) return
    setIsSwiping(false)
    const diffX = currentX - startX
    if (diffX > threshold) {
      sheetTriggerButtonRef.current.click()
      openNavbar()
    } else if (diffX < -threshold) {
      sheetCloseButtonRef.current?.click()
      closeNavbar()
    }
  }

  const handleTouchCancel = () => {
    setIsSwiping(false)
  }

  const openNavbar = () => {
    setIsOpen(true)
  }

  const closeNavbar = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const handleTouchStartWrapper = handleTouchStart as EventListener
    const handleTouchMoveWrapper = handleTouchMove as EventListener
    const handleTouchEndWrapper = handleTouchEnd as EventListener
    const handleTouchCancelWrapper = handleTouchCancel as EventListener

    window.addEventListener('touchstart', handleTouchStartWrapper)
    window.addEventListener('touchmove', handleTouchMoveWrapper)
    window.addEventListener('touchend', handleTouchEndWrapper)
    window.addEventListener('touchcancel', handleTouchCancelWrapper)

    return () => {
      window.removeEventListener('touchstart', handleTouchStartWrapper)
      window.removeEventListener('touchmove', handleTouchMoveWrapper)
      window.removeEventListener('touchend', handleTouchEndWrapper)
      window.removeEventListener('touchcancel', handleTouchCancelWrapper)
    }
  }, [isSwiping, currentX, startX])

  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button
          variant="outline"
          size={'icon'}
          className={cn('p-2 shadow-md shadow-gray-800', className)}
          ref={sheetTriggerButtonRef}
          onClick={toggleCollapsed}
        >
          <NavCollapseIcon forcedCollapsed />
        </Button>
      </SheetTrigger>
      <SheetClose asChild>
        <button className="hidden" ref={sheetCloseButtonRef}></button>
      </SheetClose>
      <SheetContent side="left" className="w-56 p-0">
        <SidebarNav isMobile={true} />
      </SheetContent>
    </Sheet>
  )
}

const NavHeader: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { isMobile?: boolean }
> = ({ isMobile, ...props }) => {
  const { collapsed, setCollapsed } = useNavContext()

  const toggleCollapsed = () => {
    localStorage.setItem('nav-collapsed', (!collapsed).toString())
    setCollapsed(!collapsed)
  }

  return (
    <div className="duration-plico relative flex h-10 w-full items-center">
      <div
        className={cn(
          'duration-plico flex grow items-center gap-x-2 overflow-hidden whitespace-nowrap text-lg transition-[max-width,opacity,padding] ease-in-out',
          collapsed ? 'max-w-0 pl-0 opacity-0' : 'max-w-full pl-0 opacity-100'
        )}
        {...props}
      />
      {!isMobile && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleCollapsed}
              className="inline-flex h-10 items-center justify-center rounded-md p-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <NavCollapseIcon />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            {collapsed ? 'Expand' : 'Collapse'} sidebar
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}

interface NavCollapseIconProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  forcedCollapsed?: boolean
}

const NavCollapseIcon: React.FC<NavCollapseIconProps> = ({
  forcedCollapsed = false,
  ...props
}) => {
  const { collapsed } = useNavContext()
  const isCollapsed = forcedCollapsed ? forcedCollapsed : collapsed

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={'shrink-0'}
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="15" x2="15" y1="3" y2="21" />
      <path
        className={cn(
          isCollapsed ? 'rotate-0' : 'rotate-180',
          'duration-plico transition-transform ease-in-out'
        )}
        style={{ transformOrigin: '40%' }}
        d="m8 9 3 3-3 3"
      />
    </svg>
  )
}

const NavContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
}) => {
  return (
    <ul className={cn('relative mt-8 flex w-full flex-col gap-4', className)}>
      {children}
    </ul>
  )
}

const NavFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
}) => {
  return (
    <ul className={cn('relative mt-auto flex w-full flex-col', className)}>
      {children}
    </ul>
  )
}

interface NavCategoryItemProps extends React.HTMLAttributes<HTMLLIElement> {
  label?: string
  icon?: Icon
}

function NavCategory({
  label,
  icon,
  children,
  ...props
}: NavCategoryItemProps) {
  const { collapsed } = useNavContext()

  return (
    <li {...props}>
      {label && (
        <span
          className={cn(
            'duration-plico ml-4 truncate text-xs font-medium uppercase text-foreground/80 transition-opacity ease-in-out',
            collapsed ? 'opacity-0' : 'opacity-100'
          )}
        >
          {label}
        </span>
      )}
      <ul className="flex flex-col">{children}</ul>
    </li>
  )
}

NavCategory.displayName = 'NavCategory'

interface NavButtonProps extends ButtonProps {
  icon: Icon
  label: string
}

const NavButton: React.FC<NavButtonProps> = ({
  icon: Icon,
  label,
  ...props
}) => {
  const { collapsed } = useNavContext()

  const transitionDuration = 0.5
  return (
    <li className="relative">
      <Tooltip open={!collapsed ? false : undefined} delayDuration={500}>
        <TooltipTrigger asChild>
          <button
            className="flex h-12 w-full items-center rounded-md p-3 hover:bg-accent/30"
            {...props}
          >
            <Icon className="relative z-10 size-5 shrink-0" />
            <span
              className={cn(
                'duration-plico relative z-10 ml-4 w-32 max-w-full truncate text-left text-base opacity-100 transition-[margin,max-width,opacity] ease-in-out',
                collapsed &&
                  'ml-0 max-w-0 opacity-0 group-[.category]:ml-4 group-[.category]:max-w-full group-[.category]:opacity-100'
              )}
            >
              {label}
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </li>
  )
}

interface NavLinkProps {
  href: string
  icon: Icon
  label: string
  isMobile?: boolean
  tag?: 'Beta' | 'New' | 'Soon'
  className?: string
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  icon: Icon,
  label,
  isMobile = false,
  className,
  tag,
}) => {
  const { collapsed } = useNavContext()

  const pathname = usePathname()
  let isActive: boolean
  if (href === '/') {
    isActive = pathname === href || pathname.startsWith('/collection')
  } else {
    isActive = pathname.startsWith(href)
  }

  const transitionDuration = 0.5
  return (
    <li className={cn('relative', className)}>
      {isActive && (
        <motion.span
          layoutId={`${isMobile} bubble`}
          className={
            'absolute inset-0 z-10 w-full border-l-4 border-primary bg-primary/10'
          }
          transition={{
            duration: transitionDuration,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      )}
      <Tooltip open={!collapsed ? false : undefined} delayDuration={500}>
        <TooltipTrigger asChild>
          <Link
            href={href}
            target={href.startsWith('https://') ? '_blank' : undefined}
            className="flex h-10 items-center px-4 py-2 text-foreground hover:bg-primary/5 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed"
            aria-disabled={tag === 'Soon'}
          >
            <div className="relative flex items-center gap-3">
              <div className="relative">
                <Icon className="relative z-10 size-5 shrink-0" />
              </div>
              <span
                className={cn(
                  'duration-plico relative z-10 max-w-full truncate text-sm font-medium text-neutral-700 opacity-100 transition-[margin,max-width,opacity] ease-in-out',
                  collapsed &&
                    'ml-0 max-w-0 opacity-0 group-[.category]:ml-4 group-[.category]:max-w-full group-[.category]:opacity-100'
                )}
              >
                {label}
              </span>
              {tag && !collapsed && (
                <div
                  className={cn(
                    'absolute -top-2 left-full z-10 ml-2 bg-primary px-1.5 py-1 text-[0.675rem] font-semibold leading-[0.625rem] text-white',
                    tag === 'Beta' && 'bg-primary',
                    tag === 'New' && 'bg-primary',
                    tag === 'Soon' && 'bg-[#959595]'
                  )}
                  style={{
                    borderRadius: '8px 0px 8px 0px ',
                  }}
                >
                  {tag}
                </div>
              )}
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </li>
  )
}

interface SeperatorProps extends React.HTMLAttributes<HTMLElement> {
  label?: string
  border?: boolean
}

const NavSeperator: React.FC<SeperatorProps> = ({
  label: title,
  border = false,
  className,
  ...props
}) => {
  const { collapsed } = useNavContext()

  return (
    <li
      className={cn(
        'relative z-20 h-px w-full',
        border && 'bg-border',
        title ? 'mt-6' : 'mt-3',
        className
      )}
      {...props}
    >
      {title && (
        <p
          className={cn(
            'duration-plico absolute inset-0 flex w-fit items-center bg-card px-4 text-xs uppercase text-card-foreground transition-[width,opacity] ease-in-out',
            collapsed && 'w-0 opacity-0'
          )}
        >
          {title}
        </p>
      )}
    </li>
  )
}

export { NavLayout, NavMobileTrigger }
