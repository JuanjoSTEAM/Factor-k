"use client"

import { useTheme } from "next-themes"
import { Moon, Sun, Globe, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface NavbarProps {
  language: string
  setLanguage: (lang: string) => void
  translations: {
    home: string
    features: string
    about: string
    contact: string
  }
}

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "zh", label: "中文" },
]

export function Navbar({ language, setLanguage, translations }: NavbarProps) {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl px-4 py-2.5">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">FK</span>
            </div>
            <span className="font-semibold text-primary">Factor K</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {translations.home}
            </a>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {translations.features}
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {translations.about}
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {translations.contact}
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">Select language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={language === lang.code ? "bg-primary/10" : ""}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-8 w-8"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-8 w-8"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl p-3">
            <div className="flex flex-col gap-1">
              <a 
                href="#home" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                {translations.home}
              </a>
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                {translations.features}
              </a>
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                {translations.about}
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                {translations.contact}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
