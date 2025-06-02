"use client"

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Users, BarChart3 } from "lucide-react"

const navigation = [
  { name: "Donadores", href: "/Donadores", icon: Heart },
  { name: "Voluntarios", href: "/Voluntarios", icon: Users },
  { name: "Reportes", href: "/Reportes", icon: BarChart3 },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Header() {
  const pathname = usePathname()

  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: pathname === item.href || (pathname === "/" && item.href === "/donadores"),
  }))

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Disclosure
        as="nav"
        className="bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-xl p-2 text-gray-600 hover:bg-purple-100 hover:text-purple-600 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <motion.div
                className="flex shrink-0 items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href="/" className="flex items-center space-x-2 group">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    CodeForGood
                  </h1>
                </Link>
              </motion.div>

              <div className="hidden sm:ml-8 sm:block">
                <div className="flex items-center space-x-2">
                  {updatedNavigation.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className={classNames(
                            pathname === item.href
                              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                              : "text-gray-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 hover:text-purple-700",
                            "group relative rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 flex items-center space-x-2 hover:shadow-md",
                          )}
                          aria-current={pathname === item.href ? "page" : undefined}
                        >
                          <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                          <span>{item.name}</span>
                          {pathname === item.href && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl -z-10"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
          <div className="space-y-2 px-4 pt-4 pb-6">
            {updatedNavigation.map((item) => {
              const Icon = item.icon
              return (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "text-gray-700 hover:bg-purple-50 hover:text-purple-600",
                    "group flex items-center space-x-3 rounded-xl px-4 py-3 text-base font-medium transition-all duration-300",
                  )}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>{item.name}</span>
                </DisclosureButton>
              )
            })}
            <div className="pt-4">
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg">
                Únete ahora
              </button>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </motion.div>
  )
}
