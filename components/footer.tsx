"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface FooterProps {
  translations: {
    privacyPolicy: string
    termsOfService: string
    cookieSettings: string
    contactUs: string
    aboutUs: string
    careers: string
    blog: string
    support: string
    newsletter: string
    subscribeText: string
  }
}

export function Footer({ translations }: FooterProps) {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">FK</span>
            </div>
            <span className="font-medium text-sm">Factor K</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <Dialog>
              <DialogTrigger asChild>
                <button className="hover:text-foreground transition-colors">
                  {translations.privacyPolicy}
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-base">{translations.privacyPolicy}</DialogTitle>
                  <DialogDescription>How we collect and protect your data</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    At Factor K, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information.
                  </p>
                  <div>
                    <h4 className="text-foreground font-medium mb-1">Information We Collect</h4>
                    <p>We collect information you provide directly to us, such as when you create an account or enroll in courses.</p>
                  </div>
                  <div>
                    <h4 className="text-foreground font-medium mb-1">Data Security</h4>
                    <p>We implement appropriate security measures to protect your personal information.</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <button className="hover:text-foreground transition-colors">
                  {translations.termsOfService}
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-base">{translations.termsOfService}</DialogTitle>
                  <DialogDescription>Terms and conditions for using Factor K</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    Welcome to Factor K. By using our platform, you agree to the following terms.
                  </p>
                  <div>
                    <h4 className="text-foreground font-medium mb-1">Acceptance of Terms</h4>
                    <p>By accessing Factor K, you agree to be bound by these Terms of Service.</p>
                  </div>
                  <div>
                    <h4 className="text-foreground font-medium mb-1">User Accounts</h4>
                    <p>You are responsible for maintaining the confidentiality of your account credentials.</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <button className="hover:text-foreground transition-colors">
                  {translations.cookieSettings}
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle className="text-base">{translations.cookieSettings}</DialogTitle>
                  <DialogDescription>Manage your cookie preferences</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 pt-2">
                  <CookieToggle
                    label="Necessary"
                    description="Required for the website to function"
                    checked={true}
                    disabled
                  />
                  <CookieToggle
                    label="Analytics"
                    description="Help us improve our website"
                    checked={cookiePreferences.analytics}
                    onChange={() => setCookiePreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                  />
                  <CookieToggle
                    label="Marketing"
                    description="Used for targeted advertising"
                    checked={cookiePreferences.marketing}
                    onChange={() => setCookiePreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                  />
                  <Button size="sm" className="w-full bg-primary text-primary-foreground mt-2">
                    Save
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <a href="mailto:hello@factork.edu" className="hover:text-foreground transition-colors">
              {translations.contactUs}
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Factor K
          </p>
        </div>
      </div>
    </footer>
  )
}

function CookieToggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange?: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        onClick={onChange}
        disabled={disabled}
        className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${
          checked ? 'bg-primary justify-end' : 'bg-muted justify-start'
        } ${disabled ? 'opacity-60' : ''}`}
      >
        <div className={`w-4 h-4 rounded-full transition-colors ${
          checked ? 'bg-primary-foreground' : 'bg-muted-foreground'
        }`} />
      </button>
    </div>
  )
}
